import { Router, Request } from 'express';
import { IDataBase } from '../../database/index.d';
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

export function StorageRoute(dataBase: IDataBase) {
    const router = Router();

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
    
    router.post('/tecs', async (req: Request, res, next) => {
        const { body } = req;

        try {
            const fields: string[] = [];
            const values: string[] = [];

            for (const field in tecnologiesDBFields) {
                const prop = tecnologiesDBFields[field];
                const value = body[prop];

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