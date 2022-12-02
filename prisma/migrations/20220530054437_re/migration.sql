/*
  Warnings:

  - You are about to drop the column `communityId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `communityId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "communityId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "communityId";
