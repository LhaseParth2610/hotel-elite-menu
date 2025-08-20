import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Leaf } from "lucide-react";

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

interface FoodCardProps {
  item: FoodItem;
  onClick: (item: FoodItem) => void;
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

export const FoodCard = ({ item, onClick }: FoodCardProps) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover-lift transition-luxury group shadow-card bg-gradient-card"
      onClick={() => onClick(item)}
    >
      {/* Food Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-luxury"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-wine text-white font-poppins font-semibold px-3 py-1 text-sm shadow-luxury">
            ₹{item.price}
          </Badge>
        </div>

        {/* Dietary Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${item.isVegetarian ? 'bg-green-600' : 'bg-red-600'} text-white font-poppins px-2 py-1 text-xs`}>
            {item.isVegetarian ? <Leaf className="w-3 h-3" /> : '🍖'}
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-luxury"></div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Food Name */}
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-primary mb-2 group-hover:text-wine transition-smooth">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-poppins text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Quick Info */}
        <div className="flex items-center justify-between mb-4">
          {/* Spice Level */}
          <Badge className={`${spiceLevelColors[item.spiceLevel]} font-poppins text-xs px-2 py-1 border`}>
            {getSpiceIcon(item.spiceLevel)} {item.spiceLevel.toUpperCase()}
          </Badge>

          {/* Quick Stats */}
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {item.prepTime}m
            </div>
            <div className="flex items-center text-xs">
              <Users className="w-3 h-3 mr-1" />
              {item.serves}
            </div>
            <div className="flex items-center text-xs">
              <Flame className="w-3 h-3 mr-1" />
              {item.calories}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="opacity-0 group-hover:opacity-100 transition-luxury">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <p className="text-center text-wine font-poppins text-sm mt-2 font-medium">
            Click to view details
          </p>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-gold opacity-20 group-hover:opacity-40 transition-luxury"></div>
    </Card>
  );
};