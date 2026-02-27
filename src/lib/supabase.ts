import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function isSupabaseConfigured(): boolean {
    return !!(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("https://"));
}

export function createClient() {
    if (!isSupabaseConfigured()) {
        // Return a mock client during build or when not configured
        return {
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                getUser: async () => ({ data: { user: null }, error: null }),
                signInWithOAuth: async () => ({ data: null, error: null }),
                signOut: async () => ({ error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            },
            from: () => ({
                select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }), order: async () => ({ data: [], error: null }) }), single: async () => ({ data: null, error: null }) }),
                insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }), then: async () => ({}) }),
                update: () => ({ eq: async () => ({ data: null, error: null }) }),
                delete: () => ({ eq: async () => ({ data: null, error: null }) }),
                upsert: async () => ({ data: null, error: null }),
            }),
        } as any;
    }

    if (!client) {
        client = createBrowserClient(supabaseUrl, supabaseAnonKey);
    }
    return client;
}
