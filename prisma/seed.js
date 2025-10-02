import prisma from './client.js';
import { users, tasks } from './data.js';

const load = async () => {
  try {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({ data: users });
    await prisma.task.createMany({ data: tasks });

    console.log('🌱 Database seeded successfully');
  } catch (error) {
    console.error('❌ Seed failed', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
