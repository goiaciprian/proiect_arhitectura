/**
 * companies service
 */

import express, { Express, Request, Response } from "express";
import {
  Logger,
  RabbitMQConnection,
  RabbitPeople,
  GrpcClientFactory,
  proto,
  RabbitCompanies,
} from "common_services";
import { faker } from "@faker-js/faker";

const port = process.env.PORT;
const server_name = process.env.SERVER_NAME!;

const rabbit_host = process.env.RABBIT_HOST!;
const rabbit_username = process.env.RABBIT_USERNAME!;
const rabbit_password = process.env.RABBIT_PASSWORD!;
const people_service_url = process.env.PEOPLE_SERVICE_URL!;

const rabbit_send_channel = "CHANNEL_1_TO_2";
const rabbit_receive_channel = "CHANNEL_2_TO_1";

const logger = Logger.create(server_name);

async function getResponseFromGrpcValoareEstimata(
  client: proto.PeopleServiceClient,
  nume: string
): Promise<proto.ResponseDto | null> {
  return await new Promise((resolve) => {
    client.valoareEstimata(
      {
        nume,
      },
      (err, response) => {
        if (err) {
          logger.error(err);
        }
        resolve(!err ? response : null);
      }
    );
  });
}

async function main() {
  const dotenv = require("dotenv");

  dotenv.config();

  const app: Express = express();

  const rabbitConnetion = new RabbitMQConnection<RabbitPeople, RabbitCompanies>(
    logger
  );
  rabbitConnetion.connect(rabbit_username, rabbit_password, rabbit_host);

  const grpcClient = GrpcClientFactory.createClient(people_service_url);

  app.get("/api/getWealth/:name", async (req: Request, res: Response) => {
    const name = req.params["name"];
    if (!name) {
      res.status(400).send();
    }
    const avere = faker.number.int({ min: 150_000, max: 10_000_000 });

    await rabbitConnetion.sendToQueue(rabbit_send_channel, {
      functie: faker.person.jobTitle(),
      nume: name,
    });
    res.send({
      name,
      avere,
    });
  });

  app.get("/search", async (req: Request, res: Response) => {
    const name = req.query["q"] as string;
    const [rabbitResponse, response] = await Promise.all([
      rabbitConnetion.getMessage(rabbit_receive_channel),
      getResponseFromGrpcValoareEstimata(grpcClient, name),
    ]);

    const valoareEstimata = !response ? -1 : response.valoareEstimata;

    res.send({
      name,
      valoareEstimata,
      numarAngajati: rabbitResponse?.numarAngajati ?? -1 
    });
  });

  app.listen(port, () => {
    logger.log(`Server running on ${port}`);
  });
}

main();
