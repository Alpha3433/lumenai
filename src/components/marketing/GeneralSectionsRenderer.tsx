
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface GeneralSectionsRendererProps {
  sections: string[];
}

const GeneralSectionsRenderer: React.FC<GeneralSectionsRendererProps> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;
  
  return (
    <>
      <Separator className="my-6" />
      <div className="prose dark:prose-invert max-w-none text-sm space-y-4">
        {sections.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-gray-700 dark:text-gray-300">{paragraph}</p>
        ))}
      </div>
    </>
  );
};

export default GeneralSectionsRenderer;
