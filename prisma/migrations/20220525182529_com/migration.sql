/*
  Warnings:

  - You are about to drop the column `userId` on the `Community` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_communityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_communityId_fkey";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "userId";
