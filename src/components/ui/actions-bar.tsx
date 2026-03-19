"use client";

import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { Button } from "./button";
import { RoastToggle } from "./roast-toggle";

const actionsBar = tv({
	base: "flex items-center justify-between w-full max-w-[780px]",
});

export interface ActionsBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ActionsBar = forwardRef<HTMLDivElement, ActionsBarProps>(
	({ className, ...props }, ref) => {
		return (
			<div ref={ref} className={actionsBar({ className })} {...props}>
				<RoastToggle defaultChecked />
				<Button variant="primary" size="md">
					$ roast_my_code
				</Button>
			</div>
		);
	},
);

ActionsBar.displayName = "ActionsBar";

export { ActionsBar };
