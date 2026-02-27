"use client";

import { FileText, Download, Eye, Search } from "lucide-react";

const allDocs = [
    { name: "RG Frente e Verso.pdf", category: "Pessoal", date: "20/02/2026", size: "2.4 MB" },
    { name: "CPF Digital.pdf", category: "Pessoal", date: "20/02/2026", size: "320 KB" },
    { name: "CNH Digital.pdf", category: "Pessoal", date: "18/02/2026", size: "1.1 MB" },
    { name: "Certidão Nascimento.pdf", category: "Pessoal", date: "05/02/2026", size: "1.8 MB" },
    { name: "Título de Eleitor.pdf", category: "Pessoal", date: "01/02/2026", size: "450 KB" },
    { name: "Passaporte.pdf", category: "Pessoal", date: "01/01/2026", size: "2.1 MB" },
    { name: "CRLV 2026.pdf", category: "Veículo", date: "15/02/2026", size: "890 KB" },
    { name: "Seguro Auto.pdf", category: "Veículo", date: "10/01/2026", size: "1.5 MB" },
    { name: "Contrato Aluguel.pdf", category: "Imóvel", date: "10/02/2026", size: "3.2 MB" },
    { name: "IPTU 2026.pdf", category: "Imóvel", date: "05/01/2026", size: "640 KB" },
];

export default function TodosDocumentosPage() {
    return (
        <>
            <div className="page-header">
                <h1>Todos os Documentos</h1>
                <p>Pesquise e gerencie todos os seus documentos armazenados</p>
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
                        placeholder="Buscar documentos..."
                        style={{
                            background: "none", border: "none", color: "var(--text-primary)",
                            fontSize: "0.875rem", outline: "none", width: "100%",
                        }}
                    />
                </div>
                <button className="btn btn-secondary">Filtrar</button>
            </div>

            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Tamanho</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allDocs.map((d, i) => (
                            <tr key={i}>
                                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <FileText size={16} color="var(--accent-blue)" />
                                    <span style={{ fontWeight: 500 }}>{d.name}</span>
                                </td>
                                <td><span className="badge blue">{d.category}</span></td>
                                <td style={{ color: "var(--text-secondary)" }}>{d.date}</td>
                                <td style={{ color: "var(--text-muted)" }}>{d.size}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}>
                                            <Eye size={16} />
                                        </button>
                                        <button style={{ background: "none", border: "none", color: "var(--accent-emerald)", cursor: "pointer" }}>
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
