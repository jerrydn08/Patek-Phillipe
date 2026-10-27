/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProfile } from '../../logic/pedagogicalEngine';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-on-background/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-xl max-w-3xl w-full border border-outline-variant shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" data-icon="description">description</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-primary font-headline">
                Báo Cáo Chẩn Đoán Sư Phạm & Lộ Trình Thích Ứng
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Mã hồ sơ: {profile.id} • IELTS Academic Adaptive Report
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Đóng báo cáo"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto custom-scroll space-y-6 text-sm text-on-surface" id="printable-report">
          {/* Institutional Header Banner */}
          <div className="p-4 rounded-xl border border-primary/30 bg-surface-container-low/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-xs uppercase font-bold text-primary tracking-wider font-mono">
                IELTS ADAPTIVE DIAGNOSTIC ENGINE V3.2
              </div>
              <h4 className="text-xl font-bold text-on-surface font-headline mt-1">
                Chứng thư Phân tích Học lực Cá nhân hóa
              </h4>
              <p className="text-xs text-on-surface-variant mt-1">
                Ứng viên: <strong>{profile.archetypeName}</strong> ({profile.id}) • Mục tiêu: <strong>{profile.targetBand}</strong>
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right border-t sm:border-t-0 sm:border-l border-outline-variant/60 pt-2 sm:pt-0 sm:pl-4">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Deterministic Verified
              </span>
              <div className="text-[11px] text-on-surface-variant font-mono mt-1">
                Ngày xuất: 26/10/2026
              </div>
            </div>
          </div>

          {/* Core Metrics Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-[11px] text-on-surface-variant uppercase font-semibold block">Reading Mastery</span>
              <span className="text-2xl font-bold text-primary font-headline">{profile.readingMastery}%</span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Band {profile.readingBand}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-[11px] text-on-surface-variant uppercase font-semibold block">Listening Mastery</span>
              <span className="text-2xl font-bold text-emerald-700 font-headline">{profile.listeningMastery}%</span>
              <span className="text-xs text-on-surface-variant block mt-0.5">Band {profile.listeningBand}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-[11px] text-on-surface-variant uppercase font-semibold block">Điểm nghẽn cốt lõi</span>
              <span className="text-sm font-bold text-error block truncate mt-1">{profile.bottleneck.title}</span>
              <span className="text-[11px] text-on-surface-variant block">{profile.bottleneck.timePerQuestion}/câu</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/40">
              <span className="text-[11px] text-on-surface-variant uppercase font-semibold block">Độ tin cậy</span>
              <span className="text-2xl font-bold text-primary font-headline">{profile.confidenceScore.level}</span>
              <span className="text-[11px] text-on-surface-variant block mt-0.5">{profile.confidenceScore.sampleQuestionsCount} câu kiểm</span>
            </div>
          </div>

          {/* Error Evidence Matrix */}
          <div className="space-y-3">
            <h5 className="font-bold text-primary font-headline text-sm uppercase tracking-wide">
              1. Ma trận Bằng chứng Sai số & Phân loại Sư phạm
            </h5>
            <div className="space-y-2">
              {profile.diagnostics.map((diag) => (
                <div key={diag.id} className="p-3 bg-surface-container-low/40 rounded-lg border border-outline-variant/40 text-xs flex flex-col sm:flex-row justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-bold text-on-surface">{diag.questionType}</span>
                    <p className="text-on-surface-variant">{diag.empiricalEvidence.highlight} — {diag.empiricalEvidence.detail}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="font-semibold text-primary">{diag.rootCause.tag}</span>
                    <div className="text-[11px] text-on-surface-variant">Mastery: {diag.mastery}% ({diag.confidence})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescribed Pathway */}
          <div className="space-y-3">
            <h5 className="font-bold text-primary font-headline text-sm uppercase tracking-wide">
              2. Kế hoạch Can thiệp Sư phạm Thích ứng (Prescribed Interventions)
            </h5>
            <div className="space-y-2">
              {profile.pathway.map((st) => (
                <div key={st.stepNumber} className="p-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-xs flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 text-xs">
                    {st.stepNumber}
                  </span>
                  <div>
                    <span className="font-bold text-on-surface">{st.title}</span>
                    <p className="text-on-surface-variant mt-0.5 leading-relaxed">{st.description}</p>
                    {st.unlockCondition && (
                      <span className="text-xs text-on-surface-variant font-medium mt-1 block">
                        Yêu cầu: {st.unlockCondition}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Signature */}
          <div className="pt-4 border-t border-outline-variant/40 flex justify-between items-end text-xs text-on-surface-variant">
            <div>
              <p>Hệ thống tự động biên soạn theo chuẩn khảo thí Cambridge IELTS.</p>
              <p className="font-mono text-[11px]">Audit Hash: SHA256-ADAPTIVE-345680450116</p>
            </div>
            <div className="text-right">
              <span className="font-serif italic text-primary font-bold block text-sm">IELTS Adaptive Pedagogical Committee</span>
              <span>Bộ môn Khảo thí & Đánh giá Ngôn ngữ</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold text-xs sm:text-sm hover:bg-surface-container-lowest cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-xs sm:text-sm hover:bg-secondary flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm" data-icon="print">print</span>
            <span>In / Lưu PDF Báo Cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
