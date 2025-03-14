-- CreateTable
CREATE TABLE "customer" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "postal_code" VARCHAR(255),
    "message" TEXT,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
