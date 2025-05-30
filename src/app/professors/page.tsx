'use client';
import React from 'react';

const ProfessorsPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">👨‍🏫 รายชื่ออาจารย์</h1>
      <p>ดูข้อมูลอาจารย์ที่สอนวิชาในระบบ.</p>
      {/* รายชื่ออาจารย์สามารถ map จาก API ได้ในอนาคต */}
    </main>
  );
};

export default ProfessorsPage;
