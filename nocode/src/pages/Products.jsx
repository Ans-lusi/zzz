import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { ShoppingBagIcon, PlusIcon, SearchIcon, FilterIcon } from "lucide-react";
import ProductForm from "@/components/ProductForm";
import ProductTypeSelect from "@/components/ProductTypeSelect";

// 模拟数据获取函数
const fetchProducts = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    { id: 1, name: "巧克力冰淇淋", type: "ice-cream", price: 15, stock: 120, category: "巧克力", image: "chocolate", description: "经典巧克力口味冰淇淋" },
    { id: 2, name: "香草冰淇淋", type: "ice-cream", price: 12, stock: 150, category: "香草", image: "vanilla", description: "纯正香草口味冰淇淋" },
    { id: 3, name: "草莓冰淇淋", type: "ice-cream", price: 14, stock: 100, category: "水果", image: "strawberry", description: "新鲜草莓口味冰淇淋" },
    { id: 4, name: "抹茶冰淇淋", type: "ice-cream", price: 16, stock: 80, category: "抹茶", image: "matcha", description: "日本进口抹茶口味冰淇淋" },
    { id: 5, name: "芒果冰淇淋", type: "ice-cream", price: 13, stock: 90, category: "水果", image: "mango", description: "热带芒果口味冰淇淋" },
    { id: 6, name: "薄荷巧克力冰淇淋", type: "ice-cream", price: 17, stock: 60, category: "巧克力", image: "mint-chocolate", description: "清凉薄荷搭配巧克力" },
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
  };
};

const Products = () => {
  const { isAdmin } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("产品添加成功");
      setShowAddForm(false);
    },
    onError: () => {
      toast.error("添加产品失败");
    },
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || product.type === typeFilter;
    return matchesSearch && matchesType;
  }) || [];

  const handleAddToCart = (product) => {
    toast.success(`已添加 ${product.name} 到购物车`);
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
        <h1 className="text-2xl font-bold">商品列表</h1>
        {isAdmin && (
          <Button onClick={() => setShowAddForm(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            添加商品
          </Button>
        )}
      </div>

      {showAddForm && isAdmin && (
        <div className="mb-6">
          <ProductForm
            onSubmit={addMutation.mutate}
            isLoading={addMutation.isPending}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索商品..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4 text-gray-400" />
          <ProductTypeSelect
            value={typeFilter}
            onValueChange={setTypeFilter}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={product.image || `https://nocode.meituan.com/photo/search?keyword=${product.name}&width=400&height=300`}
                alt={product.name}
                className="mx-auto object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    {product.type === "ice-cream" ? "冰淇淋" :
                     product.type === "yogurt" ? "酸奶" :
                     product.type === "popsicle" ? "冰棒" :
                     product.type === "dessert" ? "甜品" : "其他"} · {product.category}
                  </CardDescription>
                </div>
                <span className="text-lg font-bold text-blue-600">¥{product.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">库存: {product.stock}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.stock > 50 ? "bg-green-100 text-green-800" :
                  product.stock > 20 ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {product.stock > 50 ? "充足" : product.stock > 20 ? "中等" : "紧张"}
                </span>
              </div>
              {product.description && (
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                加入购物车
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">没有找到商品</h3>
          <p className="mt-1 text-gray-500">尝试使用不同的搜索词</p>
        </div>
      )}
    </div>
  );
};

export default Products;
