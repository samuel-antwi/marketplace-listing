/*
  Warnings:

  - You are about to drop the `email_verification_code` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "email_verification_code";

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
