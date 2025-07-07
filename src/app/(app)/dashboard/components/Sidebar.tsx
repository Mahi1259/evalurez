"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Layout, Drawer, ConfigProvider, theme as antTheme } from "antd"
import {
  InfoCircleOutlined,
  MailOutlined,
  ArrowUpOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

const { Sider } = Layout

interface SidebarProps {
  show: boolean
  setter: React.Dispatch<React.SetStateAction<boolean>>
}

const menuItems = [
  {
    key: "/dashboard",
    icon: <InboxOutlined />,
    label: "Job Postings",
  },
  {
    key: "/resume-builder",
    icon: <FileTextOutlined />,
    label: "Resume Builder",
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
]

const Sidebar = ({ show, setter }: SidebarProps) => {
  const pathname = usePathname()
  const { theme: currentTheme } = useTheme()
  const isDarkMode = currentTheme === "dark"
  const [collapsed, setCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleToggle = () => {
    setCollapsed(!collapsed)
  }

  const handleCloseDrawer = () => setter(false)

  const handleMenuClick = (key: string) => {
    if (isMobile) {
      handleCloseDrawer()
    }
  }

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
        colorBgContainer: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        itemBg: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        colorBgElevated: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        itemColor: isDarkMode ? "#FFFFFF" : undefined,
        itemHoverColor: "#7F4AD7",
        itemSelectedColor: "#7F4AD7",
        itemSelectedBg: isDarkMode ? "rgba(127, 74, 215, 0.1)" : "rgba(127, 74, 215, 0.1)",
        itemHoverBg: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "#f0f0f0",
        itemHeight: 50,
        itemMarginInline: 8,
        fontSize: 15,
      },
      Layout: {
        headerBg: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        bodyBg: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        triggerBg: isDarkMode ? "rgb(10, 10, 10)" : undefined,
        siderBg: isDarkMode ? "rgb(10, 10, 10)" : undefined,
      },
      Drawer: {
        colorBgElevated: isDarkMode ? "rgb(10, 10, 10)" : undefined,
      },
    },
  }

  const renderMenu = () => (
    <ConfigProvider theme={customTheme}>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: React.cloneElement(item.icon, {
            className: `text-xl ${pathname === item.key ? "text-purple-500" : ""}`,
          }),
          label: (
            <Link
              href={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`text-base font-medium ${
                pathname === item.key ? "text-purple-500" : isDarkMode ? "text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ),
        }))}
        className={`h-full border-r-0 pt-3 ${isDarkMode ? "[&_.ant-menu]:!bg-[rgb(10,10,10)]" : ""}`}
      />
    </ConfigProvider>
  )

  const DesktopSidebar = (
    <ConfigProvider theme={customTheme}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
        className={`hidden md:block transition-all duration-300 ease-in-out overflow-auto h-screen sticky top-0 left-0 shadow-sm ${
          isDarkMode ? "[&_.ant-layout-sider-children]:!bg-[rgb(10,10,10)]" : ""
        }`}
      >
        <div className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-[rgb(10,10,10)]" : ""}`}>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          ></div>
          <button
            onClick={handleToggle}
            className={`p-2 rounded-md transition-colors ${
              isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MenuUnfoldOutlined className="text-xl" /> : <MenuFoldOutlined className="text-xl" />}
          </button>
        </div>
        {renderMenu()}
      </Sider>
    </ConfigProvider>
  )

  const MobileDrawer = (
    <ConfigProvider theme={customTheme}>
      <Drawer
        placement="left"
        closable={true}
        onClose={handleCloseDrawer}
        open={show}
        width={280}
        closeIcon={<CloseOutlined className="text-lg text-gray-700 dark:text-gray-300" />}
        title={<span className="text-lg font-bold text-gray-900 dark:text-gray-100"></span>}
        className={isDarkMode ? "[&_.ant-drawer-content]:!bg-[rgb(10,10,10)]" : ""}
        styles={{
          body: {
            padding: 0,
          },
          header: {
            borderBottom: isDarkMode ? "1px solid #374151" : undefined,
          },
        }}
      >
        <div className={`p-4 border-b ${isDarkMode ? "border-gray-800 bg-[rgb(10,10,10)]" : "border-gray-200"}`}></div>
        {renderMenu()}
      </Drawer>
    </ConfigProvider>
  )

  const MobileToggle = (
    <div className="fixed bottom-6 left-6 md:hidden z-50">
      <button
        onClick={() => setter(true)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-colors"
        aria-label="Open navigation menu"
        title="Open navigation menu"
      >
        <MenuUnfoldOutlined className="text-xl" />
      </button>
    </div>
  )

  return (
    <>
      {DesktopSidebar}
      {MobileDrawer}
      {MobileToggle}
    </>
  )
}

export default Sidebar