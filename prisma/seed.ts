import { PrismaClient, eMatchStatusType, eUserType } from '@prisma/client';
import Bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const generate_password = async (password: string) => {
    const salt = await Bcrypt.genSalt(10);
    const hash_password = await Bcrypt.hash(password, salt);
    return hash_password;
  };

  const pune_team = await prisma.team.create({
    data: {
      name: 'Pune',
    },
  });

  const bangalore_team = await prisma.team.create({
    data: {
      name: 'Bangalore',
    },
  });

  const mumbai_team = await prisma.team.create({
    data: {
      name: 'Mumbai',
    },
  });

  const user = await prisma.user.create({
    data: {
      first_name: 'user',
      last_name: 'mobilixir',
      user_name: 'user',
      role: eUserType.USER,
      email: 'user@mobilixir.in',
      mobile_number: '1234567890',
      hash_password: await generate_password('User@7588'),
    },
  });

  const admin = await prisma.user.create({
    data: {
      first_name: 'admin',
      last_name: 'mobilixir',
      user_name: 'admin',
      role: eUserType.ADMIN,
      email: 'admin@mobilixir.in',
      mobile_number: '1234567899',
      hash_password: await generate_password('Admin@7588'),
    },
  });

  const player_one = await prisma.user.create({
    data: {
      first_name: 'player_one',
      last_name: 'mobilixir',
      user_name: 'player_one',
      role: eUserType.PLAYER,
      email: 'player_one@mobilixir.in',
      mobile_number: '1234567898',
      hash_password: await generate_password('Player@7588'),
      teamId: pune_team.id,
    },
  });

  const player_two = await prisma.user.create({
    data: {
      first_name: 'player_two',
      last_name: 'mobilixir',
      user_name: 'player_two',
      role: eUserType.PLAYER,
      email: 'player_two@mobilixir.in',
      mobile_number: '1234567897',
      hash_password: await generate_password('Player@7588'),
      teamId: bangalore_team.id,
    },
  });

  const player_three = await prisma.user.create({
    data: {
      first_name: 'player_three',
      last_name: 'mobilixir',
      user_name: 'player_three',
      role: eUserType.PLAYER,
      email: 'player_three@mobilixir.in',
      mobile_number: '1234567896',
      hash_password: await generate_password('Player@7588'),
      teamId: mumbai_team.id,
    },
  });

  const match_one = await prisma.match.create({
    data: {
      team1Id: pune_team.id,
      team2Id: mumbai_team.id,
      schedule: new Date('2024-06-17 10:52:51.330'),
      status: eMatchStatusType.LIVE,
    },
  });

  const match_two = await prisma.match.create({
    data: {
      team1Id: pune_team.id,
      team2Id: bangalore_team.id,
      schedule: new Date('2024-06-25 10:52:51.330'),
    },
  });

  const match_three = await prisma.match.create({
    data: {
      team1Id: mumbai_team.id,
      team2Id: bangalore_team.id,
      schedule: new Date('2024-06-10 10:52:51.330'),
      team1_score: 3,
      team2_score: 2,
      winnerId: mumbai_team.id,
      status: eMatchStatusType.COMPLETED,
    },
  });

  const match_four = await prisma.match.create({
    data: {
      team1Id: bangalore_team.id,
      team2Id: pune_team.id,
      schedule: new Date('2024-06-22 10:52:51.330'),
      status: eMatchStatusType.CANCELLED,
    },
  });

  const matchstat_one = await prisma.matchStat.create({
    data: {
      teamId: mumbai_team.id,
      matchId: match_three.id,
      playerId: player_three.id,
      goals: 1,
    },
  });

  const matchstat_two = await prisma.matchStat.create({
    data: {
      teamId: mumbai_team.id,
      matchId: match_three.id,
      playerId: player_three.id,
      goals: 1,
    },
  });

  const matchstat_three = await prisma.matchStat.create({
    data: {
      teamId: bangalore_team.id,
      matchId: match_three.id,
      playerId: player_two.id,
      goals: 1,
    },
  });

  const matchstat_four = await prisma.matchStat.create({
    data: {
      teamId: mumbai_team.id,
      matchId: match_three.id,
      playerId: player_three.id,
      goals: 1,
    },
  });

  const matchstat_five = await prisma.matchStat.create({
    data: {
      teamId: bangalore_team.id,
      matchId: match_three.id,
      playerId: player_two.id,
      goals: 1,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
