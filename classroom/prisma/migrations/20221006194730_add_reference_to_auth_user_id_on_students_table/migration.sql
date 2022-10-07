/*
  Warnings:

  - A unique constraint covering the columns `[authUseId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "authUseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUseId_key" ON "Student"("authUseId");
