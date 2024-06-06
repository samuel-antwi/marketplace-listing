/*
  Warnings:

  - A unique constraint covering the columns `[token_hash]` on the table `password_reset_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_hash` to the `password_reset_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "password_reset_token" ADD COLUMN     "token_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_hash_key" ON "password_reset_token"("token_hash");
