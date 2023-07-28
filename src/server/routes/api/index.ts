import express, { Router } from "express";
import { StorageRoute } from "./storage";

export function createAPI() {
    const router = Router();

    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());

    router.use('/storage', StorageRoute());

    return router;
}