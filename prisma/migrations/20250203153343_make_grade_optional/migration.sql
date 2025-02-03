-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_grade_id_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "grade_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
