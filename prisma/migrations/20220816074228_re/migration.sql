/*
  Warnings:

  - You are about to drop the column `communityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_communityId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "communityId";

-- DropTable
DROP TABLE "Community";
