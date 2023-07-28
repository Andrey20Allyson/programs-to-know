import { TecDatabasePostDTO, getTecResponseBody, postTecResponseBody } from "./schemas";

export class TecStorageConsumer {
  readonly path = '/api/storage/tecs';

  async query(title: string = '') {    
    const resp = await fetch(`${this.path}?titleQ=${title}`);

    const data = await resp.json();

    return getTecResponseBody.parse(data);
  }

  async add(tec: TecDatabasePostDTO) {
    const resp = await fetch(this.path, {
      body: JSON.stringify(tec),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await resp.json();

    return postTecResponseBody.parse(data);
  }
}