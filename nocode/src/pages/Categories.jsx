import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "巧克力系列",
      description: "经典巧克力口味冰淇淋",
      image: "chocolate",
      subcategories: [
        { id: 11, name: "黑巧克力", count: 12 },
        { id: 12, name: "牛奶巧克力", count: 8 },
        { id: 13, name: "白巧克力", count: 6 },
      ],
    },
    {
      id: 2,
      name: "水果系列",
      description: "新鲜水果口味冰淇淋",
      image: "fruit",
      subcategories: [
        { id: 21, name: "草莓", count: 10 },
        { id: 22, name: "芒果", count: 8 },
        { id: 23, name: "蓝莓", count: 6 },
      ],
    },
    {
      id: 3,
      name: "香草系列",
      description: "纯正香草口味冰淇淋",
      image: "vanilla",
      subcategories: [
        { id: 31, name: "经典香草", count: 8 },
        { id: 32, name: "香草巧克力", count: 6 },
      ],
    },
    {
      id: 4,
      name: "抹茶系列",
      description: "日本进口抹茶口味冰淇淋",
      image: "matcha",
      subcategories: [
        { id: 41, name: "经典抹茶", count: 6 },
        { id: 42, name: "抹茶红豆", count: 4 },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">商品分类</h1>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="flex">
              <div className="w-1/3 h-32">
                <img
                  src={`https://nocode.meituan.com/photo/search?keyword=ice%20cream%20${category.image}&width=300&height=200`}
                  alt={category.name}
                  className="mx-auto object-cover w-full h-full"
                />
              </div>
              <div className="w-2/3 p-4">
                <CardHeader className="p-0 mb-2">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                      >
                        <span>{subcategory.name}</span>
                        <span className="text-sm text-gray-500">{subcategory.count} 种商品</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => navigate(`/products?category=${category.id}`)}
                  >
                    查看全部
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
