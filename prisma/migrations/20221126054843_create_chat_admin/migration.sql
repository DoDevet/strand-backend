-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "chatAdminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_chatAdminId_fkey" FOREIGN KEY ("chatAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
