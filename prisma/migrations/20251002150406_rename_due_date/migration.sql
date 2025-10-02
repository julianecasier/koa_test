/*
  Warnings:

  - You are about to drop the column `date` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "date",
ADD COLUMN     "dueDate" TEXT;
