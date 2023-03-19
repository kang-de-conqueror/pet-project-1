import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterRentalDueDateUpdateToNullable1677001520751 implements MigrationInterface {
    name = 'AlterRentalDueDateUpdateToNullable1677001520751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "market_cars"
            ALTER COLUMN "rental_due_date" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "market_cars"
            ALTER COLUMN "rental_due_date"
            SET NOT NULL
        `);
    }

}
