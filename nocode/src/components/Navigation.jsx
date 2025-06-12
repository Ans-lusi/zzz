import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HomeIcon, ShoppingBagIcon, ReceiptIcon, UserIcon, BarChartIcon, PackageIcon, SettingsIcon, LogOutIcon } from "lucide-react";

const Navigation = () => {
  const { user, logout, isAdmin } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                冰淇淋销售系统
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                <HomeIcon className="h-4 w-4 mr-1" />
                首页
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                <ShoppingBagIcon className="h-4 w-4 mr-1" />
                商品
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                <ReceiptIcon className="h-4 w-4 mr-1" />
                订单
              </Link>
              {isAdmin() && (
                <>
                  <Link
                    to="/admin/inventory"
                    className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                  >
                    <PackageIcon className="h-4 w-4 mr-1" />
                    库存
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                  >
                    <BarChartIcon className="h-4 w-4 mr-1" />
                    报表
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                  >
                    <ReceiptIcon className="h-4 w-4 mr-1" />
                    订单管理
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://nocode.meituan.com/photo/search?keyword=person&width=100&height=100" alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>个人信息</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/users" className="flex items-center">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>用户管理</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
