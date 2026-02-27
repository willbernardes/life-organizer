"use client";

import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";

const garantias = [
    { produto: "Notebook Dell Inspiron 15", loja: "Magazine Luiza", compra: "10/02/2026", vencimento: "10/02/2027", status: "Ativa", dias: 347 },
    { produto: "Geladeira Brastemp Frost Free", loja: "Casas Bahia", compra: "05/01/2026", vencimento: "05/01/2027", status: "Ativa", dias: 312 },
    { produto: "Monitor 27\" LG 4K", loja: "Amazon", compra: "20/12/2025", vencimento: "20/12/2026", status: "Ativa", dias: 296 },
    { produto: "iPhone 15 Pro", loja: "Apple Store", compra: "15/09/2025", vencimento: "15/09/2026", status: "Ativa", dias: 200 },
    { produto: "Ar Condicionado Samsung", loja: "Ponto Frio", compra: "10/03/2025", vencimento: "10/03/2026", status: "Vencendo", dias: 12 },
    { produto: "Headphone Sony WH-1000XM5", loja: "Amazon", compra: "01/01/2025", vencimento: "01/01/2026", status: "Expirada", dias: 0 },
];

export default function GarantiasPage() {
    return (
        <>
            <div className="page-header">
                <h1>Garantias</h1>
                <p>Acompanhe os prazos de garantia dos seus produtos</p>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="stat-card">
                    <div className="stat-icon emerald"><CheckCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Garantias Ativas</h3>
                        <div className="value">4</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><AlertTriangle size={24} /></div>
                    <div className="stat-info">
                        <h3>Vencendo em Breve</h3>
                        <div className="value">1</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon rose"><ShieldCheck size={24} /></div>
                    <div className="stat-info">
                        <h3>Expiradas</h3>
                        <div className="value">1</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Todas as Garantias</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Loja</th>
                            <th>Compra</th>
                            <th>Vencimento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garantias.map((g, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{g.produto}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{g.loja}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{g.compra}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{g.vencimento}</td>
                                <td>
                                    <span className={`badge ${g.status === "Ativa" ? "green" : g.status === "Vencendo" ? "amber" : "red"}`}>
                                        {g.status === "Ativa" ? `${g.dias} dias` : g.status}
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
