'use client';
import Link from 'next/link';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Typography, Card } from 'antd';
import { useRouter } from 'next/navigation'; // ✅ เพิ่ม
import { login } from './action';

const { Title, Text } = Typography;

type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

const LoginPage: React.FC = () => {
  const router = useRouter(); // ✅ ใช้งาน Router

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const isLogin = await login(values.username, values.password);

    if (isLogin) {
      alert('เข้าสู่ระบบสำเร็จ');
      router.push('/mainpage'); // ✅ ไปหน้าเมนู
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl" bordered={false}>
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1">เข้าสู่ระบบ</Title>
          <Text type="secondary">กรุณาใส่ชื่อผู้ใช้และรหัสผ่านของคุณ</Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="ชื่อผู้ใช้"
            name="username"
            rules={[{ required: true, message: 'โปรดใส่ชื่อผู้ใช้ของคุณ' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: 'โปรดใส่รหัสของคุณ' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" className="mb-2">
            <Checkbox>จดจำฉัน</Checkbox>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" block size="large">
              เข้าสู่ระบบ
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Text>ยังไม่มีบัญชี?</Text>{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              สมัครสมาชิก
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
