"use client";

import {
    Heart,
    Calendar,
    Pill,
    TestTube,
    Syringe,
    Plus,
    Clock,
} from "lucide-react";

const stats = [
    { label: "Consultas (ano)", value: "12", icon: Calendar, color: "blue" },
    { label: "Medicamentos Ativos", value: "3", icon: Pill, color: "emerald" },
    { label: "Exames Recentes", value: "5", icon: TestTube, color: "amber" },
    { label: "Vacinas em Dia", value: "8", icon: Syringe, color: "purple" },
];

const upcomingConsults = [
    { doctor: "Dr. Carlos — Cardiologista", date: "03/03/2026", time: "14:00", status: "Confirmada" },
    { doctor: "Dra. Ana — Dermatologista", date: "10/03/2026", time: "10:30", status: "Pendente" },
];

const recentExams = [
    { name: "Hemograma Completo", date: "15/02/2026", status: "Normal" },
    { name: "Glicemia em Jejum", date: "15/02/2026", status: "Normal" },
    { name: "Colesterol Total", date: "15/02/2026", status: "Atenção" },
    { name: "Triglicerídeos", date: "15/02/2026", status: "Normal" },
];

export default function SaudePage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Painel Médico</h1>
                    <p>Acompanhe sua saúde em um só lugar</p>
                </div>
                <button className="btn btn-primary" style={{ background: "var(--gradient-emerald)" }}>
                    <Plus size={18} /> Agendar Consulta
                </button>
            </div>

            <div className="stats-grid">
                {stats.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <div className={`stat-icon ${s.color}`}>
                            <s.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{s.label}</h3>
                            <div className="value">{s.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="data-grid">
                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                        <Clock size={18} color="var(--accent-blue)" /> Próximas Consultas
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {upcomingConsults.map((c, i) => (
                            <div key={i} style={{
                                padding: "16px", borderRadius: 12, background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.doctor}</span>
                                    <span className={`badge ${c.status === "Confirmada" ? "green" : "amber"}`}>{c.status}</span>
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                    📅 {c.date} às {c.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                        <TestTube size={18} color="var(--accent-amber)" /> Resultados Recentes
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {recentExams.map((e, i) => (
                            <div key={i} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "12px 16px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                            }}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{e.name}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{e.date}</div>
                                </div>
                                <span className={`badge ${e.status === "Normal" ? "green" : "amber"}`}>{e.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
