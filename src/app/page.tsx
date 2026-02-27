"use client";

import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  FolderOpen,
  Heart,
  Receipt,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  Pill,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Saldo Total",
    value: "R$ 12.450,00",
    trend: "+8.2% este mês",
    trendDir: "up",
    icon: Wallet,
    color: "blue",
  },
  {
    label: "Entradas (Mês)",
    value: "R$ 8.500,00",
    trend: "+12% vs mês anterior",
    trendDir: "up",
    icon: TrendingUp,
    color: "emerald",
  },
  {
    label: "Saídas (Mês)",
    value: "R$ 4.230,00",
    trend: "-3% vs mês anterior",
    trendDir: "down",
    icon: TrendingDown,
    color: "rose",
  },
  {
    label: "Documentos",
    value: "24",
    trend: "3 vencem em breve",
    trendDir: "up",
    icon: FolderOpen,
    color: "amber",
  },
  {
    label: "Consultas Pendentes",
    value: "2",
    trend: "Próxima em 5 dias",
    trendDir: "up",
    icon: Heart,
    color: "purple",
  },
  {
    label: "Notas Fiscais",
    value: "48",
    trend: "6 garantias ativas",
    trendDir: "up",
    icon: Receipt,
    color: "cyan",
  },
];

const quickActions = [
  {
    href: "/financeiro/entradas",
    label: "Nova Entrada",
    desc: "Registrar receita",
    icon: ArrowUpCircle,
    gradient: "var(--gradient-emerald)",
  },
  {
    href: "/financeiro/saidas",
    label: "Nova Saída",
    desc: "Registrar despesa",
    icon: ArrowDownCircle,
    gradient: "var(--gradient-rose)",
  },
  {
    href: "/documentos",
    label: "Adicionar Documento",
    desc: "Salvar no cofre",
    icon: FileText,
    gradient: "var(--gradient-amber)",
  },
  {
    href: "/saude/medicamentos",
    label: "Medicamento",
    desc: "Cadastrar remédio",
    icon: Pill,
    gradient: "var(--gradient-blue)",
  },
];

const recentTransactions = [
  { desc: "Salário", date: "25/02/2026", value: "R$ 5.500,00", type: "entrada" },
  { desc: "Aluguel", date: "23/02/2026", value: "R$ 1.800,00", type: "saida" },
  { desc: "Freelance", date: "20/02/2026", value: "R$ 3.000,00", type: "entrada" },
  { desc: "Supermercado", date: "19/02/2026", value: "R$ 680,00", type: "saida" },
  { desc: "Energia Elétrica", date: "18/02/2026", value: "R$ 210,00", type: "saida" },
];

const upcomingAlerts = [
  { label: "CNH vence em 30 dias", type: "amber" },
  { label: "Consulta Dermatologista — 03/03", type: "purple" },
  { label: "Garantia Notebook — vence 15/04", type: "blue" },
];

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao seu organizador pessoal</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>
              <s.icon size={24} />
            </div>
            <div className="stat-info">
              <h3>{s.label}</h3>
              <div className="value">{s.value}</div>
              <div className={`trend ${s.trendDir}`}>{s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>
          Ações Rápidas
        </h2>
        <div className="quick-actions">
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href} className="quick-action-card">
              <div
                className="quick-action-icon"
                style={{ background: a.gradient }}
              >
                <a.icon size={26} color="white" />
              </div>
              <h3>{a.label}</h3>
              <p>{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent & Alerts */}
      <div className="data-grid">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: "1.05rem", fontWeight: 600 }}>
              Transações Recentes
            </h2>
            <Link
              href="/financeiro"
              style={{ fontSize: "0.8rem", color: "var(--accent-blue)" }}
            >
              Ver todas →
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.desc}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{t.date}</td>
                  <td>
                    <span
                      className={`badge ${t.type === "entrada" ? "green" : "red"}`}
                    >
                      {t.type === "entrada" ? "+" : "-"} {t.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2
            style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 20 }}
          >
            Alertas & Lembretes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {upcomingAlerts.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      a.type === "amber"
                        ? "var(--accent-amber)"
                        : a.type === "purple"
                          ? "var(--accent-purple)"
                          : "var(--accent-blue)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.875rem" }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
