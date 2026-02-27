"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import type { Profile, Family, FamilyMember } from "@/lib/types";

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    family: Family | null;
    familyMembers: FamilyMember[];
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    family: null,
    familyMembers: [],
    loading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

const PUBLIC_ROUTES = ["/login", "/invite"];

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [family, setFamily] = useState<Family | null>(null);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const supabase = createClient();

    const fetchProfile = async (userId: string) => {
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();
        return data as Profile | null;
    };

    const fetchFamily = async (familyId: string) => {
        const { data } = await supabase
            .from("families")
            .select("*")
            .eq("id", familyId)
            .single();
        return data as Family | null;
    };

    const fetchFamilyMembers = async (familyId: string) => {
        const { data } = await supabase
            .from("family_members")
            .select("*")
            .eq("family_id", familyId)
            .order("role", { ascending: true });
        return (data as FamilyMember[]) || [];
    };

    const refreshProfile = async () => {
        if (!user) return;
        const p = await fetchProfile(user.id);
        setProfile(p);
        if (p?.active_family_id) {
            const f = await fetchFamily(p.active_family_id);
            setFamily(f);
            const m = await fetchFamilyMembers(p.active_family_id);
            setFamilyMembers(m);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    const p = await fetchProfile(session.user.id);
                    setProfile(p);

                    if (p?.active_family_id) {
                        const f = await fetchFamily(p.active_family_id);
                        setFamily(f);
                        const m = await fetchFamilyMembers(p.active_family_id);
                        setFamilyMembers(m);
                    }

                    if (!p?.onboarding_completed && pathname !== "/onboarding") {
                        router.push("/onboarding");
                    }
                } else if (!PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
                    router.push("/login");
                }
            } catch {
                // Supabase not configured yet — allow browsing
            } finally {
                setLoading(false);
            }
        };

        init();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
            if (session?.user) {
                setUser(session.user);
                const p = await fetchProfile(session.user.id);
                setProfile(p);
                if (p?.active_family_id) {
                    const f = await fetchFamily(p.active_family_id);
                    setFamily(f);
                    const m = await fetchFamilyMembers(p.active_family_id);
                    setFamilyMembers(m);
                }
            } else {
                setUser(null);
                setProfile(null);
                setFamily(null);
                setFamilyMembers([]);
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setFamily(null);
        setFamilyMembers([]);
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                family,
                familyMembers,
                loading,
                signOut,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
