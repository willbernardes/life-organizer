"use client";

import { BarChart3 } from "lucide-react";

const monthlyData = [
    { month: "Set", entradas: 7200, saidas: 4100 },
    { month: "Out", entradas: 7800, saidas: 4500 },
    { month: "Nov", entradas: 8100, saidas: 3800 },
    { month: "Dez", entradas: 9500, saidas: 6200 },
    { month: "Jan", entradas: 7600, saidas: 4300 },
    { month: "Fev", entradas: 8500, saidas: 4230 },
];

const categoryBreakdown = [
    { category: "Moradia", value: "R$ 1.800,00", pct: 42 },
    { category: "Alimentação", value: "R$ 680,00", pct: 16 },
    { category: "Transporte", value: "R$ 250,00", pct: 6 },
    { category: "Utilidades", value: "R$ 330,00", pct: 8 },
    { category: "Saúde", value: "R$ 89,90", pct: 2 },
    { category: "Lazer", value: "R$ 44,90", pct: 1 },
];

const barColors = ["var(--accent-blue)", "var(--accent-rose)"];

export default function RelatoriosPage() {
    const maxVal = Math.max(...monthlyData.flatMap((d) => [d.entradas, d.saidas]));

    return (
        <>
            <div className="page-header">
                <h1>Relatórios Financeiros</h1>
                <p>Análise detalhada das suas finanças</p>
            </div>

            <div className="data-grid" style={{ marginBottom: 32 }}>
                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 24 }}>
                        Entradas vs Saídas (Últimos 6 meses)
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {monthlyData.map((d) => (
                            <div key={d.month}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: "0.8rem", fontWeight: 500, width: 36 }}>{d.month}</span>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                        Saldo: R$ {((d.entradas - d.saidas) / 1000).toFixed(1)}k
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: 4 }}>
                                    <div
                                        style={{
                                            height: 12,
                                            borderRadius: 6,
                                            background: "var(--accent-blue)",
                                            width: `${(d.entradas / maxVal) * 100}%`,
                                            transition: "width 0.4s ease",
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                                    <div
                                        style={{
                                            height: 12,
                                            borderRadius: 6,
                                            background: "var(--accent-rose)",
                                            width: `${(d.saidas / maxVal) * 100}%`,
                                            opacity: 0.7,
                                            transition: "width 0.4s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: "var(--accent-blue)" }} />
                                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Entradas</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: "var(--accent-rose)" }} />
                                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Saídas</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 24 }}>
                        Despesas por Categoria
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {categoryBreakdown.map((c) => (
                            <div key={c.category}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{c.category}</span>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{c.value} ({c.pct}%)</span>
                                </div>
                                <div style={{
                                    height: 8,
                                    borderRadius: 4,
                                    background: "var(--bg-secondary)",
                                    overflow: "hidden",
                                }}>
                                    <div
                                        style={{
                                            height: "100%",
                                            width: `${c.pct}%`,
                                            borderRadius: 4,
                                            background: "var(--gradient-blue)",
                                            transition: "width 0.4s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
