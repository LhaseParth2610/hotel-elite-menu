import { Card } from "@/components/ui/card";
import { ChefHat, Utensils, Coffee, Wine, Star } from "lucide-react";

interface MenuCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: "starters",
    name: "Starters",
    icon: ChefHat,
    description: "Exquisite appetizers to begin your culinary journey",
    gradient: "from-wine to-wine-light",
  },
  {
    id: "main-course",
    name: "Main Course",
    icon: Utensils,
    description: "Signature dishes crafted with premium ingredients",
    gradient: "from-gold to-gold-light",
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: Star,
    description: "Decadent sweet creations to end on a perfect note",
    gradient: "from-cream to-cream-light",
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: Coffee,
    description: "Refreshing drinks and premium coffee selections",
    gradient: "from-wine-light to-gold",
  },
  {
    id: "chef-specials",
    name: "Chef's Specials",
    icon: Wine,
    description: "Seasonal specialties and signature creations",
    gradient: "from-luxury-black to-wine-dark",
  },
];

export const MenuCategories = ({ onCategorySelect }: MenuCategoriesProps) => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
          Our Menu
        </h1>
        <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
        <p className="text-lg sm:text-xl text-muted-foreground font-poppins font-light max-w-2xl mx-auto">
          Discover our carefully curated selection of dishes, each prepared with passion and premium ingredients
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          
          return (
            <Card
              key={category.id}
              className={`relative overflow-hidden cursor-pointer hover-lift transition-luxury group animate-fade-in shadow-card`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onCategorySelect(category.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-luxury`}></div>
              
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-wine to-gold rounded-full flex items-center justify-center shadow-luxury group-hover:scale-110 transition-luxury">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-primary mb-4 group-hover:text-wine transition-smooth">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-poppins text-sm sm:text-base leading-relaxed">
                  {category.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 w-12 h-0.5 bg-gold mx-auto group-hover:w-16 transition-luxury"></div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold rounded-lg transition-luxury"></div>
            </Card>
          );
        })}
      </div>

      {/* Decorative Bottom Section */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <div className="flex justify-center space-x-4 opacity-50">
          <div className="w-16 h-0.5 bg-wine"></div>
          <div className="w-2 h-2 bg-gold rounded-full"></div>
          <div className="w-16 h-0.5 bg-wine"></div>
        </div>
        <p className="mt-6 text-muted-foreground font-poppins text-sm">
          All dishes are prepared fresh to order
        </p>
      </div>
    </div>
  );
};