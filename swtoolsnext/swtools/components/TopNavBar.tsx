"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


export function TopNavBar() {
	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Home</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md relative overflow-hidden"
										href="/"
									>
										<img
											src="/file.svg"
											alt=""
											className="mb-4 absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none "
											aria-hidden="true"
										/>
										<div className="mt-4 mb-2 text-lg font-medium relative z-10">
											SkyWarsTools
										</div>
										<p className="text-muted-foreground text-sm leading-tight relative z-10">
											Utilities and Tools for Hypixel SkyWars
										</p>
									</Link>
								</NavigationMenuLink>
							</li>
							<ListItem href="/docs" title="Introduction">
								Re-usable components built using Radix UI and
								Tailwind CSS.
							</ListItem>
							<ListItem
								href="/docs/installation"
								title="Installation"
							>
								How to install dependencies and structure your
								app.
							</ListItem>
							<ListItem
								href="/docs/primitives/typography"
								title="Typography"
							>
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={navigationMenuTriggerStyle()}
					>
						<Link href="/docs">Docs</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>List</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[300px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">
										<div className="font-medium">
											Components
										</div>
										<div className="text-muted-foreground">
											Browse all components in the
											library.
										</div>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">
										<div className="font-medium">
											Documentation
										</div>
										<div className="text-muted-foreground">
											Learn how to use the library.
										</div>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">
										<div className="font-medium">Blog</div>
										<div className="text-muted-foreground">
											Read our latest blog posts.
										</div>
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Simple</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Components</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">Documentation</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="#">Blocks</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link
										href="#"
										className="flex-row items-center gap-2"
									>
										<CircleHelpIcon />
										Backlog
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link
										href="#"
										className="flex-row items-center gap-2"
									>
										<CircleIcon />
										To Do
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link
										href="#"
										className="flex-row items-center gap-2"
									>
										<CircleCheckIcon />
										Done
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">
						{title}
					</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
