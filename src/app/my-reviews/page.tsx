'use client';
import React from 'react';

const MyReviewsPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 รีวิวของฉัน</h1>
      <p>นี่คือรีวิวที่คุณเคยส่งไว้ในระบบ.</p>
      {/* ดึงรีวิวของผู้ใช้จากฐานข้อมูลมาแสดง */}
    </main>
  );
};

export default MyReviewsPage;
