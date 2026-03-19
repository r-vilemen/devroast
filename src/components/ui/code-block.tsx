import { tv } from "tailwind-variants";

const codeBlock = tv({
	base: "bg-[#111111] border border-[#2A2A2A] overflow-hidden font-mono",
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const codeHeader = tv({
	base: "flex items-center gap-3 h-10 px-4 border-b border-[#2A2A2A]",
});

const codeBody = tv({
	base: "flex",
});

const lineNumbers = tv({
	base: "flex flex-col gap-1.5 py-3 px-2.5 bg-[#0F0F0F] border-r border-[#2A2A2A] text-right w-10 select-none",
});

const codeLines = tv({
	base: "flex flex-col gap-1.5 py-3 px-3 flex-1 overflow-x-auto",
});

const codeLine = tv({
	base: "leading-6 text-[#FAFAFA]",
	variants: {
		type: {
			normal: "text-[#FAFAFA]",
			comment: "text-[#8B8B8B]",
			keyword: "text-[#C678DD]",
			string: "text-[#98C379]",
			number: "text-[#D19A66]",
		},
	},
	defaultVariants: {
		type: "normal",
	},
});

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md";
}

export interface CodeHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CodeLineProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
	type?: "normal" | "comment" | "keyword" | "string" | "number";
	className?: string;
}

export function CodeLine({
	className,
	type = "normal",
	...props
}: CodeLineProps) {
	return <div className={codeLine({ type, className })} {...props} />;
}

export function CodeBlock({ className, size, ...props }: CodeBlockProps) {
	return <div className={codeBlock({ size, className })} {...props} />;
}

export function CodeHeader({ className, ...props }: CodeHeaderProps) {
	return <div className={codeHeader({ className })} {...props} />;
}

export function CodeBody({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={codeBody({ className })} {...props} />;
}

export function CodeLineNumbersContainer({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={lineNumbers({ className })} {...props} />;
}

export function CodeLineNumber({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return <span className={`text-[#737373] ${className || ""}`} {...props} />;
}

export function CodeLines({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={codeLines({ className })} {...props} />;
}

export { codeBlock, codeBody, codeHeader, codeLine, codeLines, lineNumbers };
