-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "salt" TEXT NOT NULL DEFAULT E'';
