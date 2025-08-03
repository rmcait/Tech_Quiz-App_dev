-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "companyCode" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."CompanyCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyCode_code_key" ON "public"."CompanyCode"("code");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_companyCode_fkey" FOREIGN KEY ("companyCode") REFERENCES "public"."CompanyCode"("code") ON DELETE SET NULL ON UPDATE CASCADE;
