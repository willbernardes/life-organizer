"use client";

import { TestTube, Upload, Download, FileText } from "lucide-react";

const exames = [
    { name: "Hemograma Completo", date: "15/02/2026", lab: "Laboratório São Lucas", status: "Normal", hasFile: true },
    { name: "Glicemia em Jejum", date: "15/02/2026", lab: "Laboratório São Lucas", status: "Normal", hasFile: true },
    { name: "Colesterol Total e Frações", date: "15/02/2026", lab: "Laboratório São Lucas", status: "Atenção", hasFile: true },
    { name: "Triglicerídeos", date: "15/02/2026", lab: "Laboratório São Lucas", status: "Normal", hasFile: true },
    { name: "TSH e T4 Livre", date: "10/01/2026", lab: "Lab Diagnóstico", status: "Normal", hasFile: true },
    { name: "Eletrocardiograma", date: "05/12/2025", lab: "Hospital Central", status: "Normal", hasFile: true },
];

export default function ExamesPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Exames</h1>
                    <p>Repositório de exames e acompanhamento de resultados</p>
                </div>
                <button className="btn btn-primary" style={{ background: "var(--gradient-amber)" }}>
                    <Upload size={18} /> Upload Exame
                </button>
            </div>

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Histórico de Exames</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Exame</th>
                            <th>Data</th>
                            <th>Laboratório</th>
                            <th>Resultado</th>
                            <th>Arquivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exames.map((e, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{e.name}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{e.date}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{e.lab}</td>
                                <td>
                                    <span className={`badge ${e.status === "Normal" ? "green" : "amber"}`}>{e.status}</span>
                                </td>
                                <td>
                                    {e.hasFile && (
                                        <button style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                            <Download size={14} /> PDF
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
