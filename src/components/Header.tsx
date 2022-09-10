import React from "react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

export const Header: React.FC = () => (
  <header className="z-50 top-0 bg-white pr-8 pl-8 flex items-center justify-between h-16 border-b-2 border-gray-200 fixed w-full">
    <Link href="/">
      <a className="text-gray-800 py-2 text-lg font-medium">RLT</a>
    </Link>
    <Sidebar />
  </header>
);
