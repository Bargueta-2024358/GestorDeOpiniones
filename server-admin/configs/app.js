'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import fieldRoutes from '../src/fields/field.routes.js';
import teamRoutes from '../src/teams/team.routes.js';
import tournamentRoutes from '../src/tournaments/tournaments.routes.js';
import reservationRoutes from '../src/reservations/reservation.routes.js';

const BASE_PATH = '/kinalSports/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/fields`, fieldRoutes);
    app.use(`${BASE_PATH}/teams`, teamRoutes);
    app.use(`${BASE_PATH}/tournaments`, tournamentRoutes);
    app.use(`${BASE_PATH}/reservations`, reservationRoutes);
    app.get(`${BASE_PATH}/health`, (req, res) =>{
        res.status(200).json({
            status: 'healthy',
            service: 'Kinal Sports Admin Server'
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Ruta no existe en el servidor'
        })
    })
}

export const initServer = async() => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try{
        await dbConnection();
        middlewares(app);
        routes(app);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Kinal Sports server running on port: ${PORT}`)
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`)
        });
    }catch(err){
        console.error(`Error al iniciar el servidor: ${err.message}`)
        process.exit(1);
    }
};