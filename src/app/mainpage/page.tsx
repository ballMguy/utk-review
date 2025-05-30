'use client';

import React from 'react';
import { Button, Card, Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

const MainMenuPage: React.FC = () => {
  // ตัวอย่างชื่อผู้ใช้ (ในจริงควรดึงจาก session หรือ auth context)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl" bordered={false}>
        <div className="text-center mb-6">
          <Title level={2} className="!mb-0">ยินดีต้อนรับ</Title>
          <p className="text-gray-500">เลือกเมนูด้านล่างเพื่อเริ่มต้นใช้งาน</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/courses">
            <Button type="primary" block size="large">ดูรายวิชาทั้งหมด</Button>
          </Link>

          <Link href="/professors">
            <Button type="default" block size="large">ดูรายชื่ออาจารย์</Button>
          </Link>

          <Link href="/my-reviews">
            <Button type="dashed" block size="large">รีวิวของฉัน</Button>
          </Link>

          <Link href="/">
            <Button danger block size="large">ออกจากระบบ</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default MainMenuPage;
