-- AlterTable
ALTER TABLE "user" ADD COLUMN     "account_locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "failed_attempts" INTEGER NOT NULL DEFAULT 0;
