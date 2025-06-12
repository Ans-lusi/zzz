import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Home, 
  Tag, 
  FileText, 
  UserCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar({ userRole }) {
  const location = useLocation();
  
  const adminNavItems = [
    { icon: <Home className="h-5 w-5" />, label: "首页", href: "/" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "报表中心", href: "/reports" },
    { icon: <Package className="h-5 w-5" />, label: "库存管理", href: "/inventory" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "订单管理", href: "/orders" },
    { icon: <Tag className="h-5 w-5" />, label: "活动管理", href: "/promotions" },
    { icon: <Users className="h-5 w-5" />, label: "用户管理", href: "/users" },
    { icon: <Settings className="h-5 w-5" />, label: "系统设置", href: "/settings" },
  ];
  
  const userNavItems = [
    { icon: <Home className="h-5 w-5" />, label: "首页", href: "/" },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "我的订单", href: "/my-orders" },
    { icon: <Package className="h-5 w-5" />, label: "我的收藏", href: "/favorites" },
    { icon: <FileText className="h-5 w-5" />, label: "优惠券", href: "/coupons" },
    { icon: <UserCircle className="h-5 w-5" />, label: "个人中心", href: "/profile" },
  ];

  const navItems = userRole === "admin" ? adminNavItems : userNavItems;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img
            src="https://nocode.meituan.com/photo/search?keyword=ice%20cream&width=40&height=40"
            alt="冰淇淋图标"
            className="mx-auto object-cover w-10 h-10 mr-2"
          />
          <h1 className="text-xl font-bold text-blue-600">冰淇淋销售系统</h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="h-5 w-5 mr-2" />
          退出登录
        </Button>
      </div>
    </div>
  );
}
