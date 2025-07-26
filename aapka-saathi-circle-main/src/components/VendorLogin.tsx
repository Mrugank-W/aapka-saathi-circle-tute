import React, { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-circular-economy.jpg';

interface VendorLoginProps {
  onLogin: () => void;
}

export const VendorLogin: React.FC<VendorLoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const { toast } = useToast();

  const sendOTP = async () => {
    try {
      setLoading(true);
      // For demo purposes, we'll simulate OTP sending
      // In production, you'd set up Firebase phone auth properly
      
      // Simulate sending OTP
      toast({
        title: "OTP भेजा गया",
        description: "आपके फोन पर OTP भेजा गया है। डेमो के लिए कोई भी 6 अंकों का OTP डालें।",
      });
      
      setStep('otp');
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "OTP भेजने में समस्या हुई। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6) {
        toast({
          title: "सफल लॉगिन",
          description: "आपका लॉगिन सफल हुआ है। आपका स्वागत है!",
        });
        onLogin();
      } else {
        throw new Error('Invalid OTP length');
      }
    } catch (error) {
      toast({
        title: "गलत OTP",
        description: "कृपया सही OTP डालें।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg">
            <img src={heroImage} alt="Aapka Saathi" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              आपका साथी
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              आपका व्यापार, हमारा समर्थन
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-gradient-to-b from-card to-muted/10">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              {step === 'phone' ? (
                <>
                  <Phone className="h-5 w-5" />
                  फोन से लॉगिन करें
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  OTP सत्यापित करें
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    मोबाइल नंबर
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <Button
                  onClick={sendOTP}
                  disabled={!phone || loading}
                  variant="saathi"
                  size="lg"
                  className="w-full"
                >
                  {loading ? 'भेजा जा रहा है...' : 'OTP भेजें'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    OTP कोड
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-lg h-12 text-center tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    डेमो के लिए कोई भी 6 अंकों का OTP डालें
                  </p>
                </div>
                <Button
                  onClick={verifyOTP}
                  disabled={!otp || loading}
                  variant="saathi"
                  size="lg"
                  className="w-full"
                >
                  {loading ? 'सत्यापित कर रहे हैं...' : 'लॉगिन करें'}
                </Button>
                <Button
                  onClick={() => setStep('phone')}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  वापस जाएं
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          आपका साथी - किसानों से लेकर ग्राहकों तक
        </div>
      </div>
    </div>
  );
};