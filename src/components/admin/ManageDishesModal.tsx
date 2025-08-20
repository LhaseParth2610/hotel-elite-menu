import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  spiceLevel: "mild" | "medium" | "spicy";
  isVegetarian: boolean;
  prepTime: number;
  serves: number;
  calories: number;
  ingredients: string[];
}

interface ManageDishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Record<string, FoodItem[]>;
  onEdit: (dish: FoodItem) => void;
  onDelete: (dishId: string, category: string) => void;
}

export const ManageDishesModal = ({ isOpen, onClose, dishes, onEdit, onDelete }: ManageDishesModalProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpice, setSelectedSpice] = useState("all");

  const allDishes = Object.entries(dishes).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  );

  const filteredDishes = allDishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSpice = selectedSpice === "all" || dish.spiceLevel === selectedSpice;
    
    return matchesSearch && matchesCategory && matchesSpice;
  });

  const handleDelete = (dish: FoodItem & { category: string }) => {
    if (window.confirm(`Are you sure you want to delete "${dish.name}"?`)) {
      onDelete(dish.id, dish.category);
      toast({
        title: "Dish Deleted",
        description: `${dish.name} has been removed from the menu`,
      });
    }
  };

  const categoryNames: Record<string, string> = {
    "starters": "Starters",
    "main-course": "Main Course", 
    "desserts": "Desserts",
    "beverages": "Beverages",
    "chef-specials": "Chef's Specials"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-3xl font-bold text-primary">
            Manage Dishes
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="starters">Starters</SelectItem>
              <SelectItem value="main-course">Main Course</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="chef-specials">Chef's Specials</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSpice} onValueChange={setSelectedSpice}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Spice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Spice</SelectItem>
              <SelectItem value="mild">🌿 Mild</SelectItem>
              <SelectItem value="medium">🌶️ Medium</SelectItem>
              <SelectItem value="spicy">🔥 Spicy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredDishes.length} of {allDishes.length} dishes
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
          {filteredDishes.map((dish) => (
            <Card key={dish.id} className="hover-lift transition-luxury">
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-wine text-white">
                  ₹{dish.price}
                </Badge>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h4 className="font-playfair font-bold text-lg text-primary">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {categoryNames[dish.category]}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {dish.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={`text-xs ${
                      dish.spiceLevel === 'mild' ? 'border-green-500 text-green-700' :
                      dish.spiceLevel === 'medium' ? 'border-yellow-500 text-yellow-700' :
                      'border-red-500 text-red-700'
                    }`}>
                      {dish.spiceLevel === 'mild' ? '🌿' : 
                       dish.spiceLevel === 'medium' ? '🌶️' : '🔥'}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${
                      dish.isVegetarian ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'
                    }`}>
                      {dish.isVegetarian ? '🌱' : '🍖'}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(dish)}
                      className="hover:bg-wine hover:text-white"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(dish)}
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-2">
              No dishes found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};