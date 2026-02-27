"use client";

import { ArrowUpCircle, Plus } from "lucide-react";

const entradas = [
    { desc: "Salário", category: "Renda Fixa", date: "25/02/2026", value: "R$ 5.500,00", recorrente: true },
    { desc: "Freelance Design", category: "Renda Extra", date: "20/02/2026", value: "R$ 3.000,00", recorrente: false },
    { desc: "Dividendos", category: "Investimentos", date: "15/02/2026", value: "R$ 420,00", recorrente: true },
    { desc: "Venda Marketplace", category: "Renda Extra", date: "10/02/2026", value: "R$ 850,00", recorrente: false },
];

export default function EntradasPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Entradas</h1>
                    <p>Gerencie todas as suas fontes de receita</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> Nova Entrada
                </button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="stat-card">
                    <div className="stat-icon emerald"><ArrowUpCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Entradas (Mês)</h3>
                        <div className="value">R$ 9.770,00</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><ArrowUpCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Renda Fixa</h3>
                        <div className="value">R$ 5.920,00</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><ArrowUpCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Renda Variável</h3>
                        <div className="value">R$ 3.850,00</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Todas as Entradas</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Recorrente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entradas.map((e, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{e.desc}</td>
                                <td><span className="badge blue">{e.category}</span></td>
                                <td style={{ color: "var(--text-secondary)" }}>{e.date}</td>
                                <td style={{ fontWeight: 600, color: "var(--accent-emerald)" }}>+ {e.value}</td>
                                <td>
                                    <span className={`badge ${e.recorrente ? "green" : "amber"}`}>
                                        {e.recorrente ? "Sim" : "Não"}
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
