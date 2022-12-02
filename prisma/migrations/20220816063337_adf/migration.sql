-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_communityId_fkey";
