-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "percentage" DECIMAL(65,30) NOT NULL DEFAULT 90,
ALTER COLUMN "level" SET DATA TYPE TEXT;
