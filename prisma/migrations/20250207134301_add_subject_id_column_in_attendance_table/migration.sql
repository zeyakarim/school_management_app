-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "subject_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
