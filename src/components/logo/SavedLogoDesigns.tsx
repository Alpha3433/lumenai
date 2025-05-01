
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { logoDesignService, LogoDesign } from '@/utils/logoDesignService';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SavedLogoDesigns: React.FC = () => {
  const { user } = useAuth();
  const [designs, setDesigns] = useState<LogoDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState<LogoDesign | null>(null);
  
  const fetchLogoDesigns = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await logoDesignService.getUserLogoDesigns(user.id);
      
      if (error) throw error;
      setDesigns(data || []);
    } catch (error) {
      console.error("Error fetching logo designs:", error);
      toast.error("Failed to fetch your saved logos");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchLogoDesigns();
    }
  }, [user]);
  
  const handleDownload = (design: LogoDesign) => {
    if (!design.image_url) return;
    
    const link = document.createElement('a');
    link.href = design.image_url;
    link.download = `${design.brand_name.replace(/\s+/g, '-').toLowerCase()}-logo-${Date.now()}.png`;
    link.click();
    
    toast.success("Logo downloaded successfully!");
  };
  
  const handleDelete = async (id: string) => {
    if (!id) return;
    
    try {
      const { error } = await logoDesignService.deleteLogoDesign(id);
      
      if (error) throw error;
      
      setDesigns(prevDesigns => prevDesigns.filter(design => design.id !== id));
      toast.success("Logo deleted successfully");
    } catch (error) {
      console.error("Error deleting logo design:", error);
      toast.error("Failed to delete logo");
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (designs.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-md">
        <p className="text-muted-foreground">You haven't created any logos yet.</p>
        <p className="mt-2">Create your first logo by clicking on "Create Logo" in the dashboard.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Your Saved Logo Designs</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <Card key={design.id} className="overflow-hidden">
            <div
              className="h-40 bg-slate-50 dark:bg-slate-900/40 cursor-pointer flex items-center justify-center"
              onClick={() => setSelectedLogo(design)}
            >
              {design.image_url ? (
                <img
                  src={design.image_url}
                  alt={`Logo for ${design.brand_name}`}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <p className="text-muted-foreground">No image</p>
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-sm truncate">{design.brand_name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(design.created_at!).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(design)}
                    disabled={!design.image_url}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(design.id!)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={!!selectedLogo} onOpenChange={(open) => !open && setSelectedLogo(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedLogo && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center">{selectedLogo.brand_name}</h3>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-md">
                <img
                  src={selectedLogo.image_url || ''}
                  alt={`Logo for ${selectedLogo.brand_name}`}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedLogo)}
                  disabled={!selectedLogo.image_url}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              {selectedLogo.prompt_text && (
                <div className="mt-2 text-sm">
                  <details>
                    <summary className="cursor-pointer font-medium">Logo details</summary>
                    <p className="mt-2 text-xs p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                      {selectedLogo.prompt_text}
                    </p>
                  </details>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedLogoDesigns;
