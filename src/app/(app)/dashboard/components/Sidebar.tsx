"use client";
import { Layout, Menu, Drawer } from "antd";
import {
  InfoCircleOutlined,
  MailOutlined,
  ArrowUpOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use new hook

const { Sider } = Layout;

interface SidebarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  {
    key: "1",
    icon: <InboxOutlined style={{ fontSize: "24px", color: "inherit" }} />,
    label: "Job Postings",
    href: "/dashboard",
  },
  {
    key: "2",
    icon: <ArrowUpOutlined style={{ fontSize: "24px", color: "inherit" }} />,
    label: "Upgrade Plan",
    href: "/dashboard/Upgradeplan",
  },
  {
    key: "3",
    icon: <InfoCircleOutlined style={{ fontSize: "24px", color: "inherit" }} />,
    label: "About Us",
    href: "/dashboard/Aboutus",
  },
  {
    key: "4",
    icon: <MailOutlined style={{ fontSize: "24px", color: "inherit" }} />,
    label: "Contact",
    href: "/dashboard/Contact",
  },
];

const Sidebar = ({ show, setter }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [status, setStatus] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleToggle = () => {
    setStatus(true);
    setCollapsed(!collapsed);
    setTimeout(() => setStatus(false), 500);
  };

  const handleCloseDrawer = () => setter(false);

  const renderMenu = (isDrawer: boolean) => (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[currentPath]}
      items={[
        ...menuItems.map(({ key, icon, label, href }) => {
          const isActive = currentPath === href;
          return {
            key,
            icon: React.cloneElement(icon, {
              style: {
                fontSize: "24px",
                color: isActive ? "#7F4AD7" : "inherit",
                filter: isActive ? "drop-shadow(0 0 6px blue)" : "none",
              },
            }),
            label: (
              <Link
                href={href}
                onClick={isDrawer ? handleCloseDrawer : () => setter(false)}
                className={`block w-full py-2 px-3 rounded-md text-base ${
                  isActive
                    ? "text-purple-500 dark:text-purple-400"
                    : "dark:text-white"
                } hover:bg-gray-300 dark:hover:bg-gray-400 hover:text-white`}
              >
                {label}
              </Link>
            ),
            style: {
              color: isActive ? "#7F4AD7" : "inherit",
              backgroundColor: "transparent",
              fontSize: "18px",
              fontWeight: isActive ? "bold" : "normal",
            },
          };
        }),
        {
          key: "5",
          icon: <UserOutlined style={{ fontSize: "24px", color: "inherit" }} />,
          label: user?.email || "Not logged in",
          style: {
            marginTop: "415px",
            color: "inherit",
            background: "transparent",
            fontSize: "18px",
          },
          className: "dark:text-white",
        },
      ]}
      className="dark:bg-[rgb(18,18,18)] dark:text-white"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: "18px",
      }}
    />
  );

  return (
    <>
      <Sider
        className="site-layout-background dark:bg-[rgb(18,18,18)] dark:text-white"
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <div className="p-2 flex items-center justify-end">
          <ChevronLeft
            className={`cursor-pointer text-3xl text-gray-500 dark:text-white transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
            onClick={handleToggle}
          />
        </div>
        {renderMenu(false)}
      </Sider>
      <Drawer
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        open={show}
        width={300}
        style={{
          padding: 0,
        }}
        className="dark:bg-[rgb(18,18,18)] dark:text-white"
      >
        {renderMenu(true)}
      </Drawer>
    </>
  );
};

export default Sidebar;
