-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "communityId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "communityId" INTEGER;

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "communityName" TEXT NOT NULL,
    "admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caption" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_communityName_key" ON "Community"("communityName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
