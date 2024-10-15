'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { FormField, FormItem } from '@/components/ui/form';
import ShaFormField from './ShaFormField';

export type ShaTitledFormControlProps = {
  titleprops?: React.HTMLAttributes<HTMLDivElement> & {
    text: string;
  };
  formfieldprops?: React.ComponentProps<typeof ShaFormField>;
  onchange?: () => void;
};

const TitledFormControl: React.FC<ShaTitledFormControlProps> = ({
  titleprops,
  formfieldprops,
  onchange,
}) => {
  return (
    <Card
      className={cn(
        'flex w-full min-w-[550px] overflow-hidden mb-2 hover:shadow-md transition-shadow',
        'rounded-lg' // Add rounded corners to match MUI version
      )}
    >
      <div
        className={cn(
          'w-[150px] min-w-[150px] flex justify-start items-center bg-primary text-white px-3',
          'rounded-l-lg' // Round only left corners
        )}
      >
        {titleprops && (
          <div {...titleprops} className={cn('text-lg font-semibold', titleprops.className)}>
            {titleprops.text}
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center p-2 bg-background">
        {formfieldprops && (
          <FormItem className="w-full">
            <FormField {...formfieldprops} />
          </FormItem>
        )}
      </div>
    </Card>
  );
};

export default TitledFormControl;
