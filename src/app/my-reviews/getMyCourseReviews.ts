'use server';

import { prisma } from '../lib/prisma';

export async function getMyCourseReviews(userId: number) {
  return await prisma.review.findMany({
    where: { userId },
    include: {
      course: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}
