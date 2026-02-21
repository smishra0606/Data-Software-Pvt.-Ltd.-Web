import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ButtonGrad = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="p-[1px] border-[1px] overflow-hidden bg-gradient-subtle rounded-full">
        <Comp
          className={
            "flex justify-center items-center font-medium  overflow-hidden bg-white/70 dark:bg-black/50 whitespace-nowrap text-sm px-6 py-4  rounded-full"
          }
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
ButtonGrad.displayName = "Button";

export { ButtonGrad };
