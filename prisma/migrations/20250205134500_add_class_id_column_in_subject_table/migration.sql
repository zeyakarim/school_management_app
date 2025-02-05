-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "class_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
