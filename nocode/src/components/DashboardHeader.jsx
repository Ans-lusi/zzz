import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center flex-1">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索..."
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
              3
            </Badge>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://nocode.meituan.com/photo/search?keyword=person&width=40&height=40" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">管理员</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
