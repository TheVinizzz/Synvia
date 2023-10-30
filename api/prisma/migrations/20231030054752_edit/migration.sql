/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `responsible` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "responsibleId",
ADD COLUMN     "responsible" TEXT NOT NULL;
