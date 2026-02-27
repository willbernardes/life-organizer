"use client";

import { Settings, User, Palette, Bell, Shield, Database } from "lucide-react";

const sections = [
    { icon: User, label: "Perfil", desc: "Nome, email e foto" },
    { icon: Palette, label: "Aparência", desc: "Tema e personalização" },
    { icon: Bell, label: "Notificações", desc: "Alertas e lembretes" },
    { icon: Shield, label: "Segurança", desc: "Senha e autenticação" },
    { icon: Database, label: "Dados", desc: "Backup e exportação" },
];

export default function ConfiguracoesPage() {
    return (
        <>
            <div className="page-header">
                <h1>Configurações</h1>
                <p>Personalize seu organizador</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
                {sections.map((s, i) => (
                    <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                        <div className="stat-icon blue">
                            <s.icon size={22} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{s.label}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
