-- AlterTable
CREATE SEQUENCE customer_id_seq;
ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT nextval('customer_id_seq');
ALTER SEQUENCE customer_id_seq OWNED BY "customer"."id";
