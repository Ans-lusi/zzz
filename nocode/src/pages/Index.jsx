import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon, ReceiptIcon, UsersIcon, TrendingUpIcon } from "lucide-react";

// 模拟数据获取函数
const fetchDashboardData = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    sales: {
      today: 1200,
      yesterday: 950,
      thisWeek: 6800,
      thisMonth: 24500,
    },
    products: [
      { name: "巧克力冰淇淋", sales: 120 },
      { name: "香草冰淇淋", sales: 95 },
      { name: "草莓冰淇淋", sales: 80 },
      { name: "抹茶冰淇淋", sales: 65 },
      { name: "芒果冰淇淋", sales: 50 },
    ],
    categories: [
      { name: "巧克力", value: 35 },
      { name: "水果", value: 25 },
      { name: "香草", value: 20 },
      { name: "抹茶", value: 15 },
      { name: "其他", value: 5 },
    ],
    recentOrders: [
      { id: "ORD-001", customer: "张三", amount: 45, status: "已完成" },
      { id: "ORD-002", customer: "李四", amount: 32, status: "处理中" },
      { id: "ORD-003", customer: "王五", amount: 28, status: "已完成" },
      { id: "ORD-004", customer: "赵六", amount: 56, status: "已取消" },
    ],
  };
};

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日销售额</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{data.sales.today}</div>
            <p className="text-xs text-muted-foreground">
              较昨日 {data.sales.today > data.sales.yesterday ? "+" : ""}
              {Math.round(((data.sales.today - data.sales.yesterday) / data.sales.yesterday) * 100)}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本周销售额</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{data.sales.thisWeek}</div>
            <p className="text-xs text-muted-foreground">平均每日 ¥{Math.round(data.sales.thisWeek / 7)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月销售额</CardTitle>
            <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{data.sales.thisMonth}</div>
            <p className="text-xs text-muted-foreground">目标 ¥30,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">较上周 +12%</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>销售趋势</CardTitle>
            <CardDescription>过去7天的销售数据</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: "周一", sales: 800 },
                { name: "周二", sales: 950 },
                { name: "周三", sales: 1100 },
                { name: "周四", sales: 1050 },
                { name: "周五", sales: 1200 },
                { name: "周六", sales: 1500 },
                { name: "周日", sales: 1300 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>产品销量分布</CardTitle>
            <CardDescription>各类冰淇淋的销售占比</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>热门产品</CardTitle>
            <CardDescription>销量最高的产品</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.products.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-muted-foreground">{product.sales} 份</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(product.sales / data.products[0].sales) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>最新的订单信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">¥{order.amount}</p>
                    <p className={`text-sm ${
                      order.status === "已完成" ? "text-green-500" : 
                      order.status === "处理中" ? "text-blue-500" : "text-red-500"
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => navigate("/orders")}
            >
              查看全部订单
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
