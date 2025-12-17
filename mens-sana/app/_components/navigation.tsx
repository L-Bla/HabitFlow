"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
    title: string;
    path: `/${string}`;
}

const pages: Page[] = [
    {title: "Home", path: "/"},
    {title: "Blog", path: "/blog"},
    {title: "Smart Scheduler", path: "/scheduler"},
    {title: "Analytics", path: "/analytics"},
    {title: "Settings", path: "/settings"}
]

function processPage(page: Page, index: number, currentPath?: string) {
  const isActive =
    page.path === "/"
      ? currentPath === page.path
      : currentPath?.startsWith(page.path);

  return (
    <li key={index}>
      <Link href={page.path} className={isActive ? "border" : ""}>
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const currentPath = usePathname();
  return (
    <nav>
      <ul className="flex space-x-4">
        {pages.map((page, index) => processPage(page, index, currentPath))}
      </ul>
    </nav>
  );
}