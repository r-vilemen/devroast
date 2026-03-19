"use client";

import { tv } from "tailwind-variants";
import { Toggle, type ToggleSize } from "./toggle";

const roastToggleWrapper = tv({
	base: "flex items-center gap-10",
});

const roastToggleContent = tv({
	base: "flex items-center gap-3",
});

const roastLabel = tv({
	base: "font-mono text-sm",
	variants: {
		active: {
			true: "text-[#10B981]",
			false: "text-[#737373]",
		},
	},
});

const roastIcon = tv({
	base: "font-mono text-xs text-[#525252]",
});

export interface RoastToggleProps {
	className?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	id?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	iconText?: string;
	size?: ToggleSize;
}

export function RoastToggle({
	label = "roast mode",
	iconText = "// maximum sarcasm enabled",
	className,
	defaultChecked,
	...props
}: RoastToggleProps) {
	return (
		<div className={roastToggleWrapper({ className })}>
			<div className={roastToggleContent()}>
				<Toggle defaultChecked={defaultChecked} {...props} />
				<span className={roastLabel({ active: defaultChecked })}>{label}</span>
			</div>
			<span className={roastIcon()}>{iconText}</span>
		</div>
	);
}
