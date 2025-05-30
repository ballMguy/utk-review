'use server';
import { prisma } from '../lib/prisma';
export async function register(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  if (!firstName.trim() || !lastName.trim()) {
    return { success: false, message: 'ชื่อและนามสกุลห้ามว่าง' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return { success: false, message: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' };
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      password, // plain text: ทดสอบเท่านั้น
      firstName,
      lastName,
    },
  });

  return {
    success: true,
    message: 'สมัครสมาชิกสำเร็จ',
    user: {
      id: newUser.id,
      username: newUser.username,
    },
  };
}