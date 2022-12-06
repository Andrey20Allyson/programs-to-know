import { Router } from "express";
import { StorageRoute } from "./storage/tecs"; 

export function ApiRouter() {
    const router = Router();
    const storageRouter = StorageRoute();

    router.use('/storage', StorageRoute());

    return router;
}