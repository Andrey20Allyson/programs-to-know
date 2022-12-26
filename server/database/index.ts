import { Connection, ConnectionConfig, createConnection } from 'mysql';
import { WhereConditionOperations, IDataBase, QueryReturn, Primitive, SelectOptions, WhereCondition } from './index.d'

export class DataBase implements IDataBase {
    private connection: Connection;

    private constructor(options: ConnectionConfig) {
        this.connection = createConnection(options);
    }

    query<T>(query: string) {
        return new Promise<QueryReturn<T>>((resolve, reject) => {
            this.connection.query(query, (err, response, fields) => {
                if (err) reject(err);

                resolve({
                    response,
                    fields
                })
            });
        });
    }

    select<T>(options: SelectOptions) {
        const query = this.createQuery('select');

        return this.query<T>('select');
    }

    delete<T>(): Promise<QueryReturn<T>> {
        throw new Error('not implemented!');
    }

    private createQuery(sufix: string) {
        
    }

    static createDataBase(options: ConnectionConfig): IDataBase {
        return new this(options);
    }

    static createCondition(val1: Primitive, op: WhereConditionOperations, val2: Primitive): WhereCondition {
        return {
            val1,
            op,
            val2
        }
    }
}