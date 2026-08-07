-- AlterTable
ALTER TABLE "Post" ADD COLUMN "notionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_notionId_key" ON "Post"("notionId");
