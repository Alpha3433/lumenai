import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';
interface AIEngineSelectorProps {
  useAIV2: boolean;
  isPremium: boolean;
  onToggleChange: (name: string, value: boolean) => void;
  onUpgrade: () => void;
}
const AIEngineSelector = ({
  useAIV2,
  isPremium,
  onToggleChange,
  onUpgrade
}: AIEngineSelectorProps) => {
  return <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium flex items-center">
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            AI Model Selection
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isPremium ? 'Choose between standard and premium AI models' : 'Unlock our premium AI model for enhanced analysis'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isPremium && <Button type="button" variant="outline" size="sm" onClick={onUpgrade} className="text-xs">
              Upgrade
            </Button>}
          <div className="flex items-center gap-2">
            <span className="text-sm">Standard</span>
            <Switch id="ai-version-switch" checked={useAIV2} onCheckedChange={checked => onToggleChange('useAIV2', checked)} disabled={!isPremium} />
            <span className="text-sm font-medium">GPT-4.1 {!isPremium && '🔒'}</span>
          </div>
        </div>
      </div>
      {!isPremium && <div className="mt-2 text-xs text-muted-foreground">
          Upgrade to access our advanced GPT-4.1 model for more nuanced and comprehensive business insights
        </div>}
    </div>;
};
export default AIEngineSelector;