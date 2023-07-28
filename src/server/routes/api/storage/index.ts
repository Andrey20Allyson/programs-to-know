import { Router } from "express";
import { TecStorageRoute } from "./tecs";

export function StorageRoute() {
  const router = Router();

  router.use(TecStorageRoute());

  return router;
}