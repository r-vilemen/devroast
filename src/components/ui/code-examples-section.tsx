"use client";

import { tv } from "tailwind-variants";
import { Badge } from "./badge";
import { Button } from "./button";
import { HighlightedCodeBlockClient } from "./highlighted-code-block-client";

const sectionContainer = tv({
	base: "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl",
});

const card = tv({
	base: "bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden flex flex-col",
});

const cardHeader = tv({
	base: "flex items-center justify-between p-4 border-b border-[#2A2A2A]",
});

const cardContent = tv({
	base: "flex-1 p-4",
});

const cardFooter = tv({
	base: "flex items-center justify-between p-4 border-t border-[#2A2A2A]",
});

const issueTitle = tv({
	base: "font-mono text-sm font-medium text-[#FAFAFA]",
});

const issueDescription = tv({
	base: "font-mono text-xs text-[#6B7280] mt-1",
});

export interface CodeExample {
	id: string;
	title: string;
	description: string;
	severity: "critical" | "warning" | "good";
	code: string;
	language: string;
}

const sampleExamples: CodeExample[] = [
	{
		id: "sql-injection",
		title: "SQL Injection Vulnerability",
		description: "User input directly concatenated into SQL query",
		severity: "critical",
		language: "javascript",
		code: `// VULNERABLE: SQL Injection
const query = "SELECT * FROM users WHERE id = " + userId;
db.query(query);

// FIXED: Parameterized query
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);`,
	},
	{
		id: "memory-leak",
		title: "Potential Memory Leak",
		description: "Event listeners not being cleaned up",
		severity: "warning",
		language: "javascript",
		code: `// PROBLEMATIC: Memory leak
function createComponent() {
  window.addEventListener('resize', handleResize);
  return { /* ... */ };
}

// FIXED: Cleanup function
function createComponent() {
  window.addEventListener('resize', handleResize);
  return {
    cleanup: () => window.removeEventListener('resize', handleResize)
  };
}`,
	},
	{
		id: "async-await",
		title: "Clean Async Pattern",
		description: "Proper async/await with error handling",
		severity: "good",
		language: "javascript",
		code: `// BEST PRACTICE: Async/await
async function fetchUserData(userId) {
  try {
    const [user, posts] = await Promise.all([
      getUser(userId),
      getUserPosts(userId)
    ]);
    return { user, posts };
  } catch (error) {
    logger.error('Failed to fetch user data', { userId, error });
    throw new UserDataError(error);
  }
}`,
	},
];

interface CodeExamplesSectionProps {
	examples?: CodeExample[];
}

export function CodeExamplesSection({
	examples: _examples = sampleExamples,
}: CodeExamplesSectionProps) {
	const getBadgeVariant = (severity: CodeExample["severity"]) => {
		switch (severity) {
			case "critical":
				return "critical";
			case "warning":
				return "warning";
			case "good":
				return "good";
		}
	};

	return (
		<div className={sectionContainer()}>
			{sampleExamples.map((example) => (
				<div key={example.id} className={card()}>
					<div className={cardHeader()}>
						<div>
							<h3 className={issueTitle()}>{example.title}</h3>
							<p className={issueDescription()}>{example.description}</p>
						</div>
						<Badge
							variant={getBadgeVariant(example.severity)}
							showDot
							dotSize="sm"
						>
							{example.severity}
						</Badge>
					</div>

					<div className={cardContent()}>
						<HighlightedCodeBlockClient
							code={example.code}
							language={example.language}
							showLineNumbers={true}
						/>
					</div>

					<div className={cardFooter()}>
						<span className="text-[#525252] text-xs font-mono">
							{example.language}
						</span>
						<Button size="sm" variant="secondary">
							Try in Editor
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
