import { Router, Request } from 'express';
import { IDataBase } from '../../../database/index.d';
import { OkPacket } from 'mysql';
import { sanitize } from '../../../database/sanitizer';

export interface DBFields {
    [k: string]: string;
}

//  database_field  :   DTO_prop
export const tecnologiesDBFields: DBFields = {
    'title'         :   'title',
    'downloadSource':   'downloadUrl',
    'imageUrl'      :   'imageUrl',
    'description'   :   'description',
    'architecture'  :   'architecture'
};

export function StorageRoute(dataBase: IDataBase) {
    const router = Router();

    router.get('/tecs', async (req, res, next) => {
        const { id, titleQ } = req.query;

        try {
            let title = '"%%"';
            
            if (typeof titleQ === 'string') {
                title = sanitize(`%${titleQ}%`);
                // title = `"%${titleQ}%"`;
            }

            const result = await dataBase.query<any[]>(`SELECT * FROM tecnologies WHERE \`title\` LIKE ${title} LIMIT 4;`);

            const dbResp = result.response;
            const serverResp = [];
            
            for (const data of dbResp) {
                const newDTO: any = {};

                for (const field in tecnologiesDBFields) {
                    const prop = tecnologiesDBFields[field];
                    const value = data[field];

                    newDTO[prop] = value ?? null;
                }

                newDTO['dependences'] = [];

                serverResp.push(newDTO);
            }
            
            res.setHeader('Content-Type', 'application/json');
            res.json(serverResp);
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