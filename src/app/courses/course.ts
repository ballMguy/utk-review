'use server';

import { prisma } from '../lib/prisma';

export async function getCoursesWithTeachers() {
  try {
    return await prisma.course.findMany({
      include: {
        teacher: true,
      },
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    console.error('โหลดรายวิชาล้มเหลว:', err);
    return [];
  }
}
