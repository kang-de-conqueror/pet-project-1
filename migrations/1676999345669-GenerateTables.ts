import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateTables1676999345669 implements MigrationInterface {
  name = 'GenerateTables1676999345669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "id" BIGSERIAL NOT NULL,
                "username" character varying NOT NULL,
                "name" character varying NOT NULL,
                "avatar" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("email", "username"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "market_cars" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "id" BIGSERIAL NOT NULL,
                "model" character varying NOT NULL,
                "brand" character varying NOT NULL,
                "year" integer NOT NULL,
                "color" character varying NOT NULL,
                "user_id" bigint NOT NULL,
                "price" numeric(10, 2) NOT NULL,
                "available_from" TIMESTAMP NOT NULL,
                "available_to" TIMESTAMP NOT NULL,
                "rental_due_date" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_e399d471e6e1e6ce60e231e3d89" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ad741b8ca9d378e1236f2d4ea7" ON "market_cars" ("model")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_4980bdebacffa23c4c2926724e" ON "market_cars" ("brand")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_6388f6428ac4702ebfb707c24d" ON "market_cars" ("user_id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6388f6428ac4702ebfb707c24d"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_4980bdebacffa23c4c2926724e"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ad741b8ca9d378e1236f2d4ea7"
        `);
    await queryRunner.query(`
            DROP TABLE "market_cars"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
