'use client';
import React from 'react';
import { Card, Button, Modal, Rate, Input, message } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

type Teacher = {
  id: number;
  firstName: string;
  lastName: string;
};

const mockTeachers: Teacher[] = [
  { id: 1, firstName: 'อนันต์', lastName: 'ใจดี' },
  { id: 2, firstName: 'เบญจา', lastName: 'เก่งกล้า' },
  { id: 3, firstName: 'ชัยพร', lastName: 'มีวิชา' },
];

const ProfessorsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleReviewClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  const handleOk = () => {
    // ในอนาคตสามารถส่งไป API
    message.success(`รีวิวอาจารย์ ${selectedTeacher?.firstName} สำเร็จ`);
    setOpen(false);
    setRating(0);
    setComment('');
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">👨‍🏫 รายชื่ออาจารย์</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            title={`${teacher.firstName} ${teacher.lastName}`}
            className="rounded-xl shadow"
            actions={[
              <Button
                key={`review-btn-${teacher.id}`}
                type="primary"
                onClick={() => handleReviewClick(teacher)}
              >
                รีวิว
              </Button>,
            ]}
          >
            <p>วิชาที่สอน: <i>กำลังโหลดจากระบบ...</i></p>
          </Card>
        ))}
      </div>

      <Modal
        title={`รีวิวอาจารย์ ${selectedTeacher?.firstName ?? ''} ${selectedTeacher?.lastName ?? ''}`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ส่งรีวิว"
        cancelText="ยกเลิก"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">ให้คะแนน</label>
          <Rate value={rating} onChange={setRating} />
        </div>
        <div>
          <label className="block mb-1 font-medium">ความคิดเห็น</label>
          <TextArea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
          />
        </div>
      </Modal>
    </main>
  );
};

export default ProfessorsPage;
