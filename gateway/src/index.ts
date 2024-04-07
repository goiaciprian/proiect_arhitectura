import express, { Express } from 'express';
import dotenv from 'dotenv';
import request from 'request';
import { Logger, GrpcClientFactory } from 'common_services';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const COMPANIES_SERVICE_URL = process.env.COMPANY_SERVICE_URL!;
const PEOPLE_SERVICE_URL = process.env.PEOPLE_SERVICE_URL!;

async function main() {
    const logger = Logger.create("GATEWAY");
    const app: Express = express();

    app.use((req, res, next) => {
        logger.info(`Request started for: ${req.path} with name: ${req.query['q']}`);
        next();
    });

    app.use(rateLimit({
        max: 5,
        windowMs: 3000
    }))

    // permite request uri de pe toate domeniile si cu toate metodele PUT GET POST
    app.use(cors({
        allowedHeaders: '*',
        origin: '*'
    }))
    
    app.use((req, res, next) => {
        if(req.path.includes('/search') && !req.query['q']) {
            res.status(404).send();
        } else {
            next();
        }
    })    

    app.all('/companies/*', (req, res) => {
        const url = `${COMPANIES_SERVICE_URL}/${req.path.replace('/companies/', '')}`;
        req.pipe(request({ qs: req.query, uri: url })).pipe(res);
    });

    app.get('/peoples/search', (req, res) => {
        try {
            const client = GrpcClientFactory.createClient(PEOPLE_SERVICE_URL);
            client.search({
                nume: req.query['q'] as string
            }, (err, response) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.send({
                        ...response
                    })
                }
            })
        } catch(e) {
            logger.error(e);
            res.status(400).send('failed');
        }
    });

    app.listen(80, () => {
        logger.info(`app listening on 80`)
    });
}

main();