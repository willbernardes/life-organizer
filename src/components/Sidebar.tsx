"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3,
  FolderOpen,
  FileText,
  Heart,
  Pill,
  TestTube,
  Receipt,
  ShieldCheck,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

const navSections = [
  {
    title: "Geral",
    links: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Financeiro",
    links: [
      { href: "/financeiro", label: "Visão Geral", icon: Wallet },
      { href: "/financeiro/entradas", label: "Entradas", icon: ArrowUpCircle },
      { href: "/financeiro/saidas", label: "Saídas", icon: ArrowDownCircle },
      { href: "/financeiro/relatorios", label: "Relatórios", icon: BarChart3 },
    ],
  },
  {
    title: "Documentos",
    links: [
      { href: "/documentos", label: "Cofre Digital", icon: FolderOpen },
      { href: "/documentos/todos", label: "Todos os Documentos", icon: FileText },
    ],
  },
  {
    title: "Saúde",
    links: [
      { href: "/saude", label: "Painel Médico", icon: Heart },
      { href: "/saude/medicamentos", label: "Medicamentos", icon: Pill },
      { href: "/saude/exames", label: "Exames", icon: TestTube },
    ],
  },
  {
    title: "Notas Fiscais",
    links: [
      { href: "/notas-fiscais", label: "Repositório", icon: Receipt },
      { href: "/notas-fiscais/garantias", label: "Garantias", icon: ShieldCheck },
      { href: "/notas-fiscais/buscar", label: "Buscar NF", icon: Search },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Sparkles size={22} color="white" />
        </div>
        <h1>Life Organizer</h1>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="sidebar-section-title">{section.title}</div>
            {section.links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <link.icon className="sidebar-link-icon" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border-color)" }}>
        <Link href="/configuracoes" className="sidebar-link">
          <Settings className="sidebar-link-icon" />
          <span>Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
