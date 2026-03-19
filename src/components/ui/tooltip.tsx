"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

export interface TooltipProps {
	children: React.ReactNode;
	content: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	disabled?: boolean;
	className?: string;
}

export function Tooltip({
	children,
	content,
	side = "top",
	disabled = false,
	className,
}: TooltipProps) {
	if (disabled) {
		return <>{children}</>;
	}

	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger className={className} render={<span />}>
				{children}
			</BaseTooltip.Trigger>

			<BaseTooltip.Portal>
				<BaseTooltip.Positioner side={side} sideOffset={8} className="z-50">
					<BaseTooltip.Popup className="bg-[#171717] border border-[#2A2A2A] text-[#FAFAFA] text-xs font-mono px-2.5 py-1.5 rounded-md shadow-lg animate-in fade-in zoom-in-95 duration-200">
						{content}
						<BaseTooltip.Arrow className="absolute w-3 h-3 bg-[#171717] border-[#2A2A2A] rotate-45" />
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
