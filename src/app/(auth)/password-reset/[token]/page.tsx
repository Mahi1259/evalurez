"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/hooks/auth";
import AuthSessionStatus from "../../AuthSessionStatus";

const { Title } = Typography;

const PasswordReset: React.FC = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      form.setFieldsValue({ email: emailParam });
    }
  }, [searchParams,form]);

  const submitForm = async (values: any) => {
    try {
      await resetPassword({
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        setErrors: (errors: any) => {
          const errorMessages = errors.email || [];
          if (errorMessages.includes("This password reset token is invalid.")) {
            form.setFields([
              {
                name: "email",
                errors: [
                  "This password reset token is invalid for this email. Please enter the correct email.",
                ],
              },
            ]);
          } else {
            form.setFields([
              {
                name: "email",
                errors: errors.email ? [errors.email] : [],
              },
              {
                name: "password",
                errors: errors.password ? [errors.password] : [],
              },
              {
                name: "passwordConfirmation",
                errors: errors.passwordConfirmation
                  ? [errors.passwordConfirmation]
                  : [],
              },
            ]);
          }
          setStatus(errors.message || null);
        },
        setStatus,
      });
    } catch (error) {
      console.error(error);
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
        <Title
          level={2}
          className=" text-black dark:text-white text-center mb-6"
        >
          Reset Password
        </Title>

        {/* AuthSessionStatus Component */}
        <AuthSessionStatus className="mb-4" status={status} />

        <Form
          form={form}
          layout="vertical"
          onFinish={submitForm}
          autoComplete="off"
        >
          {/* Email Address */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Email"
              autoFocus
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>

          {/* Password */}
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
              prefix={<LockOutlined />}
              placeholder="Password"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="passwordConfirmation"
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
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordReset;
