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
import { Barcode, AlertTriangle } from "lucide-react";

// 模拟获取库存数据的函数
const fetchInventoryData = async () => {
  // 在实际应用中，这里会是一个API调用
  return [
    { id: 1, name: "巧克力冰淇淋", category: "巧克力", barcode: "6901234567890", stock: 120, price: 15.00, status: "正常" },
    { id: 2, name: "香草冰淇淋", category: "香草", barcode: "6901234567891", stock: 85, price: 12.00, status: "正常" },
    { id: 3, name: "草莓冰淇淋", category: "水果", barcode: "6901234567892", stock: 45, price: 14.00, status: "预警" },
    { id: 4, name: "抹茶冰淇淋", category: "抹茶", barcode: "6901234567893", stock: 30, price: 16.00, status: "预警" },
    { id: 5, name: "芒果冰淇淋", category: "水果", barcode: "6901234567894", stock: 15, price: 18.00, status: "缺货" },
  ];
};

export function InventoryTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventoryData"],
    queryFn: fetchInventoryData,
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
            <TableHead>商品名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>条形码</TableHead>
            <TableHead>库存</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Barcode className="h-4 w-4 mr-1" />
                  {item.barcode}
                </div>
              </TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>¥{item.price.toFixed(2)}</TableCell>
              <TableCell>
                {item.status === "正常" && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">正常</Badge>}
                {item.status === "预警" && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">预警</Badge>}
                {item.status === "缺货" && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">缺货</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  编辑
                </Button>
                <Button variant="ghost" size="sm">
                  补货
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
