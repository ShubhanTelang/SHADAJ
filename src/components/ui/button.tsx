import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva,type VariantProps} from 'class-variance-authority';
import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
const styles=cva('btn',{variants:{variant:{default:'btn-primary',outline:'btn-outline',ghost:'btn-ghost'}},defaultVariants:{variant:'default'}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof styles>{asChild?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,asChild=false,...props},ref)=>{const Comp=asChild?Slot:'button';return <Comp className={twMerge(clsx(styles({variant}),className))} ref={ref} {...props}/>});
Button.displayName='Button';
