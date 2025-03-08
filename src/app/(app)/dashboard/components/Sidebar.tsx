"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Layout, Drawer, ConfigProvider, theme as antTheme } from "antd";
import {
  InfoCircleOutlined,
  MailOutlined,
  ArrowUpOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// import { useAuth } from "../../../hooks/auth";

const { Sider } = Layout;

interface SidebarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  {
    key: "/dashboard",
    icon: <InboxOutlined />,
    label: "Job Postings",
  },
  {
    key: "/dashboard/Upgradeplan",
    icon: <ArrowUpOutlined />,
    label: "Upgrade Plan",
  },
  {
    key: "/dashboard/Aboutus",
    icon: <InfoCircleOutlined />,
    label: "About Us",
  },
  {
    key: "/dashboard/Contact",
    icon: <MailOutlined />,
    label: "Contact",
  },
];

const Sidebar = ({ show, setter }: SidebarProps) => {
  const pathname = usePathname();
  const { theme: currentTheme } = useTheme();
  const isDarkMode = currentTheme === "dark";
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const { user } = useAuth();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleCloseDrawer = () => setter(false);

  const handleMenuClick = (key: string) => {
    if (isMobile) {
      handleCloseDrawer();
    }
  };

  // Custom theme for Ant Design
  const customTheme = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#7F4AD7",
      borderRadius: 6,
      colorLink: "#7F4AD7",
      colorLinkHover: "#9B6AE8",
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      Menu: {
        colorBgContainer: isDarkMode ? "rgb(10,10,10)" : undefined,
        itemBg: isDarkMode ? "rgb(10,10,10)" : undefined,
        itemColor: isDarkMode ? "#FFFFFF" : undefined,
        itemHoverColor: "#7F4AD7",
        itemSelectedColor: "#7F4AD7",
        itemSelectedBg: isDarkMode
          ? "rgba(127, 74, 215, 0.1)"
          : "rgba(127, 74, 215, 0.1)",
        itemHoverBg: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f0f0", // Added hover color for light mode
        itemHeight: 50,
        itemMarginInline: 8,
        fontSize: 15,
      },
      Layout: {
        colorBgHeader: isDarkMode ? "rgb(10,10,10)" : undefined,
        colorBgBody: isDarkMode ? "rgb(10,10,10)" : undefined,
        colorBgTrigger: isDarkMode ? "rgb(18,18,18)" : undefined,
      },
    },
  };

  const renderMenu = () => (
    <ConfigProvider theme={customTheme}>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: React.cloneElement(item.icon, {
            style: {
              fontSize: "20px",
              color: pathname === item.key ? "#7F4AD7" : undefined,
            },
          }),
          label: (
            <Link
              href={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`text-base font-medium ${
                pathname === item.key
                  ? "text-purple-500"
                  : isDarkMode
                  ? "text-white"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ),
        }))}
        style={{
          height: "100%",
          borderRight: 0,
          paddingTop: "12px",
        }}
      />
    </ConfigProvider>
  );

  // Desktop sidebar
  const DesktopSidebar = (
    <ConfigProvider theme={customTheme}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
        className="hidden md:block transition-all duration-300 ease-in-out"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          backgroundColor: isDarkMode ? "rgb(10,10,10)" : undefined,
          borderRight: "none",
          boxShadow: isDarkMode
            ? "none"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center justify-between p-4">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          ></div>
          <button
            onClick={handleToggle}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <MenuUnfoldOutlined className="text-xl" />
            ) : (
              <MenuFoldOutlined className="text-xl" />
            )}
          </button>
        </div>
        {renderMenu()}
      </Sider>
    </ConfigProvider>
  );

  // Mobile drawer
  const MobileDrawer = (
    <Drawer
      placement="left"
      closable={true}
      onClose={handleCloseDrawer}
      open={show}
      width={280}
      closeIcon={<CloseOutlined className="text-lg" />}
      title={<span className="text-lg font-bold">Dashboard</span>}
      style={{
        padding: 0,
        backgroundColor: isDarkMode ? "rgb(10,10,10)" : undefined,
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: `1px solid ${
            isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          backgroundColor: isDarkMode ? "rgb(10,10,10)" : undefined,
        }}
      >
        <span className="text-lg font-bold">Dashboard</span>
      </div>
      {renderMenu()}
    </Drawer>
  );

  // Mobile toggle button (fixed at the bottom)
  const MobileToggle = (
    <div className="fixed bottom-6 left-6 md:hidden z-50">
      <button
        onClick={() => setter(true)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        aria-label="Open menu"
      >
        <MenuUnfoldOutlined className="text-xl" />
      </button>
    </div>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileDrawer}
      {MobileToggle}
    </>
  );
};

export default Sidebar;
