import { tv } from "tailwind-variants";

const navbar = tv({
	base: "flex items-center h-14 px-6 bg-[#0A0A0A] border-b border-[#2A2A2A]",
});

const logo = tv({
	base: "flex items-center gap-2",
});

const link = tv({
	base: "font-mono text-sm text-[#6B7280] hover:text-[#FAFAFA] transition-colors",
	variants: {
		active: {
			true: "text-[#FAFAFA]",
			false: "",
		},
	},
});

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export interface NavLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	active?: boolean;
}

export function Navbar({ className, ...props }: NavbarProps) {
	return <nav className={navbar({ className })} {...props} />;
}

export function NavLogo({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={logo({ className })} {...props} />;
}

export function NavLink({ className, active, ...props }: NavLinkProps) {
	return <a className={link({ active, className })} {...props} />;
}

export { link, logo, navbar };
