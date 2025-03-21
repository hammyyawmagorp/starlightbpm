/*
  Warnings:

  - You are about to drop the column `created_at` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "created_at";

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" VARCHAR(255) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);
