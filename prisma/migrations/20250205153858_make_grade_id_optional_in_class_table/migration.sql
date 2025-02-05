-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_grade_id_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "grade_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
