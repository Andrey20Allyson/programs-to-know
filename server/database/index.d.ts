import { FieldInfo, OkPacket } from 'mysql';

export type WhereConditionOperations = 'like' | '=' | '>' | '<' | '>=' | '<=' | '!=' | '<=>';

export type Primitive = string | number | boolean | Primitive[];

export interface QueryReturn<T> {
    response: T;
    fields?: FieldInfo[]
}

export interface InsertReturn {
    response: OkPacket;
    fields?: FieldInfo[];
}

export interface WhereCondition {
    val1: any;
    val2: any;
    op: WhereConditionOperations;
}

export interface QueryOptions {
    table: string;
}

export interface ConditionalQueryOptions {
    where?: WhereCondition[];
    limit?: number;
}

export interface SelectOptions extends QueryOptions, ConditionalQueryOptions {
    columns?: string[];
}

export interface InsertOptions extends QueryOptions {
    values: Primitive[],
    order?: string[]
}

export interface IDataBase {
    query<T = any>(query: string): Promise<QueryReturn<T>>;
    select<T = any>(options: SelectOptions): Promise<QueryReturn<T>>;
    delete<T = any>(): Promise<QueryReturn<T>>;
}