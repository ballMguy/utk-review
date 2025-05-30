'use client';

import React from 'react';
import { Button, Form, Input, Typography, Card } from 'antd';
import type { FormProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from './actionReg'; // 👈 นำเข้า action

const { Title, Text } = Typography;

type RegisterFields = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const onFinish: FormProps<RegisterFields>['onFinish'] = async (values) => {
    const res = await register(
      values.username!,
      values.password!,
      values.firstName!,
      values.lastName!
    );

    if (res.success) {
      alert('สมัครสมาชิกสำเร็จ');
      router.push('/'); // 👈 เปลี่ยนเส้นทางไป login
    } else {
      alert(res.message);
    }
  };

  const onFinishFailed: FormProps<RegisterFields>['onFinishFailed'] = (errorInfo) => {
    console.log('Register Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl" bordered={false}>
        <div className="text-center mb-6">
          <Title level={2}>สมัครสมาชิก</Title>
          <Text type="secondary">สร้างบัญชีใหม่เพื่อเริ่มใช้งาน</Text>
        </div>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" label="ชื่อผู้ใช้" rules={[{ required: true, message: 'กรุณาใส่ชื่อผู้ใช้' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="firstName" label="ชื่อจริง" rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="lastName" label="นามสกุล" rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true, message: 'กรุณาใส่รหัสผ่าน' }]}>
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            dependencies={['password']}
            rules={[
              { required: true, message: 'กรุณายืนยันรหัสผ่าน' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              สมัครสมาชิก
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Text>มีบัญชีอยู่แล้ว?</Text>{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
