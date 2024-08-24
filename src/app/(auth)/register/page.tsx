"use client";
import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";

const { Text } = Typography;

interface RegisterPageProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [form] = Form.useForm();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  

  const onFinish = async (values: RegisterPageProps) => {

    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        setErrors: (errors: any) => {
          const errorMessages = errors.email || [];
          if (errorMessages.includes("The email has already been taken.")) {
            message.error(
              "Email is already registered. Please use a different email."
            );
          } else {
            form.setFields([
              {
                name: "name",
                errors: errors.name ? [errors.name] : [],
              },
              {
                name: "email",
                errors: errors.email ? [errors.email] : [],
              },
              {
                name: "password",
                errors: errors.password ? [errors.password] : [],
              },
              {
                name: "password_confirmation",
                errors: errors.password_confirmation
                  ? [errors.password_confirmation]
                  : [],
              },
            ]);
          }
        },
      });
    } catch (error) {
      
    }

  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-[rgb(18,18,18)]">
      <div
        className="bg-white dark:bg-[rgb(18,18,18)] text-black dark:text-white p-9 rounded-lg shadow-lg border border-gray-300 dark:border-black
        transition-shadow duration-300
        dark:shadow-[0px_0px_8px_4px_rgba(255,255,255,0.7)]
        max-w-sm min-w-[500px] w-full"
      >
        <h2 className="text-center text-2xl mb-6 font-semibold">
          Register on our website
        </h2>
        <Form
          form={form}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>
          {/* Error messages */}
          {errors &&
            Object.keys(errors).map((key) => (
              <Text key={key} type="danger">
                {errors[key].join(", ")}
              </Text>
            ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
