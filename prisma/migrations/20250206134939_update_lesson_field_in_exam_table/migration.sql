-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lesson_id_fkey";

-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "lesson_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
