
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  ImageIcon, 
  DownloadIcon, 
  RefreshCw, 
  Loader2, 
  PaintBucket, 
  Check,
  Pencil,
  Upload,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImageMockupModalProps {
  open: boolean;
  onClose: () => void;
}

type MockupStyle = 'device frame' | 'website' | 'advertising banner' | 'social media post' | 'billboard';

const ImageMockupModal = ({ open, onClose }: ImageMockupModalProps) => {
  const [mockupPrompt, setMockupPrompt] = useState<string>('');
  const [mockupSrc, setMockupSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<MockupStyle>('device frame');
  const [customPrompt, setCustomPrompt] = useState('');
  const [lastUsedPrompt, setLastUsedPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Clear state when modal closes
  useEffect(() => {
    if (!open) {
      // Wait for the closing animation before resetting
      const timeout = setTimeout(() => {
        setMockupPrompt('');
        setMockupSrc(null);
        setIsGenerating(false);
        setSelectedStyle('device frame');
        setCustomPrompt('');
        setLastUsedPrompt('');
        setUploadedImage(null);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [open]);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
  };
  
  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const generateMockup = async () => {
    if (!mockupPrompt && !customPrompt) {
      toast.error("Please enter a prompt for the mockup");
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Prepare the prompt
      const finalPrompt = customPrompt || `Create a mockup for ${mockupPrompt}`;
      setLastUsedPrompt(finalPrompt);
      
      // Prepare the request body
      const requestBody: any = {
        prompt: finalPrompt,
        mockupStyle: selectedStyle
      };
      
      // Add base64 image if available
      if (uploadedImage) {
        // If the image is already in base64 format, use it directly
        requestBody.imageBase64 = uploadedImage;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-mockups', {
        body: requestBody
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
  
  const handleRetry = () => {
    // Reset mockup source before generating a new one
    setMockupSrc(null);
    generateMockup();
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
        <h2 className="text-2xl font-bold mb-4">Create Mockups from Prompts & Images</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Upload and settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter a prompt to create mockups
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                placeholder="Describe what you want to create a mockup for..."
                value={mockupPrompt}
                onChange={(e) => setMockupPrompt(e.target.value)}
                rows={3}
              />
            </div>
            
            {/* Image upload section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Upload an image (optional)
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4">
                {uploadedImage ? (
                  <div className="relative w-full">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded Preview" 
                      className="w-full h-auto max-h-32 object-contain rounded" 
                    />
                    <button 
                      onClick={clearUploadedImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-xs text-center mt-2 text-gray-500">Image uploaded successfully</p>
                  </div>
                ) : (
                  <>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center py-3">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload an image or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                      <input 
                        id="image-upload" 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageUpload} 
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
            
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
                disabled={isGenerating}
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
                    Generate New Mockup
                  </>
                ) : (
                  <>
                    <PaintBucket className="mr-2 h-4 w-4" />
                    Generate Mockup
                  </>
                )}
              </Button>
            </div>
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
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Button
                      onClick={handleRetry}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Pencil className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Enter a prompt and/or upload an image, then click "Generate Mockup"
                  </p>
                </div>
              )}
            </div>

            {mockupSrc && lastUsedPrompt && (
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-medium">Used prompt:</p>
                <p className="italic">{lastUsedPrompt}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          {mockupSrc && (
            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
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
