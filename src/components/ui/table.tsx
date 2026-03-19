import { tv } from "tailwind-variants";

const tableRow = tv({
	base: "flex items-center gap-6 px-5 py-4 border-b border-[#2A2A2A]",
});

const cell = tv({
	base: "",
	variants: {
		variant: {
			rank: "w-10 text-center",
			score: "w-[60px] text-center",
			code: "flex-1",
			lang: "w-[100px]",
		},
	},
});

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "rank" | "score" | "code" | "lang";
}

export function TableRow({ className, ...props }: TableRowProps) {
	return <div className={tableRow({ className })} {...props} />;
}

export function TableCell({ className, variant, ...props }: TableCellProps) {
	return <div className={cell({ variant, className })} {...props} />;
}

export { cell, tableRow };
