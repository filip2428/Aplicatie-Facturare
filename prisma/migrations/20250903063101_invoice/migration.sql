/*
  Warnings:

  - You are about to drop the column `amoubntPaid` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "amoubntPaid",
ADD COLUMN     "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0;
