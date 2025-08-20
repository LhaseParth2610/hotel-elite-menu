import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dish: any) => void;
}

export const AddDishModal = ({ isOpen, onClose, onSave }: AddDishModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    spiceLevel: "mild" as "mild" | "medium" | "spicy",
    isVegetarian: true,
    prepTime: "",
    serves: "",
    calories: "",
    category: "starters",
    ingredients: [] as string[]
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        handleInputChange("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      handleInputChange("ingredients", [...formData.ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    handleInputChange("ingredients", formData.ingredients.filter(i => i !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      description: formData.description,
      spiceLevel: formData.spiceLevel,
      isVegetarian: formData.isVegetarian,
      prepTime: parseInt(formData.prepTime) || 30,
      serves: parseInt(formData.serves) || 2,
      calories: parseInt(formData.calories) || 300,
      ingredients: formData.ingredients
    };

    onSave(newDish);
    toast({
      title: "Dish Added Successfully",
      description: `${formData.name} has been added to the menu`,
    });
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      spiceLevel: "mild",
      isVegetarian: true,
      prepTime: "",
      serves: "",
      calories: "",
      category: "starters",
      ingredients: []
    });
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-3xl font-bold text-primary">
            Add New Dish
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-poppins font-semibold">Dish Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="Enter dish name"
              />
            </div>
            <div>
              <Label htmlFor="price" className="font-poppins font-semibold">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="mt-1"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="font-poppins font-semibold">Dish Image</Label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="relative overflow-hidden"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Button>
                <span className="text-sm text-muted-foreground">Or paste image URL below</span>
              </div>
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
              />
              {(imagePreview || formData.image) && (
                <div className="w-32 h-32 rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="font-poppins font-semibold">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1"
              rows={3}
              placeholder="Describe the dish..."
            />
          </div>

          {/* Category and Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="font-poppins font-semibold">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starters">Starters</SelectItem>
                  <SelectItem value="main-course">Main Course</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="chef-specials">Chef's Specials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="font-poppins font-semibold">Spice Level</Label>
              <Select value={formData.spiceLevel} onValueChange={(value: any) => handleInputChange("spiceLevel", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">🌿 Mild</SelectItem>
                  <SelectItem value="medium">🌶️ Medium</SelectItem>
                  <SelectItem value="spicy">🔥 Spicy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-poppins font-semibold">Diet Type</Label>
              <Select 
                value={formData.isVegetarian ? "vegetarian" : "non-vegetarian"} 
                onValueChange={(value) => handleInputChange("isVegetarian", value === "vegetarian")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">🌱 Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">🍖 Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Nutritional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="prepTime" className="font-poppins font-semibold">Prep Time (min)</Label>
              <Input
                id="prepTime"
                type="number"
                value={formData.prepTime}
                onChange={(e) => handleInputChange("prepTime", e.target.value)}
                className="mt-1"
                placeholder="30"
              />
            </div>
            <div>
              <Label htmlFor="serves" className="font-poppins font-semibold">Serves (people)</Label>
              <Input
                id="serves"
                type="number"
                value={formData.serves}
                onChange={(e) => handleInputChange("serves", e.target.value)}
                className="mt-1"
                placeholder="2"
              />
            </div>
            <div>
              <Label htmlFor="calories" className="font-poppins font-semibold">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories}
                onChange={(e) => handleInputChange("calories", e.target.value)}
                className="mt-1"
                placeholder="300"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <Label className="font-poppins font-semibold">Ingredients</Label>
            <div className="mt-2 space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add ingredient..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                />
                <Button type="button" onClick={addIngredient} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="font-poppins px-3 py-1">
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-wine hover:bg-wine-dark text-white">
              Add Dish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};