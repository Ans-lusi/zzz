import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, UserPlus, Edit, Trash2 } from "lucide-react";

// 模拟获取用户数据的函数
const fetchUserData = async () => {
  // 在实际应用中，这里会是一个API调用
  return [
    { id: 1, name: "管理员", email: "admin@example.com", role: "管理员", status: "活跃" },
    { id: 2, name: "销售员1", email: "sales1@example.com", role: "销售员", status: "活跃" },
    { id: 3, name: "销售员2", email: "sales2@example.com", role: "销售员", status: "活跃" },
    { id: 4, name: "库存管理员", email: "inventory@example.com", role: "库存管理员", status: "活跃" },
    { id: 5, name: "财务", email: "finance@example.com", role: "财务", status: "活跃" },
  ];
};

export function UserManagement() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">加载数据失败</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">用户列表</h3>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          添加用户
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
