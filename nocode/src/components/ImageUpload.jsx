import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadIcon, XIcon } from "lucide-react";

const ImageUpload = ({ value, onChange, keyword = "ice cream" }) => {
  const [previewUrl, setPreviewUrl] = useState(value || `https://nocode.meituan.com/photo/search?keyword=${keyword}&width=400&height=300`);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setPreviewUrl(`https://nocode.meituan.com/photo/search?keyword=${newKeyword}&width=400&height=300`);
    onChange(`https://nocode.meituan.com/photo/search?keyword=${newKeyword}&width=400&height=300`);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(`https://nocode.meituan.com/photo/search?keyword=${keyword}&width=400&height=300`);
    onChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
          <img
            src={previewUrl}
            alt="产品图片"
            className="mx-auto object-cover w-full h-full"
          />
          {previewUrl && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="image-upload">上传图片</Label>
            <div className="flex gap-2">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon">
                <UploadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image-keyword">或输入关键词获取图片</Label>
            <Input
              id="image-keyword"
              type="text"
              placeholder="输入关键词，如：巧克力冰淇淋"
              defaultValue={keyword}
              onChange={handleKeywordChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
