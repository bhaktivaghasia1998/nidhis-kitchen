// shadcn/ui Badge: a small rounded label.
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap [&>svg]:size-3.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        dashed: 'border-dashed border-border text-muted-foreground font-normal text-sm py-1.5 whitespace-normal text-left',
        soft: 'border-transparent bg-leaf-foreground/10 text-leaf-foreground text-sm',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
