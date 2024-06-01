-- DropForeignKey
ALTER TABLE "email_verification_code" DROP CONSTRAINT "email_verification_code_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";
