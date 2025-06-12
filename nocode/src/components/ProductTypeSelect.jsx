import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductTypeSelect = ({ value, onValueChange }) => {
  const productTypes = [
    { value: "ice-cream", label: "冰淇淋" },
    { value: "yogurt", label: "酸奶" },
    { value: "popsicle", label: "冰棒" },
    { value: "dessert", label: "甜品" },
    { value: "other", label: "其他" },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="选择产品类型" />
      </SelectTrigger>
      <SelectContent>
        {productTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductTypeSelect;
