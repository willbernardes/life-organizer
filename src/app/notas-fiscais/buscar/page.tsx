"use client";

import { Search, FileText, Download } from "lucide-react";
import { useState } from "react";

const allNotas = [
    { loja: "Magazine Luiza", produto: "Notebook Dell", date: "10/02/2026", value: "R$ 4.200,00", tipo: "Eletrônico" },
    { loja: "Casas Bahia", produto: "Geladeira Brastemp", date: "05/01/2026", value: "R$ 3.100,00", tipo: "Eletrodoméstico" },
    { loja: "Amazon", produto: "Monitor 27\" LG", date: "20/12/2025", value: "R$ 1.800,00", tipo: "Eletrônico" },
    { loja: "Apple Store", produto: "iPhone 15 Pro", date: "15/09/2025", value: "R$ 8.999,00", tipo: "Eletrônico" },
    { loja: "Renner", produto: "Roupas diversas", date: "15/12/2025", value: "R$ 450,00", tipo: "Vestuário" },
    { loja: "Drogaria São Paulo", produto: "Medicamentos", date: "10/12/2025", value: "R$ 185,00", tipo: "Saúde" },
    { loja: "Posto Shell", produto: "Combustível", date: "05/12/2025", value: "R$ 250,00", tipo: "Transporte" },
    { loja: "Ponto Frio", produto: "Ar Condicionado Samsung", date: "10/03/2025", value: "R$ 2.800,00", tipo: "Eletrodoméstico" },
];

export default function BuscarNFPage() {
    const [query, setQuery] = useState("");

    const filtered = allNotas.filter(
        (n) =>
            n.loja.toLowerCase().includes(query.toLowerCase()) ||
            n.produto.toLowerCase().includes(query.toLowerCase()) ||
            n.tipo.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className="page-header">
                <h1>Buscar Nota Fiscal</h1>
                <p>Pesquise por loja, produto ou valor</p>
            </div>

            <div style={{ marginBottom: 24, display: "flex", gap: 12 }}>
                <div style={{
                    flex: 1, display: "flex", alignItems: "center", gap: 8,
                    background: "var(--bg-card)", border: "1px solid var(--border-color)",
                    borderRadius: 10, padding: "10px 16px",
                }}>
                    <Search size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por loja, produto ou tipo..."
                        style={{
                            background: "none", border: "none", color: "var(--text-primary)",
                            fontSize: "0.875rem", outline: "none", width: "100%",
                        }}
                    />
                </div>
            </div>

            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                    </h2>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Loja</th>
                            <th>Produto</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((n, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{n.loja}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{n.produto}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{n.date}</td>
                                <td style={{ fontWeight: 600 }}>{n.value}</td>
                                <td><span className="badge blue">{n.tipo}</span></td>
                                <td>
                                    <button style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}>
                                        <Download size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
