/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `communityId` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "communityId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "communityId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
