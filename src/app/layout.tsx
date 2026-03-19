import type { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/lib/themes";
import "./globals.css";

export const metadata: Metadata = {
	title: "DevRoast - AI-Powered Code Reviews",
	description: "Level up your code quality with AI-powered code reviews",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
