'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Rate, Input, message } from 'antd';
import { getCoursesWithTeachers } from './course'; // คุณต้องสร้างฟังก์ชันนี้
import type { Course } from '@prisma/client';
import { createReview } from './createReview'; // คุณต้องสร้างฟังก์ชันนี้สำหรับการส่งรีวิว

const { TextArea } = Input;

type CourseWithTeacher = Course & {
  teacher: {
    firstName: string;
    lastName: string;
  };
};

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseWithTeacher[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseWithTeacher | null>(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    getCoursesWithTeachers().then(setCourses);
  }, []);

  const handleReviewClick = (course: CourseWithTeacher) => {
    setSelectedCourse(course);
    setOpen(true);
  };

const handleOk = async () => {
  if (!selectedCourse) return;
  
  const userId = 1; // ← เปลี่ยนเป็น userId จริงจาก context หรือ session
  try {
    await createReview(selectedCourse.id, rating, comment, userId);
    message.success(`ส่งรีวิวสำหรับวิชา ${selectedCourse.name} สำเร็จ`);
  } catch (err) {
    message.error('เกิดข้อผิดพลาดในการส่งรีวิว');
    return;
  }

  setOpen(false);
  setRating(0);
  setComment('');
};


  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">รายวิชาทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            title={course.name}
            className="rounded-xl shadow"
            actions={[
              <Button key="review" type="primary" onClick={() => handleReviewClick(course)}>
                รีวิวเนื้อหา
              </Button>,
            ]}
          >
            <p>คำอธิบาย: {course.description}</p>
            <p>
              ผู้สอน: {course.teacher.firstName} {course.teacher.lastName}
            </p>
          </Card>
        ))}
      </div>

      <Modal
        title={`รีวิววิชา ${selectedCourse?.name ?? ''}`}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
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
            placeholder="เขียนความคิดเห็นของคุณเกี่ยวกับวิชานี้..."
          />
        </div>
      </Modal>
    </main>
  );
};

export default CoursesPage;
