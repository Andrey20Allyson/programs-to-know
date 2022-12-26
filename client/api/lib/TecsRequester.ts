import { Requester } from "./Requester.js";
import { Response } from './Requester.d';
import { TecnologyDTO } from './TecsRequester.d'

export class TecsRequester extends Requester<TecnologyDTO[]> {
    protected DTOProps: string[] = [
        'title',
        'description',
        'dependences',
        'downloadUrl',
        'imageUrl',
        'architecture'
    ];

    protected postHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    }

    get(): Promise<Response<TecnologyDTO[]>>;
    get(title: string): Promise<Response<TecnologyDTO[]>>;
    async get(title?: string): Promise<Response<TecnologyDTO[]>> {
        const resp = await fetch(`${this.url}?titleQ=${title ?? ''}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        let data: TecnologyDTO[] | undefined;

        const contentType = resp.headers.get('Content-Type') ?? '';

        if (contentType.includes('application/json')) {
            const jsonData: any[] = await resp.json();

            let isDTO = true;

            for (const data of jsonData) {
                if (!this.isDTO(data)) {
                    isDTO = false;
                    break;
                }
            }

            data = isDTO? jsonData: undefined;
        }

        return {
            status: resp.status,
            data
        }
    }

    async post(values: TecnologyDTO[]): Promise<Response<undefined>> {
        const resp = await fetch(`${this.url}?type=json`, {
            method: 'post',
            headers: this.postHeaders,
            body: JSON.stringify(values)
        });

        return { status: resp.status };
    }
}