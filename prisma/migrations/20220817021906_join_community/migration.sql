/*
  Warnings:

  - A unique constraint covering the columns `[communityName]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Community_communityName_key" ON "Community"("communityName");
