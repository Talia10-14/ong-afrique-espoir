import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const actions = await prisma.action.findMany();
  console.log(JSON.stringify(actions, null, 2));
}
main();
