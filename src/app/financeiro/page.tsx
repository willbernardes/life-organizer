"use client";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    ArrowUpCircle,
    ArrowDownCircle,
    Plus,
} from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Saldo Atual", value: "R$ 12.450,00", icon: Wallet, color: "blue" },
    { label: "Entradas (mês)", value: "R$ 8.500,00", icon: TrendingUp, color: "emerald" },
    { label: "Saídas (mês)", value: "R$ 4.230,00", icon: TrendingDown, color: "rose" },
    { label: "Economia", value: "R$ 4.270,00", icon: PiggyBank, color: "amber" },
];

const transactions = [
    { desc: "Salário", category: "Renda", date: "25/02/2026", value: "R$ 5.500,00", type: "entrada" },
    { desc: "Freelance Design", category: "Renda Extra", date: "20/02/2026", value: "R$ 3.000,00", type: "entrada" },
    { desc: "Aluguel", category: "Moradia", date: "23/02/2026", value: "R$ 1.800,00", type: "saida" },
    { desc: "Supermercado", category: "Alimentação", date: "19/02/2026", value: "R$ 680,00", type: "saida" },
    { desc: "Energia Elétrica", category: "Utilidades", date: "18/02/2026", value: "R$ 210,00", type: "saida" },
    { desc: "Internet", category: "Utilidades", date: "15/02/2026", value: "R$ 120,00", type: "saida" },
    { desc: "Academia", category: "Saúde", date: "10/02/2026", value: "R$ 89,90", type: "saida" },
    { desc: "Streaming", category: "Lazer", date: "08/02/2026", value: "R$ 44,90", type: "saida" },
];

export default function FinanceiroPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Financeiro</h1>
                    <p>Visão geral das suas finanças pessoais</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <Link href="/financeiro/entradas" className="btn btn-primary">
                        <ArrowUpCircle size={18} /> Nova Entrada
                    </Link>
                    <Link href="/financeiro/saidas" className="btn btn-secondary">
                        <ArrowDownCircle size={18} /> Nova Saída
                    </Link>
                </div>
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

            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Todas as Transações</h2>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                            Filtrar
                        </button>
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{t.desc}</td>
                                <td><span className="badge blue">{t.category}</span></td>
                                <td style={{ color: "var(--text-secondary)" }}>{t.date}</td>
                                <td style={{ fontWeight: 600 }}>{t.value}</td>
                                <td>
                                    <span className={`badge ${t.type === "entrada" ? "green" : "red"}`}>
                                        {t.type === "entrada" ? "Entrada" : "Saída"}
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
