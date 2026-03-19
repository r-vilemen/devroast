"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

const navbarStyles = tv({
	base: "flex items-center h-14 px-6 bg-[#0A0A0A] border-b border-[#2A2A2A]",
});

const logoStyles = tv({
	base: "flex items-center gap-2",
});

const logoText = tv({
	base: "font-mono text-lg font-semibold text-[#FAFAFA] tracking-tight",
});

const navLinksStyles = tv({
	base: "flex items-center gap-6 ml-8",
});

const navLinkStyles = tv({
	base: "font-mono text-sm transition-colors",
	variants: {
		active: {
			true: "text-[#FAFAFA]",
			false: "text-[#6B7280] hover:text-[#FAFAFA]",
		},
	},
});

const rightSectionStyles = tv({
	base: "ml-auto flex items-center gap-4",
});

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
	return (
		<header className={navbarStyles({ className })} {...props}>
			<nav className="flex items-center w-full">
				<Logo />
				<NavLinks />
				<div className={rightSectionStyles()}>
					<ThemeToggle />
					<Button size="sm" variant="primary">
						Get Started
					</Button>
				</div>
			</nav>
		</header>
	);
}

export function Logo() {
	return (
		<Link href="/" className={logoStyles()}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-[#10B981]"
			>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
					fill="currentColor"
					fillOpacity="0.2"
				/>
				<path
					d="M8 12h8M12 8v8"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
			<span className={logoText()}>DevRoast</span>
		</Link>
	);
}

export interface NavLinksProps {
	activeLink?: string;
}

export function NavLinks({ activeLink = "home" }: NavLinksProps) {
	const links = [
		{ href: "/", label: "Home", value: "home" },
		{ href: "/editor", label: "Editor", value: "editor" },
		{ href: "/docs", label: "Documentation", value: "docs" },
	];

	return (
		<div className={navLinksStyles()}>
			{links.map((link) => (
				<Link
					key={link.value}
					href={link.href}
					className={navLinkStyles({ active: activeLink === link.value })}
				>
					{link.label}
				</Link>
			))}
			<a
				href="https://github.com"
				target="_blank"
				rel="noopener noreferrer"
				className={navLinkStyles()}
				aria-label="GitHub"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
				</svg>
			</a>
		</div>
	);
}
