import { eMatchStatusType } from '@prisma/client';

interface iMatchData {
  team1Id: string;
  team2Id: string;
  schedule?: Date;
  team1_score: number;
  team2_score: number;
  winnerId: string;
  status: eMatchStatusType;
}

export default iMatchData;
