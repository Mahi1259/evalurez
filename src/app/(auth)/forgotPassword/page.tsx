"use client";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/auth";
import AuthSessionStatus from "../AuthSessionStatus";

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const { forgotPassword } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const onFinish = async (values: { email: string }) => {
    try {
      await forgotPassword({
        email: values.email,
        setErrors: (errors: any) => {
          form.setFields([
            {
              name: "email",
              errors: errors.email ? [errors.email] : [],
            },
          ]);
          setStatus(errors.message || null);
        },
        setStatus,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors({
        email: "An error occurred. Please try again.",
      });
      message.error("An error occurred. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-[rgb(18,18,18)]">
      <div
        className="bg-white dark:bg-[rgb(18,18,18)] text-black dark:text-white p-12 rounded-lg shadow-lg border border-gray-300 dark:border-black
        transition-shadow duration-300
        dark:shadow-[0px_0px_8px_4px_rgba(255,255,255,0.7)]
        max-w-sm min-w-[500px] w-full"
      >
        <h2 className="text-center text-2xl mb-6 font-semibold">
          Forgot your password?
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          No problem. Just let us know your email address and we will email you
          a password reset link that will allow you to choose a new one.
        </p>

        <AuthSessionStatus className="mb-4" status={status} />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="dark:bg-gray-700 dark:border-gray-600"
              autoFocus
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Email Password Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
