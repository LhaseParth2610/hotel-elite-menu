import { Card } from "@/components/ui/card";
import { Star, Sparkles, ArrowRight } from "lucide-react";

interface MenuCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const favoriteMenuItems = [
  {
    id: "starters",
    name: "Exquisite Starters",
    description: "Appetizers to awaken your palate",
  },
  {
    id: "main-course", 
    name: "Signature Main Courses",
    description: "Premium dishes crafted with passion",
  },
  {
    id: "desserts",
    name: "Divine Desserts", 
    description: "Sweet endings to perfection",
  },
  {
    id: "beverages",
    name: "Premium Beverages",
    description: "Carefully curated drink selections",
  },
  {
    id: "chef-specials",
    name: "Chef's Masterpieces",
    description: "Seasonal specialties and signature creations",
  },
];

const stackedImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
];

export const MenuCategories = ({ onCategorySelect }: MenuCategoriesProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wine via-wine-dark to-luxury-black">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left Side - Menu Content */}
          <div className="space-y-8 lg:space-y-12 text-white order-2 lg:order-1">
            
            {/* Decorative Stars */}
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-gold animate-pulse-glow" />
              <div className="w-16 h-0.5 bg-gold"></div>
              <Sparkles className="w-6 h-6 text-gold animate-pulse-glow" />
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                OUR
                <br />
                <span className="text-gradient-gold">FAVORITE</span>
                <br />
                MENU
              </h1>
            </div>

            {/* Menu Items List */}
            <div className="space-y-6 lg:space-y-8">
              {favoriteMenuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group cursor-pointer transition-luxury hover:translate-x-4"
                  onClick={() => onCategorySelect(item.id)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    {/* Star Icon */}
                    <div className="flex-shrink-0">
                      <Star className="w-5 h-5 lg:w-6 lg:h-6 text-gold fill-gold group-hover:animate-pulse-glow" />
                    </div>
                    
                    {/* Menu Item Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-playfair text-xl lg:text-2xl xl:text-3xl font-bold group-hover:text-gold transition-smooth">
                            {item.name}
                          </h3>
                          <p className="text-cream text-sm lg:text-base opacity-80 group-hover:opacity-100 transition-smooth">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Arrow */}
                        <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-gold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-luxury" />
                      </div>
                      
                      {/* Decorative Line */}
                      <div className="mt-3 w-0 h-0.5 bg-gold group-hover:w-20 transition-luxury duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Tagline */}
            <div className="pt-8 lg:pt-12">
              <p className="text-cream/70 font-poppins text-sm lg:text-base italic">
                "Experience culinary excellence at Hotel Elite Nashik"
              </p>
            </div>
          </div>

          {/* Right Side - Stacked Food Images */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {stackedImages.map((image, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${index * 8}deg) scale(${1 - index * 0.05})`,
                    zIndex: stackedImages.length - index,
                    transformOrigin: 'center bottom',
                  }}
                >
                  <Card className="w-full h-full overflow-hidden shadow-luxury animate-float" 
                        style={{ animationDelay: `${index * 0.5}s` }}>
                    <img
                      src={image}
                      alt={`Delicious dish ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-luxury"
                    />
                  </Card>
                </div>
              ))}
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-wine/20 rounded-full blur-3xl animate-luxury-glow -z-10"></div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-4 h-4 bg-gold rounded-full animate-float"></div>
            <div className="absolute -bottom-12 -left-8 w-6 h-6 bg-wine-light rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-16 w-3 h-3 bg-cream rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};