"use client";

import { ArrowDownCircle, Plus } from "lucide-react";

const saidas = [
    { desc: "Aluguel", category: "Moradia", date: "23/02/2026", value: "R$ 1.800,00", fixa: true },
    { desc: "Supermercado", category: "Alimentação", date: "19/02/2026", value: "R$ 680,00", fixa: false },
    { desc: "Energia Elétrica", category: "Utilidades", date: "18/02/2026", value: "R$ 210,00", fixa: true },
    { desc: "Internet", category: "Utilidades", date: "15/02/2026", value: "R$ 120,00", fixa: true },
    { desc: "Academia", category: "Saúde", date: "10/02/2026", value: "R$ 89,90", fixa: true },
    { desc: "Streaming", category: "Lazer", date: "08/02/2026", value: "R$ 44,90", fixa: true },
    { desc: "Combustível", category: "Transporte", date: "05/02/2026", value: "R$ 250,00", fixa: false },
];

export default function SaidasPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Saídas</h1>
                    <p>Controle todas as suas despesas</p>
                </div>
                <button className="btn btn-primary" style={{ background: "var(--gradient-rose)" }}>
                    <Plus size={18} /> Nova Saída
                </button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="stat-card">
                    <div className="stat-icon rose"><ArrowDownCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Saídas (Mês)</h3>
                        <div className="value">R$ 3.194,80</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><ArrowDownCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Despesas Fixas</h3>
                        <div className="value">R$ 2.264,80</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple"><ArrowDownCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Despesas Variáveis</h3>
                        <div className="value">R$ 930,00</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Todas as Saídas</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Fixa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saidas.map((s, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{s.desc}</td>
                                <td><span className="badge blue">{s.category}</span></td>
                                <td style={{ color: "var(--text-secondary)" }}>{s.date}</td>
                                <td style={{ fontWeight: 600, color: "var(--accent-rose)" }}>- {s.value}</td>
                                <td>
                                    <span className={`badge ${s.fixa ? "green" : "amber"}`}>
                                        {s.fixa ? "Fixa" : "Variável"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
