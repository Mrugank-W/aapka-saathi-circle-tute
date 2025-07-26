import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-circular-economy.jpg';

interface MFCLoginProps {
  onLogin: (role: 'manager' | 'driver') => void;
}

export const MFCLogin: React.FC<MFCLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      setLoading(true);
      
      // Demo login - in production, this would use Firebase auth
      if (email.includes('manager')) {
        toast({
          title: "Manager Login Successful",
          description: "Welcome to MFC Dashboard",
        });
        onLogin('manager');
      } else if (email.includes('driver')) {
        toast({
          title: "Driver Login Successful", 
          description: "Welcome to Driver App",
        });
        onLogin('driver');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'manager' | 'driver') => {
    setEmail(role === 'manager' ? 'manager@mfc.com' : 'driver@mfc.com');
    setPassword('demo123');
    setTimeout(() => {
      onLogin(role);
      toast({
        title: `${role === 'manager' ? 'Manager' : 'Driver'} Demo Login`,
        description: "Welcome to the demo!",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              MFC Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Aapka Saathi Management Portal
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-gradient-to-b from-card to-muted/10">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              Staff Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                onClick={handleLogin}
                disabled={!email || !password || loading}
                variant="default"
                size="lg"
                className="w-full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>

            {/* Demo Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Demo Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleDemoLogin('manager')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Manager Demo
                </Button>
                <Button
                  onClick={() => handleDemoLogin('driver')}
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                >
                  Driver Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          Aapka Saathi - Empowering Street Vendors
        </div>
      </div>
    </div>
  );
};