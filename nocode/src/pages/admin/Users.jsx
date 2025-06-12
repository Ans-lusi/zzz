import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { UsersIcon, PlusIcon, SearchIcon, FilterIcon, EditIcon, TrashIcon, ShieldIcon } from "lucide-react";

// 模拟数据获取函数
const fetchUsers = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: 1, username: "admin", role: "admin", joinDate: "2023-01-01", lastLogin: "2023-06-05" },
    { id: 2, username: "user1", role: "user", joinDate: "2023-02-15", lastLogin: "2023-06-04" },
    { id: 3, username: "user2", role: "user", joinDate: "2023-03-10", lastLogin: "2023-06-03" },
    { id: 4, username: "user3", role: "user", joinDate: "2023-04-20", lastLogin: "2023-06-02" },
    { id: 5, username: "user4", role: "user", joinDate: "2023-05-05", lastLogin: "2023-06-01" },
  ];
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  const handleAddUser = () => {
    toast.info("添加用户功能开发中");
  };

  const handleEditUser = (user) => {
    toast.info(`编辑用户 ${user.username}`);
  };

  const handleDeleteUser = (user) => {
    toast.success(`已删除用户 ${user.username}`);
  };

  const handleChangeRole = (user) => {
    toast.info(`更改用户 ${user.username} 的角色`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <Button onClick={handleAddUser}>
          <PlusIcon className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索用户名..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4 text-gray-400" />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="用户角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部角色</SelectItem>
              <SelectItem value="admin">管理员</SelectItem>
              <SelectItem value="user">普通用户</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">用户名</th>
              <th className="p-3 text-left">角色</th>
              <th className="p-3 text-left">加入日期</th>
              <th className="p-3 text-left">最后登录</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.username}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {user.role === "admin" ? "管理员" : "普通用户"}
                  </span>
                </td>
                <td className="p-3">{user.joinDate}</td>
                <td className="p-3">{user.lastLogin}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    {user.role !== "admin" && (
                      <Button variant="outline" size="icon" onClick={() => handleChangeRole(user)}>
                        <ShieldIcon className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(user)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center py-10">
          <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">没有找到用户</h3>
          <p className="mt-1 text-gray-500">尝试使用不同的搜索条件</p>
        </div>
      )}
    </div>
  );
};

export default Users;
