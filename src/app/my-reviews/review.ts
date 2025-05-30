'use server';

import { prisma } from '../lib/prisma';

export async function createCourseReview(
  courseId: number,
  rating: number,
  comment: string,
  userId: number
) {
  return prisma.review.create({
    data: {
      rating,
      comment,
      courseId,
      userId,
    },
    include: {
      course: true, // สำหรับใช้แสดงชื่อวิชาในหน้ารีวิว
    },
  });
}
