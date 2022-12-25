export interface Response<DTO = undefined> {
    data?: DTO;
    status: number;
}

export interface IRequester<DTO> {
    get(...args: any[]): Promise<Response<DTO>>;
    post(value: DTO): Promise<Response>;
}