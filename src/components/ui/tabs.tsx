"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

export interface TabItem {
	value: string;
	label: string;
	content: React.ReactNode;
	disabled?: boolean;
}

export interface TabsProps {
	items: TabItem[];
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	className?: string;
}

export function Tabs({
	items,
	defaultValue,
	value,
	onValueChange,
	disabled = false,
	className,
}: TabsProps) {
	if (!items || items.length === 0) {
		return null;
	}

	return (
		<BaseTabs.Root
			defaultValue={defaultValue || items[0]?.value}
			value={value}
			onValueChange={onValueChange}
		>
			<BaseTabs.List
				className={`flex border-b border-[#2A2A2A] ${disabled ? "opacity-50 pointer-events-none" : ""} ${className || ""}`}
			>
				{items.map((item) => (
					<BaseTabs.Tab
						key={item.value}
						value={item.value}
						disabled={item.disabled || disabled}
						className="relative px-4 py-2.5 text-sm font-mono text-[#737373] transition-colors hover:text-[#A3A3A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] disabled:opacity-50 disabled:cursor-not-allowed data-[selected]:text-[#FAFAFA] data-[selected]:after:absolute data-[selected]:after:bottom-0 data-[selected]:after:left-0 data-[selected]:after:right-0 data-[selected]:after:h-[2px] data-[selected]:after:bg-[#10B981]"
					>
						{item.label}
					</BaseTabs.Tab>
				))}
			</BaseTabs.List>

			{items.map((item) => (
				<BaseTabs.Panel
					key={item.value}
					value={item.value}
					className="pt-4 animate-in fade-in duration-200"
				>
					{item.content}
				</BaseTabs.Panel>
			))}
		</BaseTabs.Root>
	);
}
