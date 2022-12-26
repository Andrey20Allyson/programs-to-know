import express, { Router } from "express";
import { StorageRoute } from "./storage/tecs"; 
import { DataBase } from '../../database';

export function createAPI() {
    const router = Router();

    const dataBase = DataBase.createDataBase({
        user: 'root',
        database: 'programs-to-know-db'
    });

    router.use(express.urlencoded({extended: false}));
    router.use(express.json());

    const storageRouter = StorageRoute(dataBase);

    router.use('/storage', storageRouter);

    return router;
}