import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserIcon, LogOutIcon, SettingsIcon, ShoppingBagIcon, ReceiptIcon } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: "user@example.com",
    phone: "13800138000",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("个人信息已更新");
  };

  const handleLogout = () => {
    logout();
    toast.success("已成功退出登录");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的账户</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=person&width=200&height=200" 
                  alt="用户头像" 
                  className="mx-auto object-cover w-full h-full"
                />
              </div>
              <CardTitle>{user?.username}</CardTitle>
              <CardDescription>{user?.role === "admin" ? "管理员" : "普通用户"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>{user?.username}</span>
              </div>
              <div className="flex items-center">
                <ReceiptIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>已下单: 12 次</span>
              </div>
              <div className="flex items-center">
                <ShoppingBagIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>收藏商品: 5 个</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                退出登录
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>账户设置</CardTitle>
              <CardDescription>管理您的个人信息和账户设置</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">个人信息</TabsTrigger>
                  <TabsTrigger value="orders">我的订单</TabsTrigger>
                  <TabsTrigger value="settings">账户设置</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">用户名</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">电子邮箱</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号码</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          取消
                        </Button>
                        <Button onClick={handleSave}>
                          保存更改
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        编辑信息
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">最近订单</h3>
                      <Button variant="outline" size="sm">
                        查看全部
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">订单 #{1000 + order}</p>
                            <p className="text-sm text-gray-500">2023-06-{order + 10}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">¥{20 + order * 5}</p>
                            <p className="text-sm text-green-500">已完成</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">账户安全</h3>
                      <Button variant="outline" className="w-full justify-start">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        修改密码
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        绑定微信
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">通知设置</h3>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>订单状态通知</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>促销活动通知</span>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
