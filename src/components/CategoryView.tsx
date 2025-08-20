import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FoodCard } from "./FoodCard";
import { FoodDetailModal } from "./FoodDetailModal";
import { ArrowLeft } from "lucide-react";

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

interface CategoryViewProps {
  category: string;
  onBack: () => void;
}

// Sample data - in a real app this would come from an API
const sampleItems: Record<string, FoodItem[]> = {
  "starters": [
    {
      id: "1",
      name: "Paneer Tikka Masala",
      price: 280,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Tender paneer cubes marinated in aromatic spices and grilled to perfection, served with mint chutney",
      spiceLevel: "medium",
      isVegetarian: true,
      prepTime: 25,
      serves: 2,
      calories: 320,
      ingredients: ["Paneer", "Yogurt", "Garam Masala", "Ginger-Garlic", "Bell Peppers", "Onions"]
    },
    {
      id: "2",
      name: "Chicken Seekh Kebab",
      price: 350,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Juicy minced chicken kebabs seasoned with traditional spices and herbs, grilled on skewers",
      spiceLevel: "spicy",
      isVegetarian: false,
      prepTime: 30,
      serves: 2,
      calories: 420,
      ingredients: ["Chicken Mince", "Red Chili", "Coriander", "Cumin", "Onions", "Garlic"]
    }
  ],
  "main-course": [
    {
      id: "3",
      name: "Butter Chicken",
      price: 480,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Rich and creamy tomato-based curry with tender chicken pieces, served with basmati rice",
      spiceLevel: "mild",
      isVegetarian: false,
      prepTime: 45,
      serves: 3,
      calories: 580,
      ingredients: ["Chicken", "Tomatoes", "Cream", "Butter", "Cashews", "Garam Masala", "Fenugreek"]
    },
    {
      id: "4",
      name: "Dal Makhani",
      price: 320,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Creamy black lentils slow-cooked with butter and cream, garnished with fresh coriander",
      spiceLevel: "mild",
      isVegetarian: true,
      prepTime: 60,
      serves: 4,
      calories: 380,
      ingredients: ["Black Lentils", "Kidney Beans", "Butter", "Cream", "Tomatoes", "Ginger", "Garlic"]
    }
  ],
  "desserts": [
    {
      id: "5",
      name: "Gulab Jamun",
      price: 180,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Traditional milk dumplings soaked in rose-flavored sugar syrup, served warm",
      spiceLevel: "mild",
      isVegetarian: true,
      prepTime: 20,
      serves: 2,
      calories: 280,
      ingredients: ["Milk Powder", "Flour", "Sugar", "Rose Water", "Cardamom", "Ghee"]
    }
  ],
  "beverages": [
    {
      id: "6",
      name: "Masala Chai",
      price: 80,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Aromatic spiced tea brewed with cardamom, ginger, and cinnamon, served hot",
      spiceLevel: "mild",
      isVegetarian: true,
      prepTime: 10,
      serves: 1,
      calories: 120,
      ingredients: ["Tea Leaves", "Milk", "Sugar", "Cardamom", "Ginger", "Cinnamon"]
    }
  ],
  "chef-specials": [
    {
      id: "7",
      name: "Nashik Special Biryani",
      price: 650,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Chef's signature biryani with premium basmati rice, tender meat, and secret blend of spices",
      spiceLevel: "medium",
      isVegetarian: false,
      prepTime: 75,
      serves: 2,
      calories: 720,
      ingredients: ["Basmati Rice", "Mutton", "Saffron", "Yogurt", "Fried Onions", "Mint", "Special Spices"]
    }
  ]
};

const categoryTitles: Record<string, string> = {
  "starters": "Starters",
  "main-course": "Main Course",
  "desserts": "Desserts",
  "beverages": "Beverages",
  "chef-specials": "Chef's Specials"
};

export const CategoryView = ({ category, onBack }: CategoryViewProps) => {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = sampleItems[category] || [];
  const categoryTitle = categoryTitles[category] || "Menu Items";

  const handleItemClick = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-wine/10 text-wine"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </div>

        <div className="text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-6">
            {categoryTitle}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground font-poppins font-light max-w-2xl mx-auto">
            Carefully crafted dishes using the finest ingredients and traditional techniques
          </p>
        </div>
      </div>

      {/* Food Items Grid */}
      {items.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FoodCard item={item} onClick={handleItemClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 mx-auto mb-6 bg-wine/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍽️</span>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
            Coming Soon
          </h3>
          <p className="text-muted-foreground font-poppins">
            Our chefs are working on exciting new dishes for this category. Please check back soon!
          </p>
        </div>
      )}

      {/* Food Detail Modal */}
      <FoodDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};