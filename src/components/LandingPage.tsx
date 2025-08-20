import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dining.jpg";

interface LandingPageProps {
  onViewMenu: () => void;
}

export const LandingPage = ({ onViewMenu }: LandingPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-75"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hotel Logo/Name */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              Hotel Elite
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-4"></div>
            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-gold-light">
              Nashik
            </h2>
          </div>

          {/* Tagline */}
          <div className="mb-12 animate-fade-in delay-300">
            <p className="text-lg sm:text-xl lg:text-2xl text-cream-light font-poppins font-light tracking-wide">
              Experience culinary excellence with our curated menu
            </p>
            <p className="text-base sm:text-lg text-cream font-poppins mt-2 opacity-90">
              Where luxury meets authentic flavors
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in delay-500">
            <Button
              onClick={onViewMenu}
              variant="hero"
              size="xl"
              className="shadow-gold transition-luxury"
            >
              View Our Menu
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="w-12 h-0.5 bg-gold"></div>
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <div className="w-12 h-0.5 bg-gold"></div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black/50 to-transparent"></div>
    </div>
  );
};