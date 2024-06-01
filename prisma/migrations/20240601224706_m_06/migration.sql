/*
  Warnings:

  - You are about to drop the column `user_id` on the `email_verification_code` table. All the data in the column will be lost.
  - Added the required column `userId` to the `email_verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "email_verification_code" DROP CONSTRAINT "email_verification_code_user_id_fkey";

-- AlterTable
ALTER TABLE "email_verification_code" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "email_verification_code" ADD CONSTRAINT "email_verification_code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
