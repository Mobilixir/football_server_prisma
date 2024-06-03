/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "User_teamId_key" ON "User"("teamId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
