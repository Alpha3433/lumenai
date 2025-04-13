
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  ImageIcon, 
  DownloadIcon, 
  RefreshCw, 
  Loader2, 
  PaintBucket, 
  Check
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImageMockupModalProps {
  open: boolean;
  onClose: () => void;
}

type MockupStyle = 'device frame' | 'website' | 'advertising banner' | 'social media post' | 'billboard';

const ImageMockupModal = ({ open, onClose }: ImageMockupModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [mockupSrc, setMockupSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<MockupStyle>('device frame');
  const [customPrompt, setCustomPrompt] = useState('');
  
  // Clear state when modal closes
  useEffect(() => {
    if (!open) {
      // Wait for the closing animation before resetting
      const timeout = setTimeout(() => {
        setSelectedFile(null);
        setPreviewSrc(null);
        setMockupSrc(null);
        setIsGenerating(false);
        setSelectedStyle('device frame');
        setCustomPrompt('');
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [open]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Reset mockup when uploading a new image
      setMockupSrc(null);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const generateMockup = async () => {
    if (!selectedFile || !previewSrc) {
      toast.error("Please select an image first");
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Get base64 data from previewSrc
      const base64Data = previewSrc.split(',')[1];
      
      const { data, error } = await supabase.functions.invoke('generate-mockups', {
        body: {
          imageBase64: base64Data,
          mockupStyle: selectedStyle,
          prompt: customPrompt || undefined
        }
      });
      
      if (error) {
        console.error('Error generating mockup:', error);
        toast.error("Failed to generate mockup");
        return;
      }
      
      if (data.success && data.imageUrl) {
        setMockupSrc(data.imageUrl);
        toast.success("Mockup created successfully!");
      } else {
        toast.error("Failed to generate mockup");
      }
    } catch (error) {
      console.error('Error in generateMockup:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (mockupSrc) {
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = mockupSrc;
      a.download = `mockup-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Mockup downloaded successfully!");
    }
  };
  
  const mockupStyles: MockupStyle[] = [
    'device frame',
    'website',
    'advertising banner',
    'social media post',
    'billboard'
  ];
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Create Mockups from Image</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Upload and settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Upload an image to create mockups
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  {previewSrc ? (
                    <img src={previewSrc} alt="Preview" className="max-h-40 mb-3 rounded" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                  )}
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {previewSrc ? "Change image" : "Select an image"}
                  </span>
                </label>
              </div>
            </div>
            
            {previewSrc && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Select mockup style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {mockupStyles.map((style) => (
                      <Button
                        key={style}
                        type="button"
                        variant={selectedStyle === style ? "default" : "outline"}
                        className={`justify-start text-left ${selectedStyle === style ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        onClick={() => setSelectedStyle(style)}
                      >
                        {selectedStyle === style && <Check className="mr-1 h-4 w-4" />}
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="custom-prompt">
                    Custom prompt (optional)
                  </label>
                  <textarea
                    id="custom-prompt"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                    placeholder="Add custom instructions for the mockup..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    onClick={generateMockup}
                    disabled={isGenerating || !previewSrc}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : mockupSrc ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Mockup
                      </>
                    ) : (
                      <>
                        <PaintBucket className="mr-2 h-4 w-4" />
                        Generate Mockup
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {/* Right side - Mockup preview */}
          <div className="flex flex-col">
            <div className="text-sm font-medium mb-2">Mockup preview</div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md flex-1 flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-900/50">
              {isGenerating ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 dark:text-blue-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Generating your mockup...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">This may take a moment</p>
                </div>
              ) : mockupSrc ? (
                <div className="relative w-full">
                  <img 
                    src={mockupSrc} 
                    alt="Generated Mockup" 
                    className="w-full h-auto rounded shadow-lg" 
                  />
                  <Button
                    onClick={handleDownload}
                    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ) : previewSrc ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Click "Generate Mockup" to create your design
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Upload an image to see a preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          {mockupSrc && (
            <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Mockup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageMockupModal;
