import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { toast } from "sonner";
import { BarChartIcon, DownloadIcon, CalendarIcon } from "lucide-react";

// 模拟数据获取函数
const fetchReports = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    sales: {
      hourly: [
        { hour: "08:00", sales: 120 },
        { hour: "09:00", sales: 180 },
        { hour: "10:00", sales: 250 },
        { hour: "11:00", sales: 320 },
        { hour: "12:00", sales: 400 },
        { hour: "13:00", sales: 380 },
        { hour: "14:00", sales: 350 },
        { hour: "15:00", sales: 300 },
        { hour: "16:00", sales: 280 },
        { hour: "17:00", sales: 250 },
        { hour: "18:00", sales: 200 },
        { hour: "19:00", sales: 150 },
      ],
      daily: [
        { date: "周一", sales: 1800, profit: 900 },
        { date: "周二", sales: 2100, profit: 1050 },
        { date: "周三", sales: 2400, profit: 1200 },
        { date: "周四", sales: 2200, profit: 1100 },
        { date: "周五", sales: 2800, profit: 1400 },
        { date: "周六", sales: 3500, profit: 1750 },
        { date: "周日", sales: 3200, profit: 1600 },
      ],
      monthly: [
        { month: "1月", sales: 85000, profit: 42500 },
        { month: "2月", sales: 78000, profit: 39000 },
        { month: "3月", sales: 92000, profit: 46000 },
        { month: "4月", sales: 88000, profit: 44000 },
        { month: "5月", sales: 95000, profit: 47500 },
        { month: "6月", sales: 102000, profit: 51000 },
      ],
      yearly: [
        { year: "2020", sales: 850000, profit: 425000 },
        { year: "2021", sales: 920000, profit: 460000 },
        { year: "2022", sales: 1050000, profit: 525000 },
        { year: "2023", sales: 1200000, profit: 600000 },
      ],
    },
    products: [
      { name: "巧克力冰淇淋", sales: 1200, profit: 600 },
      { name: "香草冰淇淋", sales: 950, profit: 475 },
      { name: "草莓冰淇淋", sales: 800, profit: 400 },
      { name: "抹茶冰淇淋", sales: 650, profit: 325 },
      { name: "芒果冰淇淋", sales: 500, profit: 250 },
    ],
    categories: [
      { name: "巧克力", value: 35 },
      { name: "水果", value: 25 },
      { name: "香草", value: 20 },
      { name: "抹茶", value: 15 },
      { name: "其他", value: 5 },
    ],
    recommendations: [
      { product: "巧克力冰淇淋", currentStock: 120, recommendedStock: 150, reason: "高销量产品" },
      { product: "草莓冰淇淋", currentStock: 100, recommendedStock: 120, reason: "季节性需求增加" },
      { product: "抹茶冰淇淋", currentStock: 80, recommendedStock: 100, reason: "稳定需求" },
    ],
  };
};

const Reports = () => {
  const [timeRange, setTimeRange] = useState("daily");
  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const handleExport = () => {
    toast.success("报表导出功能开发中");
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const getSalesData = () => {
    switch (timeRange) {
      case "hourly":
        return reports.sales.hourly;
      case "daily":
        return reports.sales.daily;
      case "monthly":
        return reports.sales.monthly;
      case "yearly":
        return reports.sales.yearly;
      default:
        return reports.sales.daily;
    }
  };

  const getXAxisDataKey = () => {
    switch (timeRange) {
      case "hourly":
        return "hour";
      case "daily":
        return "date";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "date";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">销售报表</h1>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">小时报表</SelectItem>
              <SelectItem value="daily">日报表</SelectItem>
              <SelectItem value="monthly">月报表</SelectItem>
              <SelectItem value="yearly">年报表</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            导出报表
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>总销售额</CardTitle>
            <CardDescription>当前时间段</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ¥{getSalesData().reduce((sum, item) => sum + (item.sales || 0), 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>总利润</CardTitle>
            <CardDescription>当前时间段</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ¥{getSalesData().reduce((sum, item) => sum + (item.profit || 0), 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>平均每日销售额</CardTitle>
            <CardDescription>当前时间段</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ¥{Math.round(getSalesData().reduce((sum, item) => sum + (item.sales || 0), 0) / getSalesData().length)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>销售趋势</CardTitle>
            <CardDescription>按{timeRange === "hourly" ? "小时" : timeRange === "daily" ? "天" : timeRange === "monthly" ? "月" : "年"}统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getSalesData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisDataKey()} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="销售额" />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="利润" />
              </LineChart>
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
                  data={reports.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {reports.categories.map((entry, index) => (
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
              {reports.products.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-muted-foreground">¥{product.sales}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(product.sales / reports.products[0].sales) * 100}%` }}
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
            <CardTitle>采购建议</CardTitle>
            <CardDescription>基于销售数据的库存建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.recommendations.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{item.product}</h4>
                    <span className="text-sm text-gray-500">{item.reason}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">当前库存</p>
                      <p className="font-medium">{item.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">建议库存</p>
                      <p className="font-medium text-blue-600">{item.recommendedStock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
