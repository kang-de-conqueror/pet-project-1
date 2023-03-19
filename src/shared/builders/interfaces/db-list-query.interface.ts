import { SelectQueryBuilder } from 'typeorm';

export interface DbListQueryInterface<T> {
  init(queryBuilder: SelectQueryBuilder<T>, alias?: string): this;
  chainQuery(
    conditionRawQuery: string,
    parameters: Record<string, any>,
    shouldIncludeQuery: boolean,
  ): this;
  chainFullTextSerchQuery(input: {
    parameterName: string;
    parameterValue: string;
    shouldIncludeQuery: boolean;
  }): this;
  build(): SelectQueryBuilder<T>;
}
