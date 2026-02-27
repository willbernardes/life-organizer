"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const NO_SHELL_ROUTES = ["/login", "/onboarding", "/auth"];

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showShell = !NO_SHELL_ROUTES.some((r) => pathname.startsWith(r));

    if (!showShell) {
        return <>{children}</>;
    }

    return (
        <>
            <Sidebar />
            <main className="main-content">{children}</main>
        </>
    );
}
