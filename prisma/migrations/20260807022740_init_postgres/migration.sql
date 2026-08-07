-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "notionId" TEXT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "readTime" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "imageUrl" TEXT,
    "links" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_notionId_key" ON "Post"("notionId");
