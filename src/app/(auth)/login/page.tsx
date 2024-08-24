"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button,message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import AuthSessionStatus from "../AuthSessionStatus";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const [form] = Form.useForm(); // Initialize the form
  const [loading, setLoading] = useState<boolean>(false);
  const [router, setRouter] = useState<any>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [status, setStatus] = useState<string | null>(null); // Added status state

  useEffect(() => {
    import("next/router").then((NextRouter) => {
      setRouter(NextRouter.default);
    });
  }, []);

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    setErrors({});

    try {
      await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
        setErrors: (errors: any) => {
          const errorMessages = errors.email || [];
          if (
            errorMessages.includes(
              "These credentials do not match our records."
            )
          ) {
            message.error("Invalid credentials. Please check your email or password.");
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
            ]);
          }
          setStatus(errors.message || null);
        },
        setStatus,
      });
      router.push("/dashboard");
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!router) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-[rgb(18,18,18)]">
      <div
        className="bg-white dark:bg-[rgb(18,18,18)] text-black dark:text-white p-12 rounded-lg shadow-lg border border-gray-300 dark:border-black
        transition-shadow duration-300
        dark:shadow-[0px_0px_8px_4px_rgba(255,255,255,0.7)]
        max-w-sm min-w-[500px] w-full"
      >
        <h2 className="text-center text-2xl mb-6 font-semibold">
          Login to your account
        </h2>

        {/* AuthSessionStatus Component */}
        <AuthSessionStatus className="mb-4" status={status} />

        <Form
          form={form} // Pass the form instance
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
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
              prefix={<LockOutlined />}
              placeholder="Password"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </Form.Item>
          <div className="flex items-center justify-between mt-4">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="text-black dark:text-white">
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item className="text-black dark:text-white">
              <Link href="/forgotPassword">Forgot password?</Link>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
