import { Router } from 'express';
import { DataBase } from '../../database';
import { OkPacket } from 'mysql';

export interface ITecnologiesDBColumns {
    [k: string]: string;
}

export const tecnologiesDBColumns: ITecnologiesDBColumns = {
    title: 'title',
    downloadLink: 'downloadLink',
    imageUrl: 'imageUrl',
    description: 'desc'
};

export function StorageRoute() {
    const router = Router();
    const dataBase = DataBase.createDataBase({
        user: 'root',
        database: 'programs-to-know-db'
    });

    router.get('/tecs', async (req, res, next) => {
        const { type } = req.query;
    
        if (type === 'json') {}
    });
    
    router.post('/tecs', async (req, res, next) => {
        const { data } = req.query;
    
        if (typeof data !== 'string') return;

        try {
            // const object: any = JSON.parse(data);

            // const columns: string[] = [];
            // const values: string[] = [];

            // for (const key in tecnologiesDBColumns) {
            //     const prop = tecnologiesDBColumns[key];

            //     if (object[prop]) {
            //         columns.push(key);
            //         values.push(typeof object[prop] === 'string'? `"${object[prop]}"`: `${object[prop]}`);
            //     }
            // }

            // const res = await dataBase.query<OkPacket>(`insert into tecnologies (${columns.toString()}) values (${values.toString()});`);
            
        } catch(err) {
            console.log(err);
        }
    });

    return router;
}