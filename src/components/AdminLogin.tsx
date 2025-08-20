import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin = ({ onBack, onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "hotel123") {
        toast({
          title: "Login Successful",
          description: "Welcome to Hotel Elite Admin Panel",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-wine/10 text-wine"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </div>

        {/* Login Card */}
        <Card className="shadow-luxury border-wine/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-wine to-gold rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-playfair text-2xl font-bold text-primary">
              Admin Access
            </CardTitle>
            <CardDescription className="font-poppins">
              Staff login for Hotel Elite Nashik menu management
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-poppins font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="font-poppins"
                  placeholder="Enter admin username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-poppins font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-poppins"
                  placeholder="Enter admin password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="wine"
                size="lg"
                className="w-full transition-luxury"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-cream/20 rounded-lg">
              <p className="text-sm font-poppins text-muted-foreground text-center mb-2">
                Demo Credentials:
              </p>
              <p className="text-sm font-poppins text-center">
                <span className="font-medium">Username:</span> admin<br />
                <span className="font-medium">Password:</span> hotel123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};