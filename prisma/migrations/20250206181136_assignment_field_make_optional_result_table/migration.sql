-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignment_id_fkey";

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "assignment_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
