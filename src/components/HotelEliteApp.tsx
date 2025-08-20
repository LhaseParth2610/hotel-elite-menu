import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { MenuCategories } from "./MenuCategories";
import { CategoryView } from "./CategoryView";
import { AdminLogin } from "./AdminLogin";
import { AdminPanel } from "./AdminPanel";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

type AppView = "landing" | "menu" | "category" | "admin-login" | "admin-panel";

export const HotelEliteApp = () => {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleViewMenu = () => {
    setCurrentView("menu");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView("category");
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
    setSelectedCategory("");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleAdminLogin = () => {
    setCurrentView("admin-login");
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentView("admin-panel");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView("landing");
  };

  const renderContent = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onViewMenu={handleViewMenu} />;
      case "menu":
        return <MenuCategories onCategorySelect={handleCategorySelect} />;
      case "category":
        return <CategoryView category={selectedCategory} onBack={handleBackToMenu} />;
      case "admin-login":
        return (
          <AdminLogin
            onBack={handleBackToLanding}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        );
      case "admin-panel":
        return <AdminPanel onLogout={handleAdminLogout} />;
      default:
        return <LandingPage onViewMenu={handleViewMenu} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Admin Access Button - Only show on landing and menu pages */}
      {(currentView === "landing" || currentView === "menu") && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleAdminLogin}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-wine/30 text-wine hover:bg-wine hover:text-white transition-luxury shadow-luxury"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      )}

      {/* Main Content */}
      {renderContent()}

      {/* Footer - Only show on non-admin pages */}
      {currentView !== "admin-login" && currentView !== "admin-panel" && (
        <footer className="bg-luxury-black text-cream py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-4">
              <h3 className="font-playfair text-2xl font-bold text-gold mb-2">
                Hotel Elite Nashik
              </h3>
              <p className="font-poppins text-sm opacity-80">
                Premium Dining Experience
              </p>
            </div>
            <div className="flex justify-center space-x-8 mb-4 text-sm">
              <span>📞 +91 253-123-4567</span>
              <span>📧 dining@hotelelite.com</span>
              <span>📍 MG Road, Nashik</span>
            </div>
            <div className="pt-4 border-t border-wine/20">
              <p className="text-xs opacity-60">
                © 2024 Hotel Elite Nashik. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};