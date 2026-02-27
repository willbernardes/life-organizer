export type FamilyMemberRole = "owner" | "spouse" | "child" | "other";

export interface Profile {
    id: string;
    full_name: string;
    phone: string | null;
    avatar_url: string | null;
    onboarding_completed: boolean;
    active_family_id: string | null;
}

export interface Family {
    id: string;
    name: string;
    created_by: string;
    created_at: string;
}

export interface FamilyMember {
    id: string;
    family_id: string;
    user_id: string | null;
    name: string;
    role: FamilyMemberRole;
    is_financial_contributor: boolean;
    avatar_url: string | null;
    birth_date: string | null;
    created_at: string;
}

export interface FamilyInvite {
    id: string;
    family_id: string;
    invite_code: string;
    role: FamilyMemberRole;
    member_id: string;
    accepted_at: string | null;
    expires_at: string;
}
