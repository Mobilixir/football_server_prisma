-- CreateTable
CREATE TABLE "MatchStat" (
    "id" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "matchId" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "goals" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchStat_teamId_key" ON "MatchStat"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchStat_matchId_key" ON "MatchStat"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchStat_playerId_key" ON "MatchStat"("playerId");

-- AddForeignKey
ALTER TABLE "MatchStat" ADD CONSTRAINT "MatchStat_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchStat" ADD CONSTRAINT "MatchStat_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchStat" ADD CONSTRAINT "MatchStat_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
