/*
  Warnings:

  - Added the required column `ipAddress` to the `email_verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_verification_code" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ipAddress" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "email_verification_code_userId_createdAt_idx" ON "email_verification_code"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "email_verification_code_ipAddress_createdAt_idx" ON "email_verification_code"("ipAddress", "createdAt");
