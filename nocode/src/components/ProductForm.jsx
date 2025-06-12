import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ProductTypeSelect from "./ProductTypeSelect";
import ImageUpload from "./ImageUpload";

const productSchema = z.object({
  name: z.string().min(1, "产品名称不能为空"),
  type: z.string().min(1, "请选择产品类型"),
  category: z.string().min(1, "请选择产品类别"),
  price: z.string().min(1, "请输入价格").refine(val => !isNaN(parseFloat(val)), "请输入有效的价格"),
  stock: z.string().min(1, "请输入库存数量").refine(val => !isNaN(parseInt(val)), "请输入有效的库存数量"),
  description: z.string().optional(),
  image: z.string().optional(),
});

const ProductForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      type: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    },
  });

  const imageKeyword = watch("name") || "ice cream";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "编辑产品" : "添加新产品"}</CardTitle>
          <CardDescription>
            {initialData ? "修改产品信息" : "填写以下信息添加新产品"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">产品名称</Label>
              <Input
                id="name"
                placeholder="输入产品名称"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">产品类型</Label>
              <ProductTypeSelect
                value={watch("type")}
                onValueChange={(value) => setValue("type", value)}
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">产品类别</Label>
              <Input
                id="category"
                placeholder="输入产品类别"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">价格 (元)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="输入产品价格"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">库存数量</Label>
              <Input
                id="stock"
                type="number"
                placeholder="输入库存数量"
                {...register("stock")}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">产品描述</Label>
            <Textarea
              id="description"
              placeholder="输入产品描述 (可选)"
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <Label>产品图片</Label>
            <ImageUpload
              value={watch("image")}
              onChange={(value) => setValue("image", value)}
              keyword={imageKeyword}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "提交中..." : initialData ? "更新产品" : "添加产品"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductForm;
