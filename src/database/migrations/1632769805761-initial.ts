import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1632769805761 implements MigrationInterface {
    name = 'initial1632769805761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "invoice_model_paymentstatus_enum" AS ENUM('PAID', 'NOT_PAID')`);
        await queryRunner.query(`CREATE TYPE "invoice_model_currency_enum" AS ENUM('NGN', 'USD', 'GBP', ' EUR')`);
        await queryRunner.query(`CREATE TABLE "invoice_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNo" character varying(500) NOT NULL, "description" text NOT NULL, "paymentStatus" "invoice_model_paymentstatus_enum" NOT NULL DEFAULT 'NOT_PAID', "currency" "invoice_model_currency_enum" NOT NULL DEFAULT 'USD', "taxRate" integer NOT NULL, "issueDate" character varying NOT NULL, "dueDate" character varying NOT NULL, "note" text NOT NULL, "Items" jsonb NOT NULL DEFAULT '[]', "taxAmount" integer NOT NULL, "subTotal" integer NOT NULL, "total" character varying NOT NULL, "amountPaid" integer NOT NULL DEFAULT '0', "outstandingBalance" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, CONSTRAINT "PK_6a0070052d40c4b4f4eb4ce7f36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "email" text NOT NULL, "phone" character varying(15) NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e1b6b832312fe74c437fda142ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice_model" ADD CONSTRAINT "FK_94159a6fa95bef7a1dc75efb29d" FOREIGN KEY ("customerId") REFERENCES "customer_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_model" DROP CONSTRAINT "FK_94159a6fa95bef7a1dc75efb29d"`);
        await queryRunner.query(`DROP TABLE "customer_model"`);
        await queryRunner.query(`DROP TABLE "invoice_model"`);
        await queryRunner.query(`DROP TYPE "invoice_model_currency_enum"`);
        await queryRunner.query(`DROP TYPE "invoice_model_paymentstatus_enum"`);
    }

}
