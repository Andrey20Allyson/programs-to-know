import express, { Router } from 'express';

export function createDistRoute() {
    const router = Router();
    
    router.use(express.static('dist/client'));

    return router;
}