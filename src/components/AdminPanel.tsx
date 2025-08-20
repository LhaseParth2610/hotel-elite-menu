import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const { toast } = useToast();

  const handleAddDish = () => {
    toast({
      title: "Add New Dish",
      description: "This feature will be implemented in the next version",
    });
  };

  const handleEditDish = () => {
    toast({
      title: "Edit Dish",
      description: "This feature will be implemented in the next version",
    });
  };

  const handleDeleteDish = () => {
    toast({
      title: "Delete Dish",
      description: "This feature will be implemented in the next version",
    });
  };

  const handleManageEvents = () => {
    toast({
      title: "Manage Special Events",
      description: "This feature will be implemented in the next version",
    });
  };

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
            <CardTitle className="font-playfair text-xl">Remove Dishes</CardTitle>
            <CardDescription className="font-poppins">
              Remove items that are no longer available
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
              <h3 className="font-playfair text-3xl font-bold text-wine mb-2">24</h3>
              <p className="font-poppins text-muted-foreground">Total Menu Items</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-3xl font-bold text-gold mb-2">5</h3>
              <p className="font-poppins text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-playfair text-3xl font-bold text-wine mb-2">2</h3>
              <p className="font-poppins text-muted-foreground">Active Events</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="p-8 bg-cream/20 rounded-lg">
          <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
            Full Admin Features Coming Soon
          </h3>
          <p className="font-poppins text-muted-foreground leading-relaxed">
            This admin panel will include full CRUD operations for menu management, 
            photo uploads, special event scheduling, and analytics. Currently showing 
            the basic structure and navigation.
          </p>
        </div>
      </div>
    </div>
  );
};