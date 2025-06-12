import { useQuery } from "@tanstack/react-query";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// 模拟获取销售数据的函数
const fetchSalesData = async () => {
  // 在实际应用中，这里会是一个API调用
  return [
    { date: "1日", sales: 4000, profit: 2400 },
    { date: "5日", sales: 3000, profit: 1398 },
    { date: "10日", sales: 2000, profit: 9800 },
    { date: "15日", sales: 2780, profit: 3908 },
    { date: "20日", sales: 1890, profit: 4800 },
    { date: "25日", sales: 2390, profit: 3800 },
    { date: "30日", sales: 3490, profit: 4300 },
  ];
};

export function SalesChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["salesData"],
    queryFn: fetchSalesData,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">加载数据失败</div>;
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            name="销售额"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="profit" name="利润" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
