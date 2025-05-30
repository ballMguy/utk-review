'use client';
import React from 'react';

const CoursesPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 รายวิชาทั้งหมด</h1>
      <p>นี่คือรายการวิชาที่เปิดสอนทั้งหมดในระบบ.</p>
      {/* เพิ่มตารางหรือ card วิชาได้ที่นี่ */}
    </main>
  );
};

export default CoursesPage;
