export interface Response<DTO = undefined> {
    data?: DTO;
    status: number;
}

export interface IRequester<DTO> {
    get(...args: any[]): Promise<Response<DTO>>;
    post(value: DTO): Promise<Response>;
}

export abstract class Requester<DTO = Object> implements IRequester<DTO> {
    url: string;
    protected DTOProps: string[] = [];

    constructor(url: string) {
        this.url = url;
    }

    protected isDTO(value: any) {
        for (const prop of this.DTOProps) {
            if (value[prop] === undefined) return false;
        }

        return true;
    }

    get(...args: any[]): Promise<Response<DTO>> {
        throw new Error('Method not implemented.');
    }

    post(value: DTO): Promise<Response> {
        throw new Error('Method not implemented.');
    }
}