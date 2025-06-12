import { Button } from "@/components/ui/button";
import { HomeIcon, ListIcon, ReceiptIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/")}>
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">首页</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/categories")}>
            <ListIcon className="h-6 w-6" />
            <span className="text-xs">分类</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/orders")}>
            <ReceiptIcon className="h-6 w-6" />
            <span className="text-xs">订单</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/profile")}>
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">我的</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
