/*
  Warnings:

  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_communityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_communityId_fkey";

-- DropTable
DROP TABLE "Community";
