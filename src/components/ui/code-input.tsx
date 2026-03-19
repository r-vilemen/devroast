"use client";

import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { WindowHeader } from "./window-header";

const codeInputContainer = tv({
	base: "bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden w-[780px] h-[320px] flex flex-col",
});

const codeInputInner = tv({
	base: "flex flex-1 overflow-hidden",
});

const lineNumbers = tv({
	base: "flex flex-col py-4 bg-[#0F0F0F] text-[#525252] text-right select-none shrink-0 border-r border-[#2A2A2A] font-mono text-xs leading-6",
});

const lineNumberText = tv({
	base: "px-3",
});

const codeArea = tv({
	base: "flex-1 bg-[#111111] p-4 overflow-auto font-mono text-xs text-[#FAFAFA] resize-none focus:outline-none leading-6",
});

export interface CodeInputProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	showLineNumbers?: boolean;
	initialValue?: string;
	maxLines?: number;
}

const CodeInput = forwardRef<HTMLTextAreaElement, CodeInputProps>(
	(
		{
			className,
			showLineNumbers = true,
			initialValue = "",
			maxLines = 16,
			value,
			...props
		},
		ref,
	) => {
		const lineCount = maxLines;
		const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

		return (
			<div className={codeInputContainer({ className })}>
				<WindowHeader />
				<div className={codeInputInner()}>
					{showLineNumbers && (
						<div className={lineNumbers()}>
							{lines.map((num) => (
								<span key={num} className={lineNumberText()}>
									{num}
								</span>
							))}
						</div>
					)}
					<textarea
						ref={ref}
						value={value}
						defaultValue={value === undefined ? initialValue : undefined}
						className={codeArea()}
						placeholder="// paste your code here..."
						{...props}
					/>
				</div>
			</div>
		);
	},
);

CodeInput.displayName = "CodeInput";

export { CodeInput };
