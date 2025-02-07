-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "teacher_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
