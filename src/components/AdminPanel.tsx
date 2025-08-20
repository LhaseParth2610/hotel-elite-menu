import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddDishModal } from "./admin/AddDishModal";
import { EditDishModal } from "./admin/EditDishModal"; 
import { ManageDishesModal } from "./admin/ManageDishesModal";

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

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const { toast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [editingDish, setEditingDish] = useState<FoodItem | null>(null);

  // Sample dishes data - in a real app this would be from a database
  const [dishes, setDishes] = useState<Record<string, FoodItem[]>>({
    "starters": [
      {
        id: "1",
        name: "Paneer Tikka Masala",
        price: 280,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Tender paneer cubes marinated in aromatic spices and grilled to perfection",
        spiceLevel: "medium",
        isVegetarian: true,
        prepTime: 25,
        serves: 2,
        calories: 320,
        ingredients: ["Paneer", "Yogurt", "Garam Masala", "Ginger-Garlic", "Bell Peppers"]
      }
    ],
    "main-course": [
      {
        id: "3",
        name: "Butter Chicken",
        price: 480,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Rich and creamy tomato-based curry with tender chicken pieces",
        spiceLevel: "mild",
        isVegetarian: false,
        prepTime: 45,
        serves: 3,
        calories: 580,
        ingredients: ["Chicken", "Tomatoes", "Cream", "Butter", "Cashews", "Garam Masala"]
      }
    ],
    "desserts": [],
    "beverages": [],
    "chef-specials": []
  });

  const handleAddDish = () => {
    setShowAddModal(true);
  };

  const handleEditDish = () => {
    setShowManageModal(true);
  };

  const handleDeleteDish = () => {
    setShowManageModal(true);
  };

  const handleManageEvents = () => {
    toast({
      title: "Manage Special Events",
      description: "This feature will be implemented in the next version",
    });
  };

  const handleSaveNewDish = (newDish: FoodItem) => {
    // For now, add to starters category. In real app, use the category from the form
    setDishes(prev => ({
      ...prev,
      starters: [...prev.starters, newDish]
    }));
  };

  const handleEditDishClick = (dish: FoodItem) => {
    setEditingDish(dish);
    setShowEditModal(true);
    setShowManageModal(false);
  };

  const handleUpdateDish = (updatedDish: FoodItem) => {
    setDishes(prev => {
      const newDishes = { ...prev };
      Object.keys(newDishes).forEach(category => {
        const dishIndex = newDishes[category].findIndex(d => d.id === updatedDish.id);
        if (dishIndex !== -1) {
          newDishes[category][dishIndex] = updatedDish;
        }
      });
      return newDishes;
    });
    setEditingDish(null);
  };

  const handleDeleteDishConfirm = (dishId: string, category: string) => {
    setDishes(prev => ({
      ...prev,
      [category]: prev[category].filter(dish => dish.id !== dishId)
    }));
  };

  const totalDishes = Object.values(dishes).reduce((total, categoryDishes) => total + categoryDishes.length, 0);
  const totalCategories = Object.keys(dishes).length;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-primary">
              Admin Panel
            </h1>
            <p className="text-lg text-muted-foreground font-poppins mt-2">
              Hotel Elite Nashik Menu Management
            </p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-wine text-wine hover:bg-wine hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        <div className="w-24 h-1 bg-gold"></div>
      </div>

      {/* Admin Actions Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Add New Dish */}
        <Card className="hover-lift transition-luxury shadow-card cursor-pointer" onClick={handleAddDish}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="font-playfair text-xl">Add New Dish</CardTitle>
            <CardDescription className="font-poppins">
              Add new items to the menu with photos and details
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Edit Existing Dish */}
        <Card className="hover-lift transition-luxury shadow-card cursor-pointer" onClick={handleEditDish}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="font-playfair text-xl">Edit Dishes</CardTitle>
            <CardDescription className="font-poppins">
              Modify existing menu items, prices, and descriptions
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Delete Dish */}
        <Card className="hover-lift transition-luxury shadow-card cursor-pointer" onClick={handleDeleteDish}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="font-playfair text-xl">Manage Dishes</CardTitle>
            <CardDescription className="font-poppins">
              Edit or remove items from the menu
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Manage Special Events */}
        <Card className="hover-lift transition-luxury shadow-card cursor-pointer" onClick={handleManageEvents}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-wine to-gold rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="font-playfair text-xl">Special Events</CardTitle>
            <CardDescription className="font-poppins">
              Create seasonal menus and special event offerings
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="font-playfair text-2xl font-bold text-primary mb-6">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-3xl font-bold text-wine mb-2">{totalDishes}</h3>
              <p className="font-poppins text-muted-foreground">Total Menu Items</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-3xl font-bold text-gold mb-2">{totalCategories}</h3>
              <p className="font-poppins text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-3xl font-bold text-wine mb-2">0</h3>
              <p className="font-poppins text-muted-foreground">Active Events</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <AddDishModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewDish}
      />

      <EditDishModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingDish(null);
        }}
        onSave={handleUpdateDish}
        dish={editingDish}
      />

      <ManageDishesModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        dishes={dishes}
        onEdit={handleEditDishClick}
        onDelete={handleDeleteDishConfirm}
      />
    </div>
  );
};