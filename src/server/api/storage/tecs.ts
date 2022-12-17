import { Router } from 'express';
import { DataBase } from '../../database';
import { OkPacket } from 'mysql';
import { sanitize } from '../../database/sanitizer';

export interface ITecnologiesDBColumns {
    [k: string]: string;
}

export const tecnologiesDBFields: ITecnologiesDBColumns = {
    'title'         :   'title',
    'downloadLink'  :   'downloadLink',
    'imageUrl'      :   'imageUrl',
    'description'   :   'desc'
};

export function StorageRoute() {
    const router = Router();
    const dataBase = DataBase.createDataBase({
        user: 'root',
        database: 'programs-to-know-db'
    });

    router.get('/tecs', async (req, res, next) => {
        const { type, id } = req.query;

        try {
            if (type === 'json') {
                const result = await dataBase.query(`SELECT * FROM tecnologies WHERE \`id\` > 3;`);
                
                res.json(result.response);
            } else if (type === 'xml') {

            }
        } catch (e) {
            console.log(e);
        } finally {
            res.end();
        }
    });
    
    router.post('/tecs', async (req, res, next) => {
        const { data } = req.query;
    
        if (typeof data !== 'string') return;

        try {
            const object = JSON.parse(data);

            const fields: string[] = [];
            const values: string[] = [];

            for (const field in tecnologiesDBFields) {
                const prop = tecnologiesDBFields[field];
                const value = object[prop];

                if (value) {
                    const safeValue = sanitize(value);

                    fields.push(field);
                    values.push(safeValue);
                }
            }

            const result = await dataBase.query<OkPacket>(`INSERT INTO tecnologies (${fields.toString()}) VALUES (${values.toString()});`);
            
            res.json(result);
        } catch(err) {
            console.log(err);
        }
    });

    return router;
}