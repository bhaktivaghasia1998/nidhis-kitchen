// shadcn/ui Button. "variant" picks the look, "size" picks the size.
// asChild lets a link (<a>) look exactly like a button.
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_0_-2px] hover:shadow-primary/25',
        outline: 'border-2 border-primary bg-transparent text-primary hover:-translate-y-0.5 hover:bg-primary/5',
        saffron: 'bg-band-accent text-[#1d2621] hover:brightness-105',
        // for buttons on the green top band
        cream: 'bg-leaf-foreground text-leaf hover:-translate-y-0.5 hover:shadow-[0_8px_0_-2px] hover:shadow-black/25',
        creamOutline: 'border-2 border-leaf-foreground/80 bg-transparent text-leaf-foreground hover:-translate-y-0.5 hover:bg-leaf-foreground/10',
        secondary: 'border border-border bg-card text-foreground hover:border-chili/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-5 text-sm',
        sm: 'h-8 px-3.5 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
