import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, ShoppingBagIcon, HeartIcon } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // 模拟商品数据
  const product = {
    id: id,
    name: "巧克力冰淇淋",
    price: 15.0,
    originalPrice: 18.0,
    description: "经典巧克力口味冰淇淋，采用优质可可粉制作，口感浓郁香甜。",
    images: [
      "https://nocode.meituan.com/photo/search?keyword=chocolate%20ice%20cream&width=600&height=400",
      "https://nocode.meituan.com/photo/search?keyword=chocolate%20ice%20cream%202&width=600&height=400",
      "https://nocode.meituan.com/photo/search?keyword=chocolate%20ice%20cream%203&width=600&height=400",
    ],
    specifications: [
      { name: "口味", value: "巧克力" },
      { name: "净含量", value: "100g" },
      { name: "保质期", value: "12个月" },
      { name: "储存条件", value: "冷冻保存" },
    ],
    stock: 120,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "张三",
        rating: 5,
        date: "2023-06-01",
        content: "非常好吃，巧克力味很浓郁，下次还会购买。",
      },
      {
        id: 2,
        user: "李四",
        rating: 4,
        date: "2023-05-28",
        content: "味道不错，但配送速度有点慢。",
      },
      {
        id: 3,
        user: "王五",
        rating: 5,
        date: "2023-05-25",
        content: "孩子很喜欢，已经回购多次了。",
      },
    ],
  };

  const handleAddToCart = () => {
    // 添加到购物车逻辑
    alert(`已添加 ${quantity} 件商品到购物车`);
  };

  const handleBuyNow = () => {
    // 立即购买逻辑
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 商品图片 */}
        <div>
          <div className="h-80 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="mx-auto object-cover w-full h-full"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="mx-auto object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 商品信息 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">已售 1200+</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-red-600 mr-2">¥{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">¥{product.originalPrice}</span>
                </div>
                <div className="text-sm text-gray-500">库存: {product.stock} 件</div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">规格参数</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex">
                      <span className="text-gray-500 w-20">{spec.name}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">数量</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex space-x-2">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                加入购物车
              </Button>
              <Button className="flex-1" variant="outline" onClick={handleBuyNow}>
                立即购买
              </Button>
              <Button variant="ghost" size="icon">
                <HeartIcon className="h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* 商品详情和评价 */}
      <div className="mt-6">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">商品详情</TabsTrigger>
            <TabsTrigger value="reviews">商品评价</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>商品详情</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{product.description}</p>
                <div className="space-y-4">
                  <img
                    src="https://nocode.meituan.com/photo/search?keyword=ice%20cream%20details&width=800&height=400"
                    alt="商品详情图1"
                    className="mx-auto object-cover w-full rounded-lg"
                  />
                  <img
                    src="https://nocode.meituan.com/photo/search?keyword=ice%20cream%20details%202&width=800&height=400"
                    alt="商品详情图2"
                    className="mx-auto object-cover w-full rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>商品评价</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">共 {product.reviews.length} 条评价</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            {review.user.charAt(0)}
                          </div>
                          <span>{review.user}</span>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p>{review.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
