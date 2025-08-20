import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Leaf, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface FoodDetailModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const spiceLevelColors = {
  mild: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  spicy: "bg-red-100 text-red-800 border-red-200",
};

const getSpiceIcon = (level: string) => {
  switch (level) {
    case "mild": return "🌿";
    case "medium": return "🌶️";
    case "spicy": return "🔥";
    default: return "🌿";
  }
};

export const FoodDetailModal = ({ item, isOpen, onClose }: FoodDetailModalProps) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border shadow-luxury">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 hover:bg-wine/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-80 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent"></div>
          
          {/* Price and Dietary Info */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Badge className="bg-wine text-white font-poppins font-bold px-4 py-2 text-lg shadow-luxury">
              ₹{item.price}
            </Badge>
            <Badge className={`${item.isVegetarian ? 'bg-green-600' : 'bg-red-600'} text-white font-poppins px-3 py-1 flex items-center`}>
              {item.isVegetarian ? <Leaf className="w-4 h-4 mr-1" /> : '🍖'}
              {item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
            </Badge>
          </div>
        </div>

        <DialogHeader className="text-left">
          <DialogTitle className="font-playfair text-3xl sm:text-4xl font-bold text-primary mb-4">
            {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Spice Level */}
          <div className="flex justify-center">
            <Badge className={`${spiceLevelColors[item.spiceLevel]} font-poppins px-4 py-2 border text-base`}>
              {getSpiceIcon(item.spiceLevel)} {item.spiceLevel.toUpperCase()} SPICE
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-playfair text-xl font-semibold text-primary mb-3">Description</h4>
            <p className="text-muted-foreground font-poppins leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Food Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-cream/20 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground">Prep Time</p>
              <p className="font-playfair text-lg font-semibold text-primary">{item.prepTime} min</p>
            </div>
            <div className="text-center p-4 bg-cream/20 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground">Serves</p>
              <p className="font-playfair text-lg font-semibold text-primary">{item.serves} people</p>
            </div>
            <div className="text-center p-4 bg-cream/20 rounded-lg">
              <Flame className="w-6 h-6 mx-auto mb-2 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground">Calories</p>
              <p className="font-playfair text-lg font-semibold text-primary">{item.calories} cal</p>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="font-playfair text-xl font-semibold text-primary mb-3">Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="font-poppins px-3 py-1 border-wine/30 text-wine hover:bg-wine/10"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Decorative Separator */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-gold"></div>
              <div className="w-2 h-2 bg-wine rounded-full"></div>
              <div className="w-12 h-0.5 bg-gold"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};