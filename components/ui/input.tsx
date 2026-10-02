// shadcn/ui Input: a text box.
import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full min-w-0 rounded-full border-[1.5px] border-input bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-chili',
        className
      )}
      {...props}
    />
  );
}

export { Input };
