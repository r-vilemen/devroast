"use client";

import { tv } from "tailwind-variants";
import { Button } from "@/components/ui/button";
import { CodeExamplesSection } from "@/components/ui/code-examples-section";
import { EditorPreviewDemo } from "@/components/ui/editor-preview";
import { FooterStats } from "@/components/ui/footer-stats";

const pageContainer = tv({
	base: "min-h-screen bg-[#0C0C0C] text-[#FAFAFA]",
});

const heroSection = tv({
	base: "flex flex-col items-center justify-center px-6 py-24 text-center",
});

const heroTitle = tv({
	base: "font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl",
});

const heroSubtitle = tv({
	base: "font-mono text-base md:text-lg text-[#6B7280] mt-6 max-w-2xl",
});

const ctaSection = tv({
	base: "flex items-center gap-4 mt-10",
});

const editorSection = tv({
	base: "flex flex-col items-center px-6 py-16",
});

const sectionTitle = tv({
	base: "font-mono text-2xl font-semibold text-[#FAFAFA] mb-2 text-center",
});

const sectionSubtitle = tv({
	base: "font-mono text-sm text-[#6B7280] mb-8 text-center",
});

const examplesSection = tv({
	base: "flex flex-col items-center px-6 py-16 bg-[#0A0A0A]",
});

const footer = tv({
	base: "flex flex-col items-center px-6 py-8 border-t border-[#2A2A2A]",
});

export default function Home() {
	return (
		<main className={pageContainer()}>
			<section className={heroSection()}>
				<h1 className={heroTitle()}>
					<span className="text-[#10B981]">Level up</span> your code quality
					with <span className="text-[#10B981]">AI-powered</span> code reviews
				</h1>
				<p className={heroSubtitle()}>
					Upload your code and get brutally honest feedback from our AI.
					Discover security vulnerabilities, performance issues, and best
					practices that will make your code unstoppable.
				</p>
				<div className={ctaSection()}>
					<Button size="lg" variant="primary">
						Get Started
					</Button>
					<Button size="lg" variant="secondary">
						Try Demo
					</Button>
				</div>
			</section>

			<section className={editorSection()}>
				<h2 className={sectionTitle()}>See it in action</h2>
				<p className={sectionSubtitle()}>
					Upload your code and get instant feedback
				</p>
				<EditorPreviewDemo />
			</section>

			<section className={examplesSection()}>
				<h2 className={sectionTitle()}>What we catch</h2>
				<p className={sectionSubtitle()}>
					From security vulnerabilities to code smells, we have you covered
				</p>
				<CodeExamplesSection />
			</section>

			<footer className={footer()}>
				<FooterStats />
			</footer>
		</main>
	);
}
