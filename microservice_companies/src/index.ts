/**
 * companies service
 */

import express, { Express, Request, Response } from "express";
import { Logger,RabbitMQConnection, RabbitPeople } from "common_services";
import { faker } from '@faker-js/faker';


async function main() {

    const dotenv = require('dotenv');

    dotenv.config();

    
    const port = process.env.PORT;
    const server_name = process.env.SERVER_NAME!;

    const rabbit_host = process.env.RABBIT_HOST!;
    const rabbit_username = process.env.RABBIT_USERNAME!;
    const rabbit_password = process.env.RABBIT_PASSWORD!;

    const rabbit_receive_channel = 'CHANNEL_1_TO_2';
    const rabbit_send_channel = 'CHANNEL_2_TO_1';

    const app: Express = express();
    
    const logger = Logger.create(server_name);
    const rabbitConnetion = new RabbitMQConnection<any, RabbitPeople>(logger);
    rabbitConnetion.connect(rabbit_username, rabbit_password, rabbit_host);

    app.get('/api/getWealth/:name', async (req: Request, res: Response) => {
        const name = req.params['name'];
        if(!name) {
            res.status(400).send();
        }
        const avere = faker.number.int({ min: 150_000, max: 10_000_000 });

        await rabbitConnetion.sendToQueue(rabbit_receive_channel, {
            functie: faker.person.jobTitle(),
            nume: name
        })
        res.send({
            name,
            avere,
        })
    })

    app.get('/search', (req: Request, res: Response) => {
        res.send(`Working ${server_name}`);
    })

    
    app.listen(port, () => { 
        logger.log(`Server running on ${port}`);
    })
}

main()