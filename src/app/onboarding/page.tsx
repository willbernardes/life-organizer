"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
    Sparkles,
    User,
    Users,
    UserPlus,
    Wallet,
    ChevronRight,
    ChevronLeft,
    Check,
    Plus,
    Trash2,
} from "lucide-react";
import type { FamilyMemberRole } from "@/lib/types";

interface MemberInput {
    name: string;
    role: FamilyMemberRole;
    birthDate: string;
    isContributor: boolean;
}

const STEPS = [
    { title: "Seu Perfil", icon: User },
    { title: "Sua Família", icon: Users },
    { title: "Membros", icon: UserPlus },
    { title: "Finanças", icon: Wallet },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);

    // Step 1 — Profile
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    // Step 2 — Family setup
    const [familyName, setFamilyName] = useState("");
    const [hasSpouse, setHasSpouse] = useState(false);
    const [childrenCount, setChildrenCount] = useState(0);
    const [othersCount, setOthersCount] = useState(0);

    // Step 3 — Members
    const [members, setMembers] = useState<MemberInput[]>([]);

    // Generate members from step 2
    const generateMembers = () => {
        const m: MemberInput[] = [];
        if (hasSpouse) {
            m.push({ name: "", role: "spouse", birthDate: "", isContributor: false });
        }
        for (let i = 0; i < childrenCount; i++) {
            m.push({ name: "", role: "child", birthDate: "", isContributor: false });
        }
        for (let i = 0; i < othersCount; i++) {
            m.push({ name: "", role: "other", birthDate: "", isContributor: false });
        }
        setMembers(m);
    };

    const updateMember = (idx: number, field: keyof MemberInput, value: string | boolean) => {
        setMembers((prev) =>
            prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
        );
    };

    const removeMember = (idx: number) => {
        setMembers((prev) => prev.filter((_, i) => i !== idx));
    };

    const addMember = () => {
        setMembers((prev) => [
            ...prev,
            { name: "", role: "other", birthDate: "", isContributor: false },
        ]);
    };

    const handleNext = () => {
        if (step === 1) {
            generateMembers();
        }
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };

    const handleBack = () => setStep((s) => Math.max(s - 1, 0));

    const handleFinish = async () => {
        setSaving(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Update profile
            await supabase.from("profiles").upsert({
                id: user.id,
                full_name: fullName || user.user_metadata?.full_name || "",
                phone: phone || null,
                onboarding_completed: true,
            });

            // Create family
            const { data: familyData } = await supabase
                .from("families")
                .insert({ name: familyName || `Família ${fullName.split(" ")[0]}`, created_by: user.id })
                .select()
                .single();

            if (familyData) {
                // Add owner as a member
                await supabase.from("family_members").insert({
                    family_id: familyData.id,
                    user_id: user.id,
                    name: fullName || user.user_metadata?.full_name || "Eu",
                    role: "owner",
                    is_financial_contributor: true,
                });

                // Add other members
                const memberInserts = members
                    .filter((m) => m.name.trim())
                    .map((m) => ({
                        family_id: familyData.id,
                        user_id: null,
                        name: m.name,
                        role: m.role,
                        is_financial_contributor: m.isContributor,
                        birth_date: m.birthDate || null,
                    }));

                if (memberInserts.length > 0) {
                    await supabase.from("family_members").insert(memberInserts);
                }

                // Update profile with active family
                await supabase
                    .from("profiles")
                    .update({ active_family_id: familyData.id, onboarding_completed: true })
                    .eq("id", user.id);
            }

            router.push("/");
        } catch (err) {
            console.error("Onboarding error:", err);
        } finally {
            setSaving(false);
        }
    };

    const roleLabels: Record<FamilyMemberRole, string> = {
        owner: "Titular",
        spouse: "Cônjuge",
        child: "Filho(a)",
        other: "Outro",
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-primary)",
            padding: 20,
        }}>
            <div style={{ width: "100%", maxWidth: 560 }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "var(--gradient-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                    }}>
                        <Sparkles size={28} color="white" />
                    </div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}>
                        Configuração Inicial
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        Vamos preparar seu organizador pessoal
                    </p>
                </div>

                {/* Step Indicator */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 32,
                }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}>
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: i <= step ? "var(--gradient-blue)" : "var(--bg-card)",
                                border: i <= step ? "none" : "1px solid var(--border-color)",
                                transition: "all 0.3s ease",
                            }}>
                                {i < step ? (
                                    <Check size={14} color="white" />
                                ) : (
                                    <s.icon size={14} color={i <= step ? "white" : "var(--text-muted)"} />
                                )}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div style={{
                                    width: 32,
                                    height: 2,
                                    background: i < step ? "var(--accent-blue)" : "var(--border-color)",
                                    borderRadius: 1,
                                    transition: "all 0.3s ease",
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 20,
                    padding: "32px",
                }}>
                    <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 24 }}>
                        {STEPS[step].title}
                    </h2>

                    {/* Step 1: Profile */}
                    {step === 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={labelStyle}>Nome completo</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Seu nome completo"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Telefone</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="(11) 99999-9999"
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Family Setup */}
                    {step === 1 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div>
                                <label style={labelStyle}>Nome da Família</label>
                                <input
                                    type="text"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                    placeholder="Ex: Família Silva"
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "16px",
                                borderRadius: 12,
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border-color)",
                            }}>
                                <span style={{ fontSize: "0.9rem" }}>Você tem cônjuge / parceiro(a)?</span>
                                <button
                                    onClick={() => setHasSpouse(!hasSpouse)}
                                    style={{
                                        padding: "6px 16px",
                                        borderRadius: 8,
                                        border: "none",
                                        background: hasSpouse ? "var(--accent-emerald)" : "var(--bg-card)",
                                        color: hasSpouse ? "white" : "var(--text-secondary)",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {hasSpouse ? "Sim ✓" : "Não"}
                                </button>
                            </div>

                            <div>
                                <label style={labelStyle}>Quantos filhos?</label>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <button
                                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                                        style={counterBtnStyle}
                                    >
                                        −
                                    </button>
                                    <span style={{ fontSize: "1.25rem", fontWeight: 700, minWidth: 30, textAlign: "center" }}>
                                        {childrenCount}
                                    </span>
                                    <button
                                        onClick={() => setChildrenCount(childrenCount + 1)}
                                        style={counterBtnStyle}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Outros membros da casa?</label>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <button
                                        onClick={() => setOthersCount(Math.max(0, othersCount - 1))}
                                        style={counterBtnStyle}
                                    >
                                        −
                                    </button>
                                    <span style={{ fontSize: "1.25rem", fontWeight: 700, minWidth: 30, textAlign: "center" }}>
                                        {othersCount}
                                    </span>
                                    <button
                                        onClick={() => setOthersCount(othersCount + 1)}
                                        style={counterBtnStyle}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Members */}
                    {step === 2 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {members.length === 0 ? (
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textAlign: "center", padding: 20 }}>
                                    Nenhum membro adicionado. Você pode adicionar membros ou pular este passo.
                                </p>
                            ) : (
                                members.map((m, idx) => (
                                    <div key={idx} style={{
                                        padding: 16,
                                        borderRadius: 12,
                                        background: "var(--bg-secondary)",
                                        border: "1px solid var(--border-color)",
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                            <span className="badge blue" style={{ fontSize: "0.7rem" }}>
                                                {roleLabels[m.role]}
                                            </span>
                                            <button onClick={() => removeMember(idx)} style={{ background: "none", border: "none", color: "var(--accent-rose)", cursor: "pointer" }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div style={{ display: "flex", gap: 12 }}>
                                            <input
                                                type="text"
                                                value={m.name}
                                                onChange={(e) => updateMember(idx, "name", e.target.value)}
                                                placeholder="Nome"
                                                style={{ ...inputStyle, flex: 2 }}
                                            />
                                            <input
                                                type="date"
                                                value={m.birthDate}
                                                onChange={(e) => updateMember(idx, "birthDate", e.target.value)}
                                                style={{ ...inputStyle, flex: 1 }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                            <button onClick={addMember} className="btn btn-secondary" style={{ alignSelf: "center" }}>
                                <Plus size={16} /> Adicionar Membro
                            </button>
                        </div>
                    )}

                    {/* Step 4: Financial Contributors */}
                    {step === 3 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                                Selecione quem contribui financeiramente para a casa:
                            </p>

                            {/* Owner (always contributor) */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "14px 16px",
                                borderRadius: 10,
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border-color)",
                            }}>
                                <div>
                                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                                        {fullName || "Você"} <span className="badge green" style={{ fontSize: "0.65rem", marginLeft: 6 }}>Titular</span>
                                    </span>
                                </div>
                                <span className="badge green">Contribui ✓</span>
                            </div>

                            {members.filter((m) => m.name.trim()).map((m, idx) => (
                                <div key={idx} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "14px 16px",
                                    borderRadius: 10,
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border-color)",
                                }}>
                                    <div>
                                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                                            {m.name} <span className="badge blue" style={{ fontSize: "0.65rem", marginLeft: 6 }}>{roleLabels[m.role]}</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => updateMember(idx, "isContributor", !m.isContributor)}
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: 8,
                                            border: "none",
                                            background: m.isContributor ? "var(--accent-emerald)" : "var(--bg-card)",
                                            color: m.isContributor ? "white" : "var(--text-secondary)",
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {m.isContributor ? "Contribui ✓" : "Não contribui"}
                                    </button>
                                </div>
                            ))}

                            {members.filter((m) => m.name.trim()).length === 0 && (
                                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", padding: 16 }}>
                                    Somente você como contribuidor financeiro.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                        {step > 0 ? (
                            <button onClick={handleBack} className="btn btn-secondary">
                                <ChevronLeft size={16} /> Voltar
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < STEPS.length - 1 ? (
                            <button onClick={handleNext} className="btn btn-primary">
                                Próximo <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleFinish}
                                className="btn btn-primary"
                                disabled={saving}
                                style={{ opacity: saving ? 0.6 : 1 }}
                            >
                                {saving ? "Salvando..." : "Concluir"} {!saving && <Check size={16} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
};

const counterBtnStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid var(--border-color)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
