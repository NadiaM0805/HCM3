"use client";

import { useState } from "react";
import { Button } from "@phenom/react-ds/button";
import { Badge } from "@phenom/react-ds/badge";
import { CustomModal } from "@/components/ui/CustomModal";
import { toast } from "@phenom/react-ds/snackbar";
import { useRole } from "@/contexts/RoleContext";
import { SmartSuggestionModal } from "@/components/SmartSuggestionModal";

interface ScheduleEvent {
  id: string;
  date: string;
  title: string;
  time: string;
  location: string;
  locationType: "zoom" | "google-meet" | "onsite";
  status: "confirmed" | "pending";
  participants: number;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    date: "May 18",
    title: "Team sync meeting",
    time: "11:30 AM - 12:00 PM EST",
    location: "Google meet",
    locationType: "google-meet",
    status: "confirmed",
    participants: 3,
  },
  {
    id: "2",
    date: "May 18",
    title: "1-on-1 with Alex Morgan",
    time: "2:00 PM - 2:30 PM EST",
    location: "Zoom meeting",
    locationType: "zoom",
    status: "confirmed",
    participants: 2,
  },
  {
    id: "3",
    date: "May 18",
    title: "HR interview with Rachel Mohan",
    time: "14:30 PM - 15:30 PM EST",
    location: "Meeting room A",
    locationType: "onsite",
    status: "confirmed",
    participants: 2,
  },
];

export function ReportingManagerDashboard() {
  const { roleInfo } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSmartSuggestion, setShowSmartSuggestion] = useState(false);
  const [resignationAccepted, setResignationAccepted] = useState(false);
  const [taskStatus, setTaskStatus] = useState<{
    status: "pending" | "completed";
    label: string;
    style?: "success";
  }>({
    status: "pending",
    label: "Resignation Request",
  });

  const handleReviewAccept = () => {
    setIsModalOpen(true);
  };

  const handleConfirmAcceptance = () => {
    // Mark resignation as accepted
    setResignationAccepted(true);
    // Close the acceptance modal
    setIsModalOpen(false);
    // Open the smart suggestion modal
    setShowSmartSuggestion(true);
  };

  const handleFreezeBudget = () => {
    setShowSmartSuggestion(false);
    
    // Update task status
    setTaskStatus({
      status: "completed",
      label: "Resignation accepted – Budget frozen",
      style: "success",
    });
    
    // Show neutral toast
    toast.info("Budget frozen. Resignation accepted. Budget for this position has been frozen.");
  };

  const handleCreateRequisition = () => {
    // Create requisition logic (simulated)
    const requisitionNumber = "REQ-555";
    
    setShowSmartSuggestion(false);
    
    // Update task status
    setTaskStatus({
      status: "completed",
      label: "Resignation accepted – Requisition created",
      style: "success",
    });
    
    // Show success toast - matching the exact format from requirements
    toast.success(`Success! Requisition #${requisitionNumber} created for Product Designer.`);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="relative h-[288px] w-full mb-6">
          <div className="absolute h-[288px] left-0 rounded-[32px] top-0 w-full bg-gradient-to-br from-white via-white to-purple-50">
            <div className="absolute flex flex-col items-start left-0 top-[81px] w-full max-w-[888px] px-6">
              <h1 className="font-semibold leading-[90px] relative shrink-0 text-[60px] text-black tracking-[-0.5px] w-full mb-0">
                Good morning, {roleInfo.name}
              </h1>
              <div className="flex items-center relative shrink-0 w-full mt-0">
                <p className="font-normal leading-[36px] relative shrink-0 text-[#464f5e] text-[20px] tracking-[0.18px]">
                  {roleInfo.role} · {roleInfo.org}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Team Overview Card */}
              <div className="bg-white border border-[#aeb5c2] rounded-lg p-6 h-[140px] flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#464f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h2a2 2 0 002-2V7.5a2.5 2.5 0 00-2.5-2.5h-1.5m-10 0H4A2 2 0 002 7.5V18a2 2 0 002 2h2m10-4a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2zM9.5 11a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM12 17.5h.01M12 13h.01M12 9h.01M12 5h.01" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#353b46]">Team Overview</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-[#353b46]">8</span>
                    <span className="text-xs text-[#637085]">Direct reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-[#353b46]">2</span>
                    <span className="text-xs text-[#637085]">Open positions</span>
                  </div>
                </div>
              </div>

              {/* Pending Actions Card */}
              <div className="bg-white border border-[#aeb5c2] rounded-lg p-6 h-[140px] flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#464f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#353b46]">Pending actions</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-[#353b46]">1</span>
                    <span className="text-xs text-[#637085]">Action required</span>
                  </div>
                </div>
              </div>

              {/* Team Attrition Card */}
              <div className="bg-white border border-[#aeb5c2] rounded-lg p-6 h-[140px] flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#464f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#353b46]">Team attrition</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-[#353b46]">5.2%</span>
                    <span className="text-xs text-red-600 font-semibold">▼ 1.1%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Insights Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Insights</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your team has 2 open positions that can be filled through internal transfers.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Average time-to-fill for Product Designer role is 45 days.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Consider succession planning for 2 senior positions retiring next year.</span>
                </li>
              </ul>
            </div>

            {/* My Tasks Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h2>
              <div className={`border rounded-lg p-4 ${
                taskStatus.style === "success" 
                  ? "border-green-200 bg-green-50" 
                  : "border-gray-200"
              }`}>
                <h3 className={`text-base font-semibold mb-3 ${
                  taskStatus.style === "success" 
                    ? "text-green-900" 
                    : "text-gray-900"
                }`}>
                  {taskStatus.label}
                </h3>
                {taskStatus.status === "pending" ? (
                  <>
                    <div className="space-y-1 text-sm text-gray-700 mb-4">
                      <p>Alex Morgan has submitted a resignation.</p>
                      <p>Last Working Day: Oct 30, 2025</p>
                      <p>Reason: Better Opportunity</p>
                    </div>
                    <Button
                      buttonType="primary"
                      label="Review & Accept"
                      onClick={handleReviewAccept}
                      onFocus={() => {}}
                      onMouseEnter={() => {}}
                      size="small"
                    />
                  </>
                ) : (
                  <div className="space-y-1 text-sm text-green-800">
                    <p>Task completed successfully.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Schedule */}
          <div className="w-[469px] bg-[#f8f9fb] rounded-2xl p-8 flex flex-col gap-12">
            {/* My Schedule Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-[#353b46]">My schedule</h2>
                  <svg className="w-5 h-5 text-[#464f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <p className="text-xs text-[#464f5e]">Thursday, May 18</p>
                <button className="text-sm font-medium text-[#353b46] px-2 py-1 bg-transparent">Today</button>
              </div>

              <div className="flex flex-col gap-2">
                {scheduleEvents.map((event) => (
                  <div key={event.id} className="bg-white border border-[#aeb5c2] rounded-lg p-4 flex gap-4">
                    {/* Date Box */}
                    <div className="bg-[#f1f3f4] rounded-lg px-4 py-2 flex flex-col items-center justify-center min-w-[54px] h-[58px]">
                      <p className="text-xs text-[#464f5e] mb-0">May</p>
                      <p className="text-sm font-semibold text-[#464f5e]">18</p>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-[#353b46]">{event.title}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-[#637085]">{event.time}</p>
                        <div className="flex items-center gap-1">
                          {event.locationType === "zoom" || event.locationType === "google-meet" ? (
                            <svg className="w-3 h-3 text-[#8c95a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3 text-[#8c95a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          <p className="text-xs text-[#8c95a8]">{event.location}</p>
                        </div>
                      </div>
                      {/* Participant Avatars */}
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: event.participants }).map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 border-2 border-white -ml-1 first:ml-0 flex items-center justify-center text-white text-xs font-medium"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm resignation acceptance"
        footer={
          <>
            <Button
              buttonType="secondary"
              label="Cancel"
              onClick={() => setIsModalOpen(false)}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
            />
            <Button
              buttonType="primary"
              label="Accept Resignation"
              onClick={handleConfirmAcceptance}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
            />
          </>
        }
      >
        <div className="space-y-4 w-full">
          <div className="space-y-2 text-sm text-gray-700">
            <p>Alex Morgan has submitted a resignation.</p>
            <p>Last working day: Oct 30, 2025</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-800">
              This leaves the Product Designer position vacant. The approved budget for this position is $120,000.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-900">
            Accept this resignation?
          </p>
        </div>
      </CustomModal>

      {/* Smart Suggestion Modal */}
      <SmartSuggestionModal
        isOpen={showSmartSuggestion}
        onClose={() => setShowSmartSuggestion(false)}
        onFreezeBudget={handleFreezeBudget}
        onCreateRequisition={handleCreateRequisition}
        employeeName="Alex Morgan"
        roleName="Product Designer"
        positionCode="POS-104"
        approvedBudget="$110,000"
      />
    </>
  );
}

