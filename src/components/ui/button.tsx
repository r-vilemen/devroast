import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center gap-2 font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary:
				"bg-[#10B981] text-[#0A0A0A] hover:bg-[#0D9668] active:bg-[#0A8A5C]",
			secondary:
				"border border-[#2A2A2A] text-[#FAFAFA] hover:bg-[#2A2A2A] active:bg-[#3A3A3A]",
			link: "border border-[#2A2A2A] text-[#6B7280] hover:text-[#FAFAFA] hover:border-[#3A3A3A]",
		},
		size: {
			sm: "h-8 px-4 py-2 text-xs",
			md: "h-10 px-6 py-2.5 text-sm",
			lg: "h-12 px-8 py-3 text-base",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={button({ variant, size, className })}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { Button };
