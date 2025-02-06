/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `Exam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lesson_id_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "lesson_id";
