import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import fs from 'fs';
import path from 'path';

const SERVICE_ACCOUNT_PATH = path.resolve(process.cwd(), './keys/firebase-service-account.json');

function loadServiceAccountSync(): unknown {
  let data: string;
  
  try {
    data = fs.readFileSync(SERVICE_ACCOUNT_PATH, { encoding: 'utf-8' });
  } catch (e) {
    throw new Error(`Can't find firebase service account file in '${SERVICE_ACCOUNT_PATH}', consider downloading one and adding it to the 'keys' directory!`);
  }

  return JSON.parse(data);
}

const serviceAccount = loadServiceAccountSync();

export const app = admin.initializeApp({
  credential: cert(serviceAccount as admin.ServiceAccount),
});