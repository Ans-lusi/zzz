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
import { ShoppingCart, CheckCircle, Clock, XCircle } from "lucide-react";

// 模拟获取订单数据的函数
const fetchOrderData = async (isUserView = false) => {
  // 在实际应用中，这里会是一个API调用
  if (isUserView) {
    return [
      { id: "ORD-001", date: "2023-06-01", items: 3, total: 45.00, status: "已完成" },
      { id: "ORD-002", date: "2023-06-05", items: 2, total: 27.00, status: "已完成" },
      { id: "ORD-003", date: "2023-06-10", items: 5, total: 75.00, status: "处理中" },
      { id: "ORD-004", date: "2023-06-15", items: 1, total: 15.00, status: "已取消" },
    ];
  }
  
  return [
    { id: "ORD-001", customer: "张三", date: "2023-06-01", items: 3, total: 45.00, status: "已完成" },
    { id: "ORD-002", customer: "李四", date: "2023-06-05", items: 2, total: 27.00, status: "已完成" },
    { id: "ORD-003", customer: "王五", date: "2023-06-10", items: 5, total: 75.00, status: "处理中" },
    { id: "ORD-004", customer: "赵六", date: "2023-06-15", items: 1, total: 15.00, status: "已取消" },
    { id: "ORD-005", customer: "钱七", date: "2023-06-20", items: 4, total: 60.00, status: "已完成" },
    { id: "ORD-006", customer: "孙八", date: "2023-06-25", items: 2, total: 30.00, status: "处理中" },
    { id: "ORD-007", customer: "周九", date: "2023-06-30", items: 3, total: 45.00, status: "已完成" },
    { id: "ORD-008", customer: "吴十", date: "2023-07-01", items: 1, total: 15.00, status: "处理中" },
    { id: "ORD-009", customer: "郑十一", date: "2023-07-05", items: 2, total: 30.00, status: "已完成" },
    { id: "ORD-010", customer: "王十二", date: "2023-07-10", items: 4, total: 60.00, status: "处理中" },
  ];
};

export function OrderList({ isUserView = false }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderData", isUserView],
    queryFn: () => fetchOrderData(isUserView),
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">加载数据失败</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            {!isUserView && <TableHead>客户</TableHead>}
            <TableHead>日期</TableHead>
            <TableHead>商品数量</TableHead>
            <TableHead>总金额</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              {!isUserView && <TableCell>{order.customer}</TableCell>}
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>¥{order.total.toFixed(2)}</TableCell>
              <TableCell>
                {order.status === "已完成" && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    已完成
                  </Badge>
                )}
                {order.status === "处理中" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    处理中
                  </Badge>
                )}
                {order.status === "已取消" && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    已取消
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  查看
                </Button>
                {order.status === "处理中" && (
                  <Button variant="ghost" size="sm">
                    完成
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
