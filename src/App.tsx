/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewMetrics } from './components/OverviewMetrics';
import { RootCauseSection } from './components/RootCauseSection';
import { AdaptivePathway } from './components/AdaptivePathway';
import { CuratedMaterials } from './components/CuratedMaterials';
import { ArchetypeSimulator } from './components/ArchetypeSimulator';

import { TestLogModal } from './components/modals/TestLogModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { MaterialPracticeModal } from './components/modals/MaterialPracticeModal';
import { ReportExportModal } from './components/modals/ReportExportModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';

import {
  ARCHETYPES_DATA,
  CURATED_MATERIALS,
  StudentProfile,
  CuratedMaterial,
  evaluatePedagogicalRules,
  parseAnswerVector
} from './logic/pedagogicalEngine';

export default function App() {
  const [currentArchetypeKey, setCurrentArchetypeKey] = useState<'A' | 'B' | 'C'>('B');
  const [profile, setProfile] = useState<StudentProfile>(ARCHETYPES_DATA['B']);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);

  // Settings
  const [minSampleSizeN, setMinSampleSizeN] = useState<number>(5);
  const [errorThreshold, setErrorThreshold] = useState<number>(50);
  const [telemetryEnabled, setTelemetryEnabled] = useState<boolean>(true);

  // Modals
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Selected Material for practice modal
  const [selectedMaterial, setSelectedMaterial] = useState<CuratedMaterial | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Switch Archetype
  const handleSelectArchetype = (key: 'A' | 'B' | 'C') => {
    setCurrentArchetypeKey(key);
    setProfile(ARCHETYPES_DATA[key]);
    showToast(`Đã nạp giả lập thuật toán cho ${ARCHETYPES_DATA[key].archetypeName}`);
  };

  // Scroll to section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Practice open
  const handleOpenPracticeByCode = (code?: string) => {
    const targetCode = code || 'MAT-RD-01';
    const mat = CURATED_MATERIALS.find((m) => m.code === targetCode) || CURATED_MATERIALS[0];
    setSelectedMaterial(mat);
    setIsPracticeModalOpen(true);
  };

  const handleOpenMaterialCard = (material: CuratedMaterial) => {
    setSelectedMaterial(material);
    setIsPracticeModalOpen(true);
  };

  const handleSelectMaterialFromTable = (materialId: string) => {
    const mat = CURATED_MATERIALS.find((m) => m.code === materialId);
    if (mat) {
      setSelectedMaterial(mat);
      setIsPracticeModalOpen(true);
    } else {
      setHighlightedCode(materialId);
      handleNavigate('curated-bank');
      setTimeout(() => setHighlightedCode(null), 3000);
    }
  };

  // Handle Exercise completion from Practice Runner
  const handleCompleteExercise = (materialCode: string, score: number, total: number) => {
    const pct = Math.round((score / total) * 100);
    showToast(`Đã lưu kết quả bài [${materialCode}]: ${score}/${total} câu (${pct}%).`);

    // Update profile diagnostics if relevant
    setProfile((prev) => {
      const updatedDiag = prev.diagnostics.map((d) => {
        if (d.suggestedAction.materialId === materialCode) {
          const newMastery = Math.min(95, Math.max(d.mastery, pct));
          return {
            ...d,
            mastery: newMastery,
            sampleCount: d.sampleCount + total,
            dotColor: newMastery >= 75 ? ('emerald' as const) : ('amber' as const)
          };
        }
        return d;
      });

      return {
        ...prev,
        diagnostics: updatedDiag,
        readingMastery: Math.min(88, prev.readingMastery + (pct >= 75 ? 3 : 1))
      };
    });
  };

  // Process Test Log Submission
  const handleProcessTestLog = (
    testCode: string,
    timeSpent: number,
    rawScore: number,
    answerVector: string
  ) => {
    const parsed = parseAnswerVector(answerVector);
    const evaluation = evaluatePedagogicalRules({
      falseRate: parsed.errorRatio,
      attemptsCount: parsed.totalParsed,
      p1TimeMinutes: timeSpent > 50 ? 23 : 16,
      vocabErrorRate: 0.35,
      minSampleSizeN
    });

    // Update Profile state with new empirical evidence
    setProfile((prev) => {
      const newLogs = [
        `[NẠP BÀI KIỂM TRA MỚI: ${testCode.toUpperCase()}]`,
        `> Dữ liệu trích xuất: N = ${parsed.totalParsed} câu, Điểm raw = ${rawScore}/40, Thời gian = ${timeSpent}m, Tỷ lệ lỗi = ${Math.round(
          parsed.errorRatio * 100
        )}%.`,
        `> Kiểm định quy tắc: ${evaluation.activeRuleId} [Triggered = ${
          evaluation.isTriggered ? 'TRUE' : 'FALSE'
        }].`,
        `> Phân tích: ${evaluation.explanation}`,
        `> Kết quả xuất: Lộ trình đã được hiệu chuẩn lại theo các điểm nghẽn mới nhất.`
      ];

      return {
        ...prev,
        confidenceScore: {
          ...prev.confidenceScore,
          testsCount: prev.confidenceScore.testsCount + 1,
          sampleQuestionsCount: prev.confidenceScore.sampleQuestionsCount + parsed.totalParsed
        },
        consoleLogs: newLogs,
        changelog: {
          time: 'Vừa xong',
          ruleId: `Rule ID #${evaluation.activeRuleId}`,
          title: `Cập nhật sau bài thi ${testCode}`,
          description: evaluation.explanation
        }
      };
    });

    showToast(`Dữ liệu bài [${testCode}] đã nạp thành công! Thuật toán đã chạy lại ma trận chẩn đoán.`);
  };

  const handleSaveSettings = (minN: number, errorThresh: number, telemetry: boolean) => {
    setMinSampleSizeN(minN);
    setErrorThreshold(errorThresh);
    setTelemetryEnabled(telemetry);
    showToast(`Đã lưu cấu hình sư phạm: Ngưỡng N = ${minN}, Ngưỡng lỗi = ${errorThresh}%.`);
  };

  const notifications = [
    {
      id: 'notif-1',
      title: profile.changelog.ruleId + ' đã kích hoạt',
      time: profile.changelog.time,
      description: profile.changelog.description,
      type: 'rule' as const
    },
    {
      id: 'notif-2',
      title: 'Giữ cờ Chưa đủ dữ liệu: Map Labelling',
      time: '08:00 AM',
      description: `Mới tích lũy N=3 câu, thấp hơn ngưỡng chuẩn N ≥ ${minSampleSizeN}. Đang chờ bổ sung đề kiểm tra.`,
      type: 'sample' as const
    },
    {
      id: 'notif-3',
      title: 'Đạt chuẩn thành thạo: Summary Completion',
      time: 'Hôm qua',
      description: 'Tỷ lệ chính xác đạt 85% trên 20 câu kiểm tra. Chuyển sang chế độ bảo trì kỹ năng định kỳ.',
      type: 'milestone' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Header */}
      <Header
        currentProfile={profile}
        isTeacherMode={isTeacherMode}
        onToggleRole={() => {
          setIsTeacherMode(!isTeacherMode);
          showToast(
            !isTeacherMode
              ? 'Đã chuyển sang chế độ Giảng viên (Hiển thị phân tích sâu & ghi chú sư phạm)'
              : 'Đã chuyển sang chế độ Sinh viên (Lộ trình học cá nhân hóa)'
          );
        }}
        onOpenLogModal={() => setIsLogModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenHelpModal={() =>
          showToast('Quy tắc sư phạm: Hệ thống không phỏng đoán ngẫu nhiên. Mọi phán đoán đều yêu cầu chứng cứ N >= ' + minSampleSizeN)
        }
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Teacher Mode Diagnostic Ribbon (when active) */}
      {isTeacherMode && (
        <div className="bg-primary text-on-primary px-4 py-2 text-xs border-b border-primary-container shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-300 text-sm" data-icon="shield_person">
                shield_person
              </span>
              <span className="font-bold">Chế độ Giảng viên (Tutor Diagnostic Console):</span>
              <span className="text-on-primary-container">
                Đang quan sát hồ sơ học viên <strong>{profile.id}</strong> • Phân loại học tập: {profile.archetypeName}
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleSelectArchetype('B')}
                className="bg-primary-container hover:bg-secondary px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors"
              >
                Gán lại Rule R-LOGIC-08
              </button>
              <button
                onClick={() => setIsTeacherMode(false)}
                className="text-on-primary-container hover:text-white underline text-[11px] cursor-pointer"
              >
                Thoát chế độ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8 w-full flex-1">
        {/* Left Sidebar */}
        <Sidebar
          currentProfile={profile}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onToggleRole={() => setIsTeacherMode(!isTeacherMode)}
          isTeacherMode={isTeacherMode}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Overview Metrics & Explainability Banner */}
          <OverviewMetrics profile={profile} minSampleSizeN={minSampleSizeN} />

          {/* Section 1: Root Cause & Diagnostics Table */}
          <RootCauseSection
            diagnostics={profile.diagnostics}
            minSampleSizeN={minSampleSizeN}
            onSelectMaterial={handleSelectMaterialFromTable}
            onOpenPractice={handleOpenPracticeByCode}
          />

          {/* Section 2: Adaptive Pathway */}
          <AdaptivePathway
            steps={profile.pathway}
            changelog={profile.changelog}
            onStartStep={handleOpenPracticeByCode}
          />

          {/* Section 3: Curated Material Bank */}
          <CuratedMaterials
            materials={CURATED_MATERIALS}
            onOpenMaterial={handleOpenMaterialCard}
            highlightedCode={highlightedCode}
          />

          {/* Section 4: Archetype Simulator & Deterministic Trace Engine */}
          <ArchetypeSimulator
            currentArchetypeKey={currentArchetypeKey}
            onSelectArchetype={handleSelectArchetype}
            profile={profile}
          />
        </main>
      </div>

      {/* Modals */}
      <TestLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleProcessTestLog}
        minSampleSizeN={minSampleSizeN}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        minSampleSizeN={minSampleSizeN}
        errorThreshold={errorThreshold}
        telemetryEnabled={telemetryEnabled}
        onSaveSettings={handleSaveSettings}
      />

      <MaterialPracticeModal
        material={selectedMaterial}
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        onCompleteExercise={handleCompleteExercise}
      />

      <ReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        profile={profile}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
      />

      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
        id="toast-notification"
      >
        <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-outline/30 text-xs sm:text-sm font-medium">
          <span className="material-symbols-outlined text-emerald-400 text-base" data-icon="check_circle">
            check_circle
          </span>
          <span id="toast-text">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}
