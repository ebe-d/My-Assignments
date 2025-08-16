-- CreateTable
CREATE TABLE "public"."BookedEvents" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "userId" INTEGER NOT NULL,
    "EventId" INTEGER NOT NULL,

    CONSTRAINT "BookedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookedEvents_EventId_key" ON "public"."BookedEvents"("EventId");

-- AddForeignKey
ALTER TABLE "public"."BookedEvents" ADD CONSTRAINT "BookedEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookedEvents" ADD CONSTRAINT "BookedEvents_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
