import { SelectQueryBuilder } from 'typeorm';
import { DbListQueryInterface } from '../interfaces/db-list-query.interface';

export class DbListQueryImp<T> implements DbListQueryInterface<T> {
  query: SelectQueryBuilder<T>;
  isFirstCondition = true;
  entityAlias: string;

  chainQuery(
    conditionRawQuery: string,
    parameters: Record<string, any>,
    shouldIncludeQuery: boolean,
  ): this {
    if (!shouldIncludeQuery) return this;
    const queryFunc = this.isFirstCondition ? 'where' : 'andWhere';

    if (this.isFirstCondition) {
      this.isFirstCondition = false;
    }
    this.query = this.query[queryFunc](conditionRawQuery, parameters);
    return this;
  }

  chainFullTextSerchQuery({
    parameterName,
    parameterValue,
    shouldIncludeQuery,
  }: {
    parameterName: string;
    parameterValue: string;
    shouldIncludeQuery: boolean;
  }): this {
    if (!shouldIncludeQuery) return this;
    const queryFunc = this.isFirstCondition ? 'where' : 'andWhere';
    const rawCondition = `to_tsvector('simple',${this.entityAlias}.brand) @@ to_tsquery('simple', :${parameterName})`;

    if (this.isFirstCondition) {
      this.isFirstCondition = false;
    }

    this.query = this.query[queryFunc](rawCondition, {
      [parameterName]: `${parameterValue}:*`,
    });
    return this;
  }

  build(): SelectQueryBuilder<T> {
    return this.query;
  }

  init(queryBuilder: SelectQueryBuilder<T>, alias?: string): this {
    this.query = queryBuilder;
    this.entityAlias = alias;

    return this;
  }
}
