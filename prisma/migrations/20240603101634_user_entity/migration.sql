-- AlterTable
ALTER TABLE "User" ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';
