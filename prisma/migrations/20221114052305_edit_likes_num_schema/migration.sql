/*
  Warnings:

  - You are about to drop the column `likeNumber` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "likeNumber",
ADD COLUMN     "likesNum" INTEGER NOT NULL DEFAULT 0;
