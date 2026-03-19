"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";
import { Badge } from "./badge";
import { HighlightedCodeBlockClient } from "./highlighted-code-block-client";

const editorContainer = tv({
	base: "bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden w-full max-w-[900px]",
});

const windowHeader = tv({
	base: "flex items-center h-10 px-4 border-b border-[#2A2A2A] bg-[#0F0F0F]",
});

const windowDots = tv({
	base: "flex items-center gap-2",
});

const tabsContainer = tv({
	base: "flex items-center gap-0 ml-4",
});

const tabStyles = tv({
	base: "px-4 py-2 text-xs font-mono transition-colors cursor-pointer",
	variants: {
		active: {
			true: "text-[#FAFAFA] bg-[#111111] border-t border-x border-[#2A2A2A] border-t-[#10B981] -mb-px",
			false: "text-[#737373] hover:text-[#A3A3A3]",
		},
	},
});

const actionButtons = tv({
	base: "ml-auto flex items-center gap-2",
});

const _annotationIcon = tv({
	base: "flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold",
	variants: {
		type: {
			error: "bg-[#EF4444]/20 text-[#EF4444]",
			warning: "bg-[#F59E0B]/20 text-[#F59E0B]",
			info: "bg-[#3B82F6]/20 text-[#3B82F6]",
		},
	},
});

const _codeRow = tv({
	base: "flex items-center gap-3 hover:bg-[#1A1A1A]/50 px-4 py-1 transition-colors cursor-pointer",
});

const _lineNumber = tv({
	base: "font-mono text-xs text-[#525252] text-right select-none w-8",
});

const _iconsContainer = tv({
	base: "flex items-center gap-1",
});

const _codeContent = tv({
	base: "flex-1 font-mono text-xs text-[#A3A3A3] leading-6",
});

interface EditorTab {
	filename: string;
	code: string;
	language: string;
}

interface Annotation {
	line: number;
	type: "error" | "warning" | "info";
	message: string;
}

interface EditorPreviewProps {
	tabs: EditorTab[];
	annotations?: Annotation[];
}

export function EditorPreview({ tabs, annotations = [] }: EditorPreviewProps) {
	const [activeTab, setActiveTab] = useState(0);

	const _getAnnotationsForLine = (line: number) => {
		return annotations.filter((a) => a.line === line);
	};

	return (
		<div className={editorContainer()}>
			<div className={windowHeader()}>
				<div className={windowDots()}>
					<span className="w-3 h-3 rounded-full bg-[#EF4444]" />
					<span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
					<span className="w-3 h-3 rounded-full bg-[#10B981]" />
				</div>
				<div className={tabsContainer()}>
					{tabs.map((tab, index) => (
						<button
							key={tab.filename}
							type="button"
							className={tabStyles({ active: activeTab === index })}
							onClick={() => setActiveTab(index)}
						>
							{tab.filename}
						</button>
					))}
				</div>
				<div className={actionButtons()}>
					<Badge variant="good" showDot dotSize="sm">
						AI Analysis Ready
					</Badge>
				</div>
			</div>

			<div className="p-4">
				<HighlightedCodeBlockClient
					code={tabs[activeTab]?.code || ""}
					language={tabs[activeTab]?.language || "python"}
				/>
			</div>
		</div>
	);
}

const sampleTabs: EditorTab[] = [
	{
		filename: "main.py",
		language: "python",
		code: `import os
import hashlib
from flask import Flask, request

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # SECURITY ISSUE: Plain text password comparison
    if username == "admin" and password == "admin123":
        return "Welcome, admin!"
    
    return "Invalid credentials"

if __name__ == '__main__':
    app.run(debug=True)`,
	},
	{
		filename: "utils.py",
		language: "python",
		code: `import requests
from functools import wraps
import time

def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    time.sleep(1)
            return None
        return wrapper
    return decorator

@retry(max_attempts=5)
def fetch_data(url):
    response = requests.get(url, timeout=30)
    return response.json()`,
	},
];

const sampleAnnotations: Annotation[] = [
	{ line: 12, type: "error", message: "Plain text password comparison" },
	{ line: 12, type: "warning", message: "Hardcoded credentials detected" },
	{ line: 20, type: "warning", message: "Debug mode enabled in production" },
];

export function EditorPreviewDemo() {
	return <EditorPreview tabs={sampleTabs} annotations={sampleAnnotations} />;
}
