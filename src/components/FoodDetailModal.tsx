import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Leaf, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveImage } from "./InteractiveImage";

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
  mild: "bg-green-600 text-white border-green-500",
  medium: "bg-yellow-600 text-white border-yellow-500", 
  spicy: "bg-red-600 text-white border-red-500",
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
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-card border-wine/20 shadow-luxury p-0">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20 bg-luxury-black/60 text-white hover:bg-wine/80 rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header Image Section */}
        <div className="relative h-80 sm:h-96 overflow-hidden rounded-t-lg">
          <InteractiveImage
            src={item.image}
            alt={item.name}
            className="w-full h-full"
          />
          
          {/* Price and Dietary Info Overlay */}
          <div className="absolute top-6 right-6 flex flex-col space-y-3">
            <Badge className="bg-wine text-white font-poppins font-bold px-6 py-3 text-xl shadow-luxury border-0">
              ₹{item.price}
            </Badge>
            <Badge className={`${item.isVegetarian ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500'} text-white font-poppins px-4 py-2 flex items-center border-2`}>
              {item.isVegetarian ? <Leaf className="w-4 h-4 mr-2" /> : '🍖'}
              {item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
            </Badge>
          </div>

          {/* Bottom gradient overlay for better text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black/60 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8 bg-gradient-card">
          <DialogHeader className="text-left">
            <DialogTitle className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-6">
              {item.name}
            </DialogTitle>
          </DialogHeader>

          {/* Spice Level - Centered */}
          <div className="flex justify-center">
            <Badge className={`${spiceLevelColors[item.spiceLevel]} font-poppins px-6 py-3 border-2 text-lg font-bold`}>
              {getSpiceIcon(item.spiceLevel)} {item.spiceLevel.toUpperCase()} SPICE
            </Badge>
          </div>

          {/* Description */}
          <div className="bg-white/50 p-6 rounded-lg border border-wine/10">
            <h4 className="font-playfair text-2xl font-semibold text-primary mb-4">Description</h4>
            <p className="text-foreground font-poppins leading-relaxed text-lg">
              {item.description}
            </p>
          </div>

          {/* Food Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/70 rounded-lg border border-wine/10 hover:shadow-card transition-smooth">
              <Clock className="w-8 h-8 mx-auto mb-3 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">Prep Time</p>
              <p className="font-playfair text-2xl font-bold text-primary">{item.prepTime} min</p>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-lg border border-wine/10 hover:shadow-card transition-smooth">
              <Users className="w-8 h-8 mx-auto mb-3 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">Serves</p>
              <p className="font-playfair text-2xl font-bold text-primary">{item.serves} people</p>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-lg border border-wine/10 hover:shadow-card transition-smooth">
              <Flame className="w-8 h-8 mx-auto mb-3 text-wine" />
              <p className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">Calories</p>
              <p className="font-playfair text-2xl font-bold text-primary">{item.calories} cal</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white/50 p-6 rounded-lg border border-wine/10">
            <h4 className="font-playfair text-2xl font-semibold text-primary mb-4">Ingredients</h4>
            <div className="flex flex-wrap gap-3">
              {item.ingredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="font-poppins px-4 py-2 border-wine/30 text-wine hover:bg-wine hover:text-white transition-smooth text-base"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Decorative Separator */}
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-0.5 bg-gold"></div>
              <div className="w-3 h-3 bg-wine rounded-full animate-pulse-glow"></div>
              <div className="w-16 h-0.5 bg-gold"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};