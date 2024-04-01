import express, { Express } from 'express';
import dotenv from 'dotenv';
import request from 'request';
import { Logger, proto } from 'common_services';
import * as grpc from '@grpc/grpc-js';

dotenv.config();

const COMPANIES_SERVICE_URL = process.env.COMPANY_SERVICE_URL!;
const PEOPLE_SERVICE_URL = process.env.PEOPLE_SERVICE_URL!;

async function main() {
    const logger = Logger.create("GATEWAY");
    const app: Express = express();
    const client = new proto.PeopleServiceClient(PEOPLE_SERVICE_URL, grpc.ChannelCredentials.createInsecure());
    

    app.all('/companies/*', (req, res) => {
        const url = `${COMPANIES_SERVICE_URL}/${req.path.replace('/companies/', '')}`;
        req.pipe(request({ qs: req.query, uri: url })).pipe(res);
    });

    app.get('/people/search', (req, res) => {
        // client.search({
        //     nume: req.query['q'] as string
        // }, (error, response) => {
        //     if (error) {
        //         res.status(400).send(error);
        //     }
        //     res.send({
        //         ...response
        //     })
        // })
    });

    app.listen(80, () => {
        logger.log(`app listening on 80`)
    });
}

main();