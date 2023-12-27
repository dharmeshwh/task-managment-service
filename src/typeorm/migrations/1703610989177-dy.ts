import { MigrationInterface, QueryRunner } from "typeorm";

export class Dy1703610989177 implements MigrationInterface {
    name = 'Dy1703610989177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_entity"`);
    }

}
