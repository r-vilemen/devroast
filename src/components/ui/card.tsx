import { tv } from "tailwind-variants";

const card = tv({
	base: "border border-[#2A2A2A] bg-transparent p-5",
	variants: {
		variant: {
			default: "",
			elevated: "bg-[#1A1A1A]",
			analysis: "w-[480px]",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const cardHeader = tv({
	base: "flex items-center gap-2",
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "analysis";
}

export function Card({ className, variant, ...props }: CardProps) {
	return <div className={card({ variant, className })} {...props} />;
}

export function CardHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cardHeader({ className })} {...props} />;
}

export { card, cardHeader };
