"use client";

import { useRole } from "@/contexts/RoleContext";
import { useAgentic } from "@/contexts/AgenticContext";
import { RoleSwitcher } from "./RoleSwitcher";
import { Sidebar } from "./Sidebar";
import { Badge } from "@/components/design-system/Badge";

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppLayout({ children, pageTitle = "Dashboard" }: AppLayoutProps) {
  const { currentRole, setCurrentRole } = useRole();
  const { agenticMode } = useAgentic();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar currentPage={pageTitle} />
      
      <div className="flex-1 flex flex-col bg-white ml-16">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-sm font-semibold text-gray-900">HCM Demo</h1>
              <h2 className="text-lg font-medium text-gray-700">{pageTitle}</h2>
              {agenticMode && (
                <Badge variant="success" size="small">
                  🤖 Agentic Mode
                </Badge>
              )}
              {!agenticMode && (
                <Badge variant="neutral" size="small">
                  ✨ AI-Guided Mode
                </Badge>
              )}
            </div>
            <RoleSwitcher
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

