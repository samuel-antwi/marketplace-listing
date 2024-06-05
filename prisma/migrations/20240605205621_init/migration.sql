-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "password_hash" TEXT,
    "username" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "given_name" TEXT,
    "family_name" TEXT,
    "picture" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_code" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verification_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_token" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "email_verification_code_userId_createdAt_idx" ON "email_verification_code"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "email_verification_code_ipAddress_createdAt_idx" ON "email_verification_code"("ipAddress", "createdAt");

-- CreateIndex
CREATE INDEX "password_reset_token_userId_createdAt_idx" ON "password_reset_token"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "password_reset_token_ipAddress_createdAt_idx" ON "password_reset_token"("ipAddress", "createdAt");

-- AddForeignKey
ALTER TABLE "email_verification_code" ADD CONSTRAINT "email_verification_code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_token" ADD CONSTRAINT "password_reset_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
