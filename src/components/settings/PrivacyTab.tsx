
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, EyeOff } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from "@/hooks/use-toast";

const PrivacyTab: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleDarkModeToggle = () => {
    toggleTheme();
    toast({
      title: theme === 'dark' ? 'Light mode activated' : 'Dark mode activated',
      description: theme === 'dark' ? 'Switching to light mode' : 'Switching to dark mode',
      duration: 2000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
            </div>
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
              <Switch 
                id="dark-mode" 
                checked={theme === 'dark'}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-privacy">Data Privacy</Label>
              <p className="text-sm text-muted-foreground">Control how your data is used and shared</p>
            </div>
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-muted-foreground" />
              <Switch id="data-privacy" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
