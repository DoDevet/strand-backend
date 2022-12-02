-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "communityName" TEXT NOT NULL,
    "admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_communityName_key" ON "Community"("communityName");
