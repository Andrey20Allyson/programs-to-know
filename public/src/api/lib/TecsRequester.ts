import { Requester } from "./Requester.js";
import { Response } from './Requester.d';
import { TecnologyDTO } from './TecsRequester.d'

export class TecsRequester extends Requester<TecnologyDTO> {
    protected DTOProps: string[] = [
        'title',
        'description',
        'dependences',
        'downloadUrl',
        'imageUrl',
        'architecture'
    ];

    async get(...args: any[]): Promise<Response<TecnologyDTO>> {
        const resp = await fetch(`${this.url}?type=json`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        let data: TecnologyDTO | undefined;

        if (resp.headers.get('Content-Type') === 'application/json') {
            const jsonData = await resp.json();

            data = this.isDTO(jsonData)? jsonData: undefined;
        }

        return {
            status: resp.status,
            data
        }
    }

    async post(value: TecnologyDTO): Promise<Response<undefined>> {
        const resp = await fetch(`${this.url}?type=json`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        });

        return { status: resp.status };
    }
}