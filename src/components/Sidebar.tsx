"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
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
  Users,
  LogOut,
} from "lucide-react";

const navSections = [
  {
    title: "Geral",
    links: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Família",
    links: [
      { href: "/familia", label: "Minha Família", icon: Users },
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
  const { user, profile, family, signOut } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Sparkles size={22} color="white" />
        </div>
        <h1>Life Organizer</h1>
      </div>

      {/* User & Family info */}
      {(user || profile) && (
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt=""
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }}
            />
          ) : (
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--gradient-emerald)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "white",
            }}>
              {(profile?.full_name || "U")[0].toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {profile?.full_name || user?.user_metadata?.full_name || "Usuário"}
            </div>
            {family && (
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {family.name}
              </div>
            )}
          </div>
        </div>
      )}

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

      <div style={{ padding: "12px", borderTop: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: 4 }}>
        <Link href="/configuracoes" className="sidebar-link">
          <Settings className="sidebar-link-icon" />
          <span>Configurações</span>
        </Link>
        {user && (
          <button
            onClick={signOut}
            className="sidebar-link"
            style={{ background: "none", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit" }}
          >
            <LogOut className="sidebar-link-icon" />
            <span>Sair</span>
          </button>
        )}
      </div>
    </aside>
  );
}
