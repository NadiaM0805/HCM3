"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { AppLayout } from "@/components/layout/AppLayout";

export default function WalkthroughLaunchpad() {
  const router = useRouter();

  return (
    <AppLayout pageTitle="Walkthrough">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            Choose Your Workflow
          </h1>
          <p className="text-lg text-gray-600">
            Explore how Phenom's HCM experience works in two different modes.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI-Guided Workflow Card */}
          <div className="bg-white rounded-2xl border-2 border-[#4d3ee0] p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Image
                  src="/sparkle.svg"
                  alt="Sparkles"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                AI-Guided Workflow
              </h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Walk through the experience step-by-step with AI guidance. You stay
              in control while the AI assists with insights and planning.
            </p>
            <Button
              buttonType="primary"
              label="Start AI-Guided Workflow"
              onClick={() => router.push("/walkthrough/ai-guided/dashboard")}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              fullWidth
            />
          </div>

          {/* Agentic Autonomous Workflow Card */}
          <div className="bg-white rounded-2xl border-2 border-amber-400 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Agentic Autonomous Workflow
              </h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Watch AI agents execute the workflow on your behalf — taking actions,
              filling forms, and orchestrating tasks automatically.
            </p>
            <button
              onClick={() => router.push("/walkthrough/agentic-autonomous/dashboard")}
              className="w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
            >
              Start Agentic Autonomous Workflow
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

