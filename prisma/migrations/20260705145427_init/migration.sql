-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "date" DATETIME NOT NULL,
    "readTime" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "imageUrl" TEXT,
    "links" TEXT
);
