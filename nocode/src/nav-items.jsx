import { HomeIcon, BarChart3, Package, ShoppingCart, Users, Settings, Tag, FileText, UserCircle } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
 * 定义导航项。用于导航组件和路由。
 */
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "报表中心",
    to: "/reports",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "库存管理",
    to: "/inventory",
    icon: <Package className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "订单管理",
    to: "/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "活动管理",
    to: "/promotions",
    icon: <Tag className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "用户管理",
    to: "/users",
    icon: <Users className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "系统设置",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "我的订单",
    to: "/my-orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "我的收藏",
    to: "/favorites",
    icon: <Package className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "优惠券",
    to: "/coupons",
    icon: <FileText className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "个人中心",
    to: "/profile",
    icon: <UserCircle className="h-4 w-4" />,
    page: <Index />,
  },
];
