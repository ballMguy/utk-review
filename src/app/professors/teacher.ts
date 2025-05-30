// app/actions/teacher.ts
'use server';

import { prisma } from '../lib/prisma';

// ดึงอาจารย์ทั้งหมดจากฐานข้อมูล
export async function getTeachers() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { firstName: 'asc' },
    });
    return teachers;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการโหลดรายชื่ออาจารย์:', error);
    return [];
  }
}
