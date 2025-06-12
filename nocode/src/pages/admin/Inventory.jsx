import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PackageIcon, PlusIcon, SearchIcon, FilterIcon, EditIcon, TrashIcon } from "lucide-react";
import ProductForm from "@/components/ProductForm";

// 模拟数据获取函数
const fetchInventory = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    { id: 1, name: "巧克力冰淇淋", type: "ice-cream", category: "巧克力", stock: 120, price: 15, barcode: "1234567890123", description: "经典巧克力口味冰淇淋", image: "chocolate" },
    { id: 2, name: "香草冰淇淋", type: "ice-cream", category: "香草", stock: 150, price: 12, barcode: "1234567890124", description: "纯正香草口味冰淇淋", image: "vanilla" },
    { id: 3, name: "草莓冰淇淋", type: "ice-cream", category: "水果", stock: 100, price: 14, barcode: "1234567890125", description: "新鲜草莓口味冰淇淋", image: "strawberry" },
    { id: 4, name: "抹茶冰淇淋", type: "ice-cream", category: "抹茶", stock: 80, price: 16, barcode: "1234567890126", description: "日本进口抹茶口味冰淇淋", image: "matcha" },
    { id: 5, name: "芒果冰淇淋", type: "ice-cream", category: "水果", stock: 90, price: 13, barcode: "1234567890127", description: "热带芒果口味冰淇淋", image: "mango" },
    { id: 6, name: "薄荷巧克力冰淇淋", type: "ice-cream", category: "巧克力", stock: 60, price: 17, barcode: "1234567890128", description: "清凉薄荷搭配巧克力", image: "mint-chocolate" },
  ];
};

// 模拟添加产品函数
const addProduct = async (product) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 在实际应用中，这里会调用API
  return {
    ...product,
    id: Math.floor(Math.random() * 1000) + 100,
    barcode: Math.random().toString().slice(2, 14),
  };
};

// 模拟编辑产品函数
const editProduct = async (product) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 在实际应用中，这里会调用API
  return product;
};

// 模拟删除产品函数
const deleteProduct = async (productId) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 在实际应用中，这里会调用API
  return productId;
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: inventory, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("产品添加成功");
      setShowAddForm(false);
    },
    onError: () => {
      toast.error("添加产品失败");
    },
  });

  const editMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("产品更新成功");
      setEditingProduct(null);
    },
    onError: () => {
      toast.error("更新产品失败");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("产品删除成功");
    },
    onError: () => {
      toast.error("删除产品失败");
    },
  });

  const filteredInventory = inventory?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm);
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  }) || [];

  const handleAddProduct = (data) => {
    addMutation.mutate(data);
  };

  const handleEditProduct = (data) => {
    editMutation.mutate(data);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`确定要删除产品 "${product.name}" 吗？`)) {
      deleteMutation.mutate(product.id);
    }
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
        <h1 className="text-2xl font-bold">库存管理</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          添加产品
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <ProductForm
            onSubmit={handleAddProduct}
            isLoading={addMutation.isPending}
          />
        </div>
      )}

      {editingProduct && (
        <div className="mb-6">
          <ProductForm
            onSubmit={handleEditProduct}
            initialData={editingProduct}
            isLoading={editMutation.isPending}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索产品名称或条形码..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4 text-gray-400" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="产品类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="ice-cream">冰淇淋</SelectItem>
              <SelectItem value="yogurt">酸奶</SelectItem>
              <SelectItem value="popsicle">冰棒</SelectItem>
              <SelectItem value="dessert">甜品</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">产品图片</th>
              <th className="p-3 text-left">产品名称</th>
              <th className="p-3 text-left">类型</th>
              <th className="p-3 text-left">类别</th>
              <th className="p-3 text-left">条形码</th>
              <th className="p-3 text-left">价格</th>
              <th className="p-3 text-left">库存</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img
                      src={item.image || `https://nocode.meituan.com/photo/search?keyword=${item.name}&width=100&height=100`}
                      alt={item.name}
                      className="mx-auto object-cover w-full h-full"
                    />
                  </div>
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  {item.type === "ice-cream" ? "冰淇淋" :
                   item.type === "yogurt" ? "酸奶" :
                   item.type === "popsicle" ? "冰棒" :
                   item.type === "dessert" ? "甜品" : "其他"}
                </td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.barcode}</td>
                <td className="p-3">¥{item.price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.stock > 50 ? "bg-green-100 text-green-800" :
                    item.stock > 20 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {item.stock}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(item)}
                    >
                      <EditIcon className="h-4 w-4 mr-1" />
                      编辑
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(item)}
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-10">
          <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">没有找到产品</h3>
          <p className="mt-1 text-gray-500">尝试使用不同的搜索条件</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
