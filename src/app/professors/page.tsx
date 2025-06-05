'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Rate, Input, message, Spin } from 'antd';
import { Teacher } from '@prisma/client';
import { getTeachers } from './teacher';

const { TextArea } = Input;

const ProfessorsPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        message.error('ไม่สามารถโหลดรายชื่ออาจารย์ได้');
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleReviewClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  const handleOk = () => {
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
      <h1 className="text-2xl font-bold mb-4">รายชื่ออาจารย์</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teachers.map((teacher) => (
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
              
            </Card>
          ))}
        </div>
      )}

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
