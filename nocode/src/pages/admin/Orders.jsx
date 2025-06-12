import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ReceiptIcon, SearchIcon, FilterIcon, CheckIcon, XIcon, ClockIcon } from "lucide-react";

// 模拟数据获取函数
const fetchAdminOrders = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: "ORD-001", customer: "张三", date: "2023-06-01", amount: 45, status: "已完成", items: 3, payment: "微信支付" },
    { id: "ORD-002", customer: "李四", date: "2023-06-02", amount: 32, status: "处理中", items: 2, payment: "支付宝" },
    { id: "ORD-003", customer: "王五", date: "2023-06-02", amount: 28, status: "已完成", items: 1, payment: "现金" },
    { id: "ORD-004", customer: "赵六", date: "2023-06-03", amount: 56, status: "已取消", items: 4, payment: "微信支付" },
    { id: "ORD-005", customer: "钱七", date: "2023-06-03", amount: 39, status: "已完成", items: 2, payment: "支付宝" },
    { id: "ORD-006", customer: "孙八", date: "2023-06-04", amount: 62, status: "处理中", items: 3, payment: "微信支付" },
    { id: "ORD-007", customer: "周九", date: "2023-06-04", amount: 48, status: "已完成", items: 2, payment: "现金" },
    { id: "ORD-008", customer: "吴十", date: "2023-06-05", amount: 75, status: "处理中", items: 4, payment: "支付宝" },
  ];
};

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchAdminOrders,
  });

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  }) || [];

  const handleViewOrder = (order) => {
    toast.info(`查看订单 ${order.id} 的详细信息`);
  };

  const handleUpdateStatus = (order, newStatus) => {
    toast.success(`已将订单 ${order.id} 状态更新为 ${newStatus}`);
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
        <h1 className="text-2xl font-bold">订单管理</h1>
        <Button>
          <ReceiptIcon className="mr-2 h-4 w-4" />
          创建订单
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索订单号或客户..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="订单状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="已完成">已完成</SelectItem>
              <SelectItem value="处理中">处理中</SelectItem>
              <SelectItem value="已取消">已取消</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4 text-gray-400" />
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="支付方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部方式</SelectItem>
              <SelectItem value="微信支付">微信支付</SelectItem>
              <SelectItem value="支付宝">支付宝</SelectItem>
              <SelectItem value="现金">现金</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">订单号</th>
              <th className="p-3 text-left">客户</th>
              <th className="p-3 text-left">日期</th>
              <th className="p-3 text-left">金额</th>
              <th className="p-3 text-left">商品数量</th>
              <th className="p-3 text-left">支付方式</th>
              <th className="p-3 text-left">状态</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">¥{order.amount}</td>
                <td className="p-3">{order.items}</td>
                <td className="p-3">{order.payment}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "已完成" ? "bg-green-100 text-green-800" : 
                    order.status === "处理中" ? "bg-blue-100 text-blue-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                      查看详情
                    </Button>
                    {order.status === "处理中" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order, "已完成")}>
                          <CheckIcon className="h-4 w-4 mr-1" />
                          完成
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleUpdateStatus(order, "已取消")}>
                          <XIcon className="h-4 w-4 mr-1" />
                          取消
                        </Button>
                      </>
                    )}
                    {order.status === "已完成" && (
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order, "处理中")}>
                        <ClockIcon className="h-4 w-4 mr-1" />
                        重新处理
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-10">
          <ReceiptIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">没有找到订单</h3>
          <p className="mt-1 text-gray-500">尝试使用不同的搜索条件</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
