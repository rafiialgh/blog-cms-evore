const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@evore.com' },
    update: {},
    create: {
      email: 'admin@evore.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
