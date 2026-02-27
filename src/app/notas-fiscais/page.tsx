"use client";

import { Receipt, Upload, Plus, FileText, Search } from "lucide-react";

const notas = [
    { loja: "Magazine Luiza", produto: "Notebook Dell", date: "10/02/2026", value: "R$ 4.200,00", tipo: "Eletrônico" },
    { loja: "Casas Bahia", produto: "Geladeira Brastemp", date: "05/01/2026", value: "R$ 3.100,00", tipo: "Eletrodoméstico" },
    { loja: "Amazon", produto: "Monitor 27\" LG", date: "20/12/2025", value: "R$ 1.800,00", tipo: "Eletrônico" },
    { loja: "Renner", produto: "Roupas diversas", date: "15/12/2025", value: "R$ 450,00", tipo: "Vestuário" },
    { loja: "Drogaria São Paulo", produto: "Medicamentos", date: "10/12/2025", value: "R$ 185,00", tipo: "Saúde" },
    { loja: "Posto Shell", produto: "Combustível", date: "05/12/2025", value: "R$ 250,00", tipo: "Transporte" },
];

const stats = [
    { label: "Total de NFs", value: "48", icon: Receipt, color: "blue" },
    { label: "Este Mês", value: "6", icon: FileText, color: "emerald" },
    { label: "Valor Total (Mês)", value: "R$ 4.650", icon: Receipt, color: "amber" },
];

export default function NotasFiscaisPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Notas Fiscais</h1>
                    <p>Repositório de notas fiscais para garantias e comprovação</p>
                </div>
                <button className="btn btn-primary">
                    <Upload size={18} /> Upload NF
                </button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
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

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Notas Fiscais Recentes</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Loja</th>
                            <th>Produto</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((n, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{n.loja}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{n.produto}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{n.date}</td>
                                <td style={{ fontWeight: 600 }}>{n.value}</td>
                                <td><span className="badge blue">{n.tipo}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
