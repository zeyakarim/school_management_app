-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "class_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "teacher_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
