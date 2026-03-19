"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type * as React from "react";

export interface DialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
	return (
		<BaseDialog.Root open={open} onOpenChange={onOpenChange} modal>
			{children}
		</BaseDialog.Root>
	);
}

export interface DialogTriggerProps {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export function DialogTrigger({
	children,
	className,
	disabled,
}: DialogTriggerProps) {
	return (
		<BaseDialog.Trigger className={className} disabled={disabled}>
			{children}
		</BaseDialog.Trigger>
	);
}

export interface DialogBackdropProps {
	className?: string;
}

export function DialogBackdrop({ className }: DialogBackdropProps) {
	return (
		<BaseDialog.Backdrop
			className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-200 ${className || ""}`}
		/>
	);
}

export interface DialogPopupProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogPopup({ children, className }: DialogPopupProps) {
	return (
		<BaseDialog.Portal>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<BaseDialog.Viewport className="z-50 w-full max-w-lg">
					<BaseDialog.Popup
						className={`bg-[#171717] border border-[#2A2A2A] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${className || ""}`}
					>
						{children}
					</BaseDialog.Popup>
				</BaseDialog.Viewport>
			</div>
		</BaseDialog.Portal>
	);
}

export interface DialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<BaseDialog.Title
			className={`px-6 py-4 text-lg font-mono font-semibold text-[#FAFAFA] border-b border-[#2A2A2A] ${className || ""}`}
		>
			{children}
		</BaseDialog.Title>
	);
}

export interface DialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogDescription({
	children,
	className,
}: DialogDescriptionProps) {
	return (
		<BaseDialog.Description
			className={`px-6 py-3 text-sm font-mono text-[#737373] ${className || ""}`}
		>
			{children}
		</BaseDialog.Description>
	);
}

export interface DialogContentProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
	return <div className={`px-6 py-4 ${className || ""}`}>{children}</div>;
}

export interface DialogFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
	return (
		<div
			className={`flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A] bg-[#0F0F0F] ${className || ""}`}
		>
			{children}
		</div>
	);
}

export interface DialogCloseProps {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export function DialogClose({
	children,
	className,
	disabled,
}: DialogCloseProps) {
	return (
		<BaseDialog.Close className={className} disabled={disabled}>
			{children}
		</BaseDialog.Close>
	);
}
