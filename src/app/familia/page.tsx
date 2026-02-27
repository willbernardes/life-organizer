"use client";

import { useAuth } from "@/components/AuthProvider";
import {
    Users,
    UserPlus,
    Copy,
    Check,
    Crown,
    Heart,
    Baby,
    User,
    Wallet,
    Plus,
    Trash2,
    Link2,
} from "lucide-react";
import { useState } from "react";
import type { FamilyMemberRole } from "@/lib/types";
import { createClient } from "@/lib/supabase";

const roleIcons: Record<FamilyMemberRole, typeof Crown> = {
    owner: Crown,
    spouse: Heart,
    child: Baby,
    other: User,
};

const roleLabels: Record<FamilyMemberRole, string> = {
    owner: "Titular",
    spouse: "Cônjuge",
    child: "Filho(a)",
    other: "Outro",
};

const roleColors: Record<FamilyMemberRole, string> = {
    owner: "blue",
    spouse: "purple",
    child: "amber",
    other: "green",
};

export default function FamiliaPage() {
    const { family, familyMembers, refreshProfile } = useAuth();
    const [copied, setCopied] = useState(false);
    const [inviteCode, setInviteCode] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    // Adding new member
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState<FamilyMemberRole>("child");
    const [adding, setAdding] = useState(false);

    const generateInvite = async () => {
        if (!family) return;
        setGenerating(true);
        try {
            const supabase = createClient();
            const code = Math.random().toString(36).substring(2, 10).toUpperCase();
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);

            await supabase.from("family_invites").insert({
                family_id: family.id,
                invite_code: code,
                role: "spouse",
                expires_at: expires.toISOString(),
            });

            setInviteCode(code);
        } catch (err) {
            console.error(err);
        } finally {
            setGenerating(false);
        }
    };

    const copyInvite = () => {
        if (!inviteCode) return;
        const url = `${window.location.origin}/invite/${inviteCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const addMember = async () => {
        if (!family || !newName.trim()) return;
        setAdding(true);
        try {
            const supabase = createClient();
            await supabase.from("family_members").insert({
                family_id: family.id,
                name: newName,
                role: newRole,
                is_financial_contributor: false,
            });
            setNewName("");
            setShowAdd(false);
            await refreshProfile();
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const removeMember = async (memberId: string) => {
        const supabase = createClient();
        await supabase.from("family_members").delete().eq("id", memberId);
        await refreshProfile();
    };

    const contributors = familyMembers.filter((m) => m.is_financial_contributor);

    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Minha Família</h1>
                    <p>{family?.name || "Configure sua família"}</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setShowAdd(true)} className="btn btn-primary">
                        <UserPlus size={18} /> Adicionar Membro
                    </button>
                    <button onClick={generateInvite} className="btn btn-secondary" disabled={generating}>
                        <Link2 size={18} /> {generating ? "Gerando..." : "Convidar"}
                    </button>
                </div>
            </div>

            {/* Invite Code */}
            {inviteCode && (
                <div style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <div>
                        <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>Link de Convite Gerado!</p>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            Compartilhe este link com seu familiar para ele entrar na família:
                        </p>
                        <code style={{
                            fontSize: "0.8rem",
                            color: "var(--accent-blue)",
                            background: "var(--bg-card)",
                            padding: "4px 8px",
                            borderRadius: 4,
                            marginTop: 4,
                            display: "inline-block",
                        }}>
                            {window.location.origin}/invite/{inviteCode}
                        </code>
                    </div>
                    <button onClick={copyInvite} className="btn btn-secondary" style={{ padding: "8px 14px" }}>
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copiado!" : "Copiar"}
                    </button>
                </div>
            )}

            {/* Add Member Modal */}
            {showAdd && (
                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16 }}>Adicionar Membro</h3>
                    <div style={{ display: "flex", gap: 12, alignItems: "end" }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Nome</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Nome do membro"
                                style={{
                                    width: "100%",
                                    padding: "10px 14px",
                                    borderRadius: 8,
                                    border: "1px solid var(--border-color)",
                                    background: "var(--bg-secondary)",
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                    outline: "none",
                                    fontFamily: "inherit",
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Papel</label>
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value as FamilyMemberRole)}
                                style={{
                                    width: "100%",
                                    padding: "10px 14px",
                                    borderRadius: 8,
                                    border: "1px solid var(--border-color)",
                                    background: "var(--bg-secondary)",
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                    outline: "none",
                                    fontFamily: "inherit",
                                }}
                            >
                                <option value="spouse">Cônjuge</option>
                                <option value="child">Filho(a)</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>
                        <button onClick={addMember} className="btn btn-primary" disabled={adding} style={{ marginBottom: 0 }}>
                            {adding ? "..." : <Plus size={16} />}
                        </button>
                        <button onClick={() => setShowAdd(false)} className="btn btn-secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="stat-card">
                    <div className="stat-icon blue"><Users size={24} /></div>
                    <div className="stat-info">
                        <h3>Membros</h3>
                        <div className="value">{familyMembers.length || "—"}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon emerald"><Wallet size={24} /></div>
                    <div className="stat-info">
                        <h3>Contribuidores</h3>
                        <div className="value">{contributors.length || "—"}</div>
                    </div>
                </div>
            </div>

            {/* Members List */}
            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Membros da Família</h2>

                {familyMembers.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {familyMembers.map((m) => {
                            const Icon = roleIcons[m.role] || User;
                            return (
                                <div key={m.id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "14px 16px",
                                    borderRadius: 12,
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border-color)",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <div className={`stat-icon ${roleColors[m.role]}`} style={{ width: 40, height: 40, borderRadius: 10 }}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{m.name}</div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                                {roleLabels[m.role]}
                                                {m.user_id && " · Conta vinculada ✓"}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        {m.is_financial_contributor && (
                                            <span className="badge green" style={{ fontSize: "0.7rem" }}>💰 Contribui</span>
                                        )}
                                        {m.role !== "owner" && (
                                            <button
                                                onClick={() => removeMember(m.id)}
                                                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <Users size={28} color="var(--text-muted)" />
                        </div>
                        <h3>Nenhum membro cadastrado</h3>
                        <p>Complete o onboarding ou adicione membros manualmente.</p>
                    </div>
                )}
            </div>
        </>
    );
}
