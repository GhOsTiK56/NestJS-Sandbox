-- CreateTable
CREATE TABLE "cat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,

    CONSTRAINT "cat_pkey" PRIMARY KEY ("id")
);
