import { HttpStatus, INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PORT } from '../config/env';

const TEST_DB_CONNECTION_NAME = 'e2e_test_connection';
export const TEST_DB_NAME = 'e2e_test_db';

export const initTestDb = async (): Promise<void> => {
  const connection = await createConnection({
    name: TEST_DB_CONNECTION_NAME,
    type: 'mysql',
    host: process.env.DB_HOST_TEST,
    port: parseInt(DB_HOST, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.close();
};

export const createTestDbEntities = async (): Promise<void> => {
  await createConnection({
    name: TEST_DB_CONNECTION_NAME,
    type: 'mysql',
    host: process.env.DB_HOST_TEST,
    port: DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: DB_NAME,
    entities: [__dirname + '/../src/modules/**/*.entity{.ts,.js}'],
    synchronize: true,
  });
};

export const requestUtil = (app: INestApplication) =>
  async function myRequest(
    url: string,
    {
      expectedStatus = HttpStatus.OK,
      method = 'get',
      body,
      contentType = 'application/json',
      accept = 'application/json',
      query,
      accessToken = 'mock-token',
      responseType,
    }: {
      expectedStatus?: HttpStatus;
      method?: 'get' | 'post' | 'put' | 'delete';
      body?: any;
      contentType?: string;
      accept?: string;
      query?: Record<string, any>;
      accessToken?: string;
      responseType?: string;
    } = {},
  ): Promise<any> {
    const agent = supertest.agent(app.getHttpServer());
    const req = agent[method](url)
      .set('Accept', accept)
      .set('Authorization', `Bearer ${accessToken}`);

    responseType && req.responseType(responseType);
    query && req.query(query);

    const reqAfterSend = body
      ? req.set('Content-Type', contentType).send(body)
      : req;

    return reqAfterSend.expect(expectedStatus).then((res) => {
      try {
        return JSON.parse(res.text);
      } catch (error) {
        return res.text;
      }
    });
  };

export const closeTestDbConnection = async (): Promise<void> => {
  console.log(`Closing connection to ${TEST_DB_NAME} database`);
  const connection = getConnection(TEST_DB_CONNECTION_NAME);
  await connection.close();
};
