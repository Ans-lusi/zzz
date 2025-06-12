import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export function DashboardCard({ title, value, change, icon }) {
  const isPositive = change && change.startsWith("+");
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {change}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
