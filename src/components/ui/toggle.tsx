import { tv, type VariantProps } from "tailwind-variants";

const track = tv({
	base: "relative flex items-center rounded-full transition-colors duration-200",
	variants: {
		size: {
			sm: "h-[18px] w-[34px]",
			md: "h-[22px] w-[40px]",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const knob = tv({
	base: "rounded-full transition-transform duration-200",
	variants: {
		size: {
			sm: "h-[14px] w-[14px]",
			md: "h-[16px] w-[16px]",
		},
	},
});

export type ToggleSize = "sm" | "md";

export interface ToggleProps extends VariantProps<typeof track> {
	className?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	id?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const KNOB_TRANSLATIONS = {
	sm: {
		on: "translateX(16px)",
		off: "translateX(2px)",
	},
	md: {
		on: "translateX(18px)",
		off: "translateX(3px)",
	},
} as const;

export function Toggle({
	className,
	checked,
	defaultChecked,
	size = "md",
	id,
	onChange,
}: ToggleProps) {
	const trackClass = track({ size });
	const knobClass = knob({ size });
	const isChecked = checked !== undefined ? checked : defaultChecked;
	const translation = KNOB_TRANSLATIONS[size];

	return (
		<label
			htmlFor={id}
			className={`relative inline-flex items-center gap-3 cursor-pointer ${className || ""}`}
		>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				defaultChecked={defaultChecked}
				onChange={onChange}
				className="sr-only"
			/>
			<span className="sr-only">Toggle</span>
			<span
				className={trackClass}
				style={{
					backgroundColor: isChecked ? "#10B981" : "#2A2A2A",
				}}
			>
				<span
					className={knobClass}
					style={{
						transform: isChecked ? translation.on : translation.off,
						backgroundColor: isChecked ? "#0A0A0A" : "#6B7280",
					}}
				/>
			</span>
		</label>
	);
}
