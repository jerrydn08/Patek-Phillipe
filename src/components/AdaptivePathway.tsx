/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PathwayStep } from '../logic/pedagogicalEngine';

interface AdaptivePathwayProps {
  steps: PathwayStep[];
  changelog: {
    time: string;
    ruleId: string;
    title: string;
    description: string;
  };
  onStartStep: (materialCode?: string) => void;
}

export const AdaptivePathway: React.FC<AdaptivePathwayProps> = ({
  steps,
  changelog,
  onStartStep
}) => {
  return (
    <section
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 sm:p-6 shadow-xs"
      id="adaptive-pathway"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-5 mb-5 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="route">route</span>
            <h2 className="text-xl font-bold text-primary font-headline">Lộ trình Ôn tập Thích ứng Động</h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Lập trình theo thứ tự ưu tiên sư phạm; tự động tái cơ cấu khi phát hiện điểm nghẽn mới
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-surface-container-high text-primary font-semibold self-start sm:self-auto">
          <span className="material-symbols-outlined text-sm" data-icon="sync">sync</span>
          <span>Mô hình thích ứng theo chu kỳ kiểm tra</span>
        </span>
      </div>

      {/* Dynamic Pathway Steps (Timeline Grid) */}
      <div className="space-y-4">
        {steps.map((step) => {
          if (step.status === 'active') {
            return (
              <div
                key={step.stepNumber}
                className="border-2 border-primary rounded-xl p-4 sm:p-5 bg-surface-container-low/30 relative"
              >
                <div className="absolute -top-3 left-4 bg-primary text-on-primary text-[11px] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs" data-icon="priority_high">priority_high</span>
                  <span>{step.statusBadge}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mt-2">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-primary-fixed text-on-primary-fixed font-bold">
                        {step.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-primary font-headline">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                    {step.materialTitle && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                        <span className="text-on-surface-variant">Học liệu chỉ định:</span>
                        <span className="inline-flex items-center gap-1 text-primary font-semibold bg-surface-container-lowest border border-outline-variant/60 px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-sm" data-icon="book">book</span>
                          <span>{step.materialTitle}</span>
                        </span>
                        {step.materialCode && (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                            Mã {step.materialCode}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col items-start md:items-end justify-center gap-2">
                    <button
                      onClick={() => onStartStep(step.materialCode)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:bg-secondary transition-all shadow-xs cursor-pointer"
                      aria-label="Bắt đầu phiên học ngay"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="play_arrow">play_arrow</span>
                      <span>Bắt đầu phiên học ngay</span>
                    </button>
                    {step.estimatedMinutes && (
                      <span className="text-xs text-on-surface-variant">
                        Dự kiến hoàn thành: {step.estimatedMinutes} phút
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={step.stepNumber}
              className="border border-outline-variant/60 rounded-xl p-4 sm:p-5 bg-surface-container-lowest hover:border-outline transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-surface-container-high text-on-surface-variant font-bold">
                      {step.badge}
                    </span>
                    <span className="text-xs text-on-surface-variant font-semibold">
                      {step.statusBadge}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-on-surface font-headline">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    {step.description}
                  </p>
                  {step.unlockCondition && (
                    <div className="text-xs text-on-surface-variant pt-1 font-medium">
                      {step.unlockCondition}
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40">
                    <span className="material-symbols-outlined text-sm" data-icon={step.status === 'locked' ? 'lock' : 'schedule'}>
                      {step.status === 'locked' ? 'lock' : 'schedule'}
                    </span>
                    <span>{step.status === 'locked' ? 'Sắp diễn ra' : 'Đã lên lịch'}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* THẺ GHI CHÚ LÝ DO THAY ĐỔI LỘ TRÌNH (CHANGELOG PANEL) */}
      <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-outline-variant/60" id="changelog-panel">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-0.5" data-icon="history_toggle_off">history_toggle_off</span>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-primary font-headline">
                {changelog.title}:
              </span>
              <span className="px-2 py-0.5 rounded text-xs bg-surface-container-lowest text-on-surface-variant font-mono">
                {changelog.time}
              </span>
            </div>
            <p className="text-on-surface leading-relaxed">
              {changelog.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
