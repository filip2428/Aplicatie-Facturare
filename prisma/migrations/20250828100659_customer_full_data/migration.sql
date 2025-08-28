/*
  Warnings:

  - A unique constraint covering the columns `[cif]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Customer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "cif" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cif_key" ON "public"."Customer"("cif");
