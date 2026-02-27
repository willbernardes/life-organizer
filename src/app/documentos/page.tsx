"use client";

import {
    FolderOpen,
    FileText,
    Car,
    Home,
    User,
    Upload,
    AlertTriangle,
} from "lucide-react";

const categories = [
    { name: "Pessoal", icon: User, count: 8, color: "blue", gradient: "var(--gradient-blue)" },
    { name: "Veículo", icon: Car, count: 5, color: "amber", gradient: "var(--gradient-amber)" },
    { name: "Imóvel", icon: Home, count: 6, color: "emerald", gradient: "var(--gradient-emerald)" },
    { name: "Outros", icon: FileText, count: 5, color: "purple", gradient: "var(--gradient-rose)" },
];

const alerts = [
    { doc: "CNH", expiry: "28/03/2026", daysLeft: 30 },
    { doc: "Passaporte", expiry: "15/06/2026", daysLeft: 109 },
];

const recentDocs = [
    { name: "RG Frente e Verso.pdf", category: "Pessoal", date: "20/02/2026", size: "2.4 MB" },
    { name: "CNH Digital.pdf", category: "Pessoal", date: "18/02/2026", size: "1.1 MB" },
    { name: "CRLV 2026.pdf", category: "Veículo", date: "15/02/2026", size: "890 KB" },
    { name: "Contrato Aluguel.pdf", category: "Imóvel", date: "10/02/2026", size: "3.2 MB" },
    { name: "Certidão Nascimento.pdf", category: "Pessoal", date: "05/02/2026", size: "1.8 MB" },
];

export default function DocumentosPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Cofre Digital</h1>
                    <p>Armazene e organize seus documentos com segurança</p>
                </div>
                <button className="btn btn-primary">
                    <Upload size={18} /> Upload Documento
                </button>
            </div>

            {/* Categories */}
            <div className="quick-actions" style={{ marginBottom: 32 }}>
                {categories.map((c) => (
                    <div key={c.name} className="quick-action-card">
                        <div className="quick-action-icon" style={{ background: c.gradient }}>
                            <c.icon size={26} color="white" />
                        </div>
                        <h3>{c.name}</h3>
                        <p>{c.count} documentos</p>
                    </div>
                ))}
            </div>

            <div className="data-grid">
                {/* Alerts */}
                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                        <AlertTriangle size={18} color="var(--accent-amber)" /> Vencimentos Próximos
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {alerts.map((a, i) => (
                            <div key={i} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "14px 16px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{a.doc}</div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Vence em {a.expiry}</div>
                                </div>
                                <span className={`badge ${a.daysLeft <= 30 ? "amber" : "green"}`}>
                                    {a.daysLeft} dias
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent */}
                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 20 }}>Documentos Recentes</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {recentDocs.map((d, i) => (
                            <div key={i} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "12px 16px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <FileText size={18} color="var(--accent-blue)" />
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{d.name}</div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.category} · {d.size}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
