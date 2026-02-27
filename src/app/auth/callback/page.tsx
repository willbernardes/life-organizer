"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Check if profile exists
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("onboarding_completed")
                    .eq("id", session.user.id)
                    .single();

                if (!profile) {
                    // Create initial profile
                    await supabase.from("profiles").insert({
                        id: session.user.id,
                        full_name: session.user.user_metadata?.full_name || "",
                        avatar_url: session.user.user_metadata?.avatar_url || null,
                        onboarding_completed: false,
                    });
                    router.push("/onboarding");
                } else if (!profile.onboarding_completed) {
                    router.push("/onboarding");
                } else {
                    router.push("/");
                }
            } else {
                router.push("/login");
            }
        };

        handleCallback();
    }, [router]);

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-primary)",
        }}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: 48,
                    height: 48,
                    border: "3px solid var(--border-color)",
                    borderTopColor: "var(--accent-blue)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 16px",
                }} />
                <p style={{ color: "var(--text-secondary)" }}>Autenticando...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}
