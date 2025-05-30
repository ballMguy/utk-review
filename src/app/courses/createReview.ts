'use server';

import { prisma } from '../lib/prisma';

export async function createReview(courseId: number, rating: number, comment: string, userId: number) {
  return prisma.review.create({
    data: {
      courseId,
      rating,
      comment,
      userId,
    },
  });
}
