/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DiagnosticItem } from '../logic/pedagogicalEngine';

interface RootCauseSectionProps {
  diagnostics: DiagnosticItem[];
  minSampleSizeN: number;
  onSelectMaterial: (materialId: string) => void;
  onOpenPractice: (materialId: string) => void;
}

export const RootCauseSection: React.FC<RootCauseSectionProps> = ({
  diagnostics,
  minSampleSizeN,
  onSelectMaterial,
  onOpenPractice
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'alert' | 'sample'>('all');

  const filteredDiagnostics = diagnostics.filter(item => {
    if (filterMode === 'alert') {
      return item.mastery < 50;
    }
    if (filterMode === 'sample') {
      return item.sampleCount < minSampleSizeN || item.isInsufficientData;
    }
    return true;
  });

  return (
    <section
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 overflow-hidden shadow-xs"
      id="root-cause-section"
    >
      <div className="p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-surface-container-low/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="troubleshoot">troubleshoot</span>
            <h2 className="text-lg font-bold text-primary font-headline">Chẩn đoán Điểm yếu & Phân tích Nguyên nhân gốc</h2>
          </div>
          <p className="text-xs text-on-surface-variant">
            Phân tích bằng chứng sai số học thuật (Error Evidence) kết hợp phân loại sai lầm sư phạm
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="filter-select" className="text-xs text-on-surface-variant whitespace-nowrap">
            Lọc dữ liệu:
          </label>
          <select
            id="filter-select"
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
            className="text-xs bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-2.5 py-1 text-on-surface focus:ring-1 focus:ring-primary focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả dạng bài (All Question Types)</option>
            <option value="alert">Chỉ dạng báo động (Mastery &lt; 50%)</option>
            <option value="sample">Dạng cần kiểm tra mẫu (N &lt; {minSampleSizeN})</option>
          </select>
        </div>
      </div>

      {/* Diagnostic Table */}
      <div className="overflow-x-auto custom-scroll">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-surface-container text-xs font-semibold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/60">
              <th className="py-3 px-4">Dạng bài (Question Type)</th>
              <th className="py-3 px-3 text-center">Mastery</th>
              <th className="py-3 px-4">Bằng chứng lỗi (Empirical Evidence)</th>
              <th className="py-3 px-4">Nguyên nhân gốc (Root Cause)</th>
              <th className="py-3 px-3 text-center">Độ tin cậy</th>
              <th className="py-3 px-4">Hành động khắc phục đề xuất</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 text-xs sm:text-sm">
            {filteredDiagnostics.map((item) => {
              const dotBg =
                item.dotColor === 'red'
                  ? 'bg-red-600'
                  : item.dotColor === 'amber'
                  ? 'bg-amber-500'
                  : item.dotColor === 'emerald'
                  ? 'bg-emerald-600'
                  : 'bg-slate-500';

              const masteryBadgeBg =
                item.mastery < 50
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : item.mastery < 75
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200';

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-surface-container-low/50 transition-colors ${
                    item.mastery >= 80 ? 'bg-emerald-50/15' : ''
                  }`}
                >
                  <td className="py-4 px-4 font-semibold text-on-surface">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${dotBg}`}></span>
                      <span className="font-semibold">{item.questionType}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant font-normal block pl-4">
                      {item.sectionSub}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold border ${masteryBadgeBg}`}>
                      {item.mastery}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant max-w-xs">
                    <p
                      className={`font-semibold ${
                        item.empiricalEvidence.isError
                          ? 'text-error'
                          : item.empiricalEvidence.isWarning
                          ? 'text-amber-900'
                          : item.empiricalEvidence.isSuccess
                          ? 'text-emerald-800'
                          : 'text-on-surface'
                      }`}
                    >
                      {item.empiricalEvidence.highlight}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                      {item.empiricalEvidence.detail}
                    </p>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border mb-1 ${item.rootCause.colorClass}`}
                    >
                      <span className="material-symbols-outlined text-xs" data-icon={item.rootCause.icon}>
                        {item.rootCause.icon}
                      </span>
                      <span>{item.rootCause.tag}</span>
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {item.rootCause.explanation}
                    </p>
                  </td>
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-primary border border-blue-200 font-semibold">
                      {item.confidence}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.suggestedAction.materialId ? (
                      <button
                        onClick={() => {
                          if (item.suggestedAction.materialId) {
                            onOpenPractice(item.suggestedAction.materialId);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary font-semibold text-xs sm:text-sm hover:underline cursor-pointer group text-left"
                      >
                        <span>{item.suggestedAction.label}</span>
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform" data-icon="arrow_forward">
                          arrow_forward
                        </span>
                      </button>
                    ) : item.suggestedAction.isCompleted ? (
                      <span className="text-tertiary-container font-semibold text-xs sm:text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" data-icon="task_alt">task_alt</span>
                        <span>{item.suggestedAction.label}</span>
                      </span>
                    ) : (
                      <span className="text-on-surface-variant text-xs sm:text-sm font-medium">
                        {item.suggestedAction.label}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {filteredDiagnostics.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-on-surface-variant text-sm">
                  Không có dạng bài nào thỏa mãn bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer rule explanation */}
      <div className="p-3 bg-surface-container-low border-t border-outline-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-on-surface-variant gap-2">
        <span>
          * Dạng bài chưa hiển thị: <em>Map Labelling (Listening)</em> do mới có N=3 câu → Đang tạm giữ nhãn "Chưa đủ dữ liệu" theo chuẩn N ≥ {minSampleSizeN}.
        </span>
        <span className="font-mono text-[11px] whitespace-nowrap">Cập nhật: 09:30 AM hôm nay</span>
      </div>
    </section>
  );
};
