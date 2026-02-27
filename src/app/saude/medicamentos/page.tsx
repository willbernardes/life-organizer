"use client";

import { Pill, Plus, Clock, AlertCircle } from "lucide-react";

const medicamentos = [
    { name: "Losartana 50mg", freq: "1x ao dia", horario: "08:00", status: "Ativo", tipo: "Uso contínuo" },
    { name: "Vitamina D 2000UI", freq: "1x ao dia", horario: "08:00", status: "Ativo", tipo: "Suplemento" },
    { name: "Omega 3 1000mg", freq: "1x ao dia", horario: "12:00", status: "Ativo", tipo: "Suplemento" },
    { name: "Amoxicilina 500mg", freq: "3x ao dia", horario: "08:00 / 14:00 / 20:00", status: "Finalizado", tipo: "Antibiótico" },
];

export default function MedicamentosPage() {
    return (
        <>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Medicamentos</h1>
                    <p>Gerencie seus medicamentos e horários de uso</p>
                </div>
                <button className="btn btn-primary" style={{ background: "var(--gradient-emerald)" }}>
                    <Plus size={18} /> Novo Medicamento
                </button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="stat-card">
                    <div className="stat-icon emerald"><Pill size={24} /></div>
                    <div className="stat-info">
                        <h3>Ativos</h3>
                        <div className="value">3</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><Clock size={24} /></div>
                    <div className="stat-info">
                        <h3>Próxima Dose</h3>
                        <div className="value">12:00</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><AlertCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>Finalizados</h3>
                        <div className="value">1</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20 }}>Todos os Medicamentos</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Tipo</th>
                            <th>Frequência</th>
                            <th>Horário</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicamentos.map((m, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{m.name}</td>
                                <td><span className="badge blue">{m.tipo}</span></td>
                                <td style={{ color: "var(--text-secondary)" }}>{m.freq}</td>
                                <td style={{ color: "var(--text-secondary)" }}>{m.horario}</td>
                                <td>
                                    <span className={`badge ${m.status === "Ativo" ? "green" : "amber"}`}>{m.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
