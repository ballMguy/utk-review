'use client';

import React from 'react';
import { Button, Form, Input, Typography, Card } from 'antd';
import type { FormProps } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

type RegisterFields = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<RegisterFields>['onFinish'] = (values) => {
  console.log('Register Success:', values);
  // TODO: call register API
};

const onFinishFailed: FormProps<RegisterFields>['onFinishFailed'] = (errorInfo) => {
  console.log('Register Failed:', errorInfo);
};

const RegisterPage: React.FC = () => (
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
        <Form.Item<RegisterFields>
          label="ชื่อผู้ใช้"
          name="username"
          rules={[{ required: true, message: 'กรุณาใส่ชื่อผู้ใช้' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<RegisterFields>
          label="อีเมล"
          name="email"
          rules={[
            { required: true, message: 'กรุณาใส่อีเมล' },
            { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<RegisterFields>
          label="รหัสผ่าน"
          name="password"
          rules={[{ required: true, message: 'กรุณาใส่รหัสผ่าน' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item<RegisterFields>
          label="ยืนยันรหัสผ่าน"
          name="confirmPassword"
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

export default RegisterPage;
