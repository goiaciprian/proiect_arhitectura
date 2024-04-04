/**
 * people service
 */
import express, { Express, Request, Response } from "express";
import { Logger, RabbitMQConnection, RabbitPeople, proto, RabbitCompanies } from 'common_services';
import axios from "axios";
import * as grpc from '@grpc/grpc-js';
import { faker } from '@faker-js/faker';

interface WealthResponse {
    name: string;
    avere: number;
}


async function main() {
    const dotenv = require('dotenv');
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT;
    const server_name = process.env.SERVER_NAME!;
    const company_service = process.env.COMPANY_SERVICE!;


    const rabbit_host = process.env.RABBIT_HOST!;
    const rabbit_username = process.env.RABBIT_USERNAME!;
    const rabbit_password = process.env.RABBIT_PASSWORD!;

    const rabbit_receive_channel = 'CHANNEL_1_TO_2';
    const rabbit_send_channel = 'CHANNEL_2_TO_1';

    const logger = Logger.create(server_name);
    const rabbitConnection = new RabbitMQConnection<RabbitCompanies, RabbitPeople>(logger);
    rabbitConnection.connect(rabbit_username, rabbit_password, rabbit_host);


    const server = new grpc.Server();

    server.addService(proto.PeopleServiceService, {
        async search(call: grpc.ServerUnaryCall<proto.RequestDto, proto.SerachResponseDto>, callback: grpc.sendUnaryData<proto.SerachResponseDto>) {
            const nume = call.request.nume;
            if(!nume) {
                callback({ code: grpc.status.NOT_FOUND })
            }

            const response = await axios.get<WealthResponse>(`${company_service}/api/getWealth/${nume}`)
            const queueResponse = await rabbitConnection.getMessage(rabbit_receive_channel);
    
            if (response.status !== 200) {
                callback({ code: grpc.status.NOT_FOUND })
            }
    
            const { avere } = response.data;

            callback(null, {
                avere,
                nume,
                functie: queueResponse?.functie ?? 'rabbit error' 
            })
        },
        valoareEstimata(call: grpc.ServerUnaryCall<proto.RequestDto, proto.ResponseDto>, callback: grpc.sendUnaryData<proto.ResponseDto>) {
            rabbitConnection.sendToQueue(rabbit_send_channel, {
                numarAngajati: faker.number.int({ min: 150_000, max: 10_000_000 }),
            })
            callback(null, {
                valoareEstimata: faker.number.int({ min: 150_000, max: 10_000_000 })
            })
        },
    });

    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if(err) {
            logger.error(err)
        }

        logger.log(`service working at ${port}`);
    });
}

main()
