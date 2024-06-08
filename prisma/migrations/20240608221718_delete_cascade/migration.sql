-- DropForeignKey
ALTER TABLE "email_verification_code" DROP CONSTRAINT "email_verification_code_userId_fkey";

-- DropForeignKey
ALTER TABLE "password_reset_token" DROP CONSTRAINT "password_reset_token_userId_fkey";

-- AddForeignKey
ALTER TABLE "email_verification_code" ADD CONSTRAINT "email_verification_code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
