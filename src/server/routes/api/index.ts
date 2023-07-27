import express, { Router } from "express";
import { StorageRoute } from "./storage/tecs";

export function createAPI() {
    const router = Router();

    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());

    const storageRouter = StorageRoute();

    router.use('/storage', storageRouter);

    return router;
}