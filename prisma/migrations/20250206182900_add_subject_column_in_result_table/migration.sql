-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "subject_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
