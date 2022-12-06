import { Router } from 'express';
import { DownloadItemOptions } from '../../../../public/src/loader/DownloadItem.d'

export function StorageRoute() {
    const router = Router();

    router.get('/tecs', async (req, res, next) => {
        const { type } = req.query;
    
        if (type === 'json') {
            // const value = await readFile('./data/tecnologies.json', { encoding: 'utf-8' });
    
            // res.json(JSON.parse(value));
        }
    });
    
    router.post('/tecs', async (req, res, next) => {
        const { data } = req.query;
    
        if (typeof data !== 'string') return;
    
        try {
            const object: DownloadItemOptions = JSON.parse(data);
    
            
        } catch(err) {
    
        }
    });

    return router;
}