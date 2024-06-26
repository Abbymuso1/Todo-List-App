import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex flex-col">
					<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						Links to the Pages
					</h2>
					<Link href="/auth-server-action">Login/Sign Up</Link>
					<Link href="/">home</Link>
					<Link href="/todo">To Do List</Link>
				</div>
				{children} <Toaster />
			</body>
		</html>
	);
}
