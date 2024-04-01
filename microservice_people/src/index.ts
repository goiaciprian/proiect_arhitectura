/**
 * people service
 */
import express, { Express, Request, Response } from "express";
import { Logger, RabbitMQConnection, RabbitPeople, proto } from 'common_services';
import axios from "axios";
import * as grpc from '@grpc/grpc-js';

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

    const rabbit_send_channel = 'CHANNEL_1_TO_2';
    const rabbit_receive_channel = 'CHANNEL_2_TO_1';

    const logger = Logger.create(server_name);
    const rabbitConnection = new RabbitMQConnection<RabbitPeople, any>(logger);
    rabbitConnection.connect(rabbit_username, rabbit_password, rabbit_host);


    const server = new grpc.Server();

    server.addService(proto.PeopleServiceService, {
        async search(call: grpc.ServerUnaryCall<proto.RequestDto, proto.SerachResponseDto>, callback: grpc.sendUnaryData<proto.SerachResponseDto>) {
            const nume = call.request.nume;
            if(!nume) {
                callback({ code: grpc.status.NOT_FOUND })
            }

            const response = await axios.get<WealthResponse>(`${company_service}/api/getWealth/${nume}`)
            const queueResponse = await rabbitConnection.getMessage(rabbit_send_channel);
    
            if (response.status !== 200) {
                callback({ code: grpc.status.NOT_FOUND })
            }
    
            const { avere } = response.data;

            callback(null, {
                avere,
                nume,
                functie: queueResponse?.functie ?? null 
            })
        },
        valoareEstimata(call: grpc.ServerUnaryCall<proto.RequestDto, proto.ResponseDto>, callback: grpc.sendUnaryData<proto.ResponseDto>) {
            callback(null, {
                valoareEstimata: 1
            })
        },
    });

    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if(err) {
            logger.error(err)
        }

        logger.log(`service working at ${port}`);
    });


    // app.get('/search', async (req: Request, res: Response) => {
    //     const q = req.query['q'];
    //     if (!q) {
    //         res.status(404).send();
    //     }

    //     const response = await axios.get<WealthResponse>(`${company_service}/api/getWealth/${q}`)
    //     const queueResponse = await rabbitConnection.getMessage(rabbit_send_channel);

    //     if (response.status !== 200) {
    //         res.status(400).send();
    //     }

    //     const { avere } = response.data;

    //     res.send({
    //         ...queueResponse ?? { broker: 'response failed' },
    //         avere,
    //         msg: `Working ${server_name}`
    //     });
    // })


    // app.listen(port, () => {
    //     logger.log(`Server running on ${port}`);
    // })

}

main()
