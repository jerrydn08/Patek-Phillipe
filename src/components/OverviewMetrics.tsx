/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProfile } from '../logic/pedagogicalEngine';

interface OverviewMetricsProps {
  profile: StudentProfile;
  minSampleSizeN: number;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ profile, minSampleSizeN }) => {
  return (
    <div className="space-y-6" id="overview">
      {/* BANNER: KIỂM ĐỊNH SƯ PHẠM (Explainable Pedagogical Verification) */}
      <section className="rounded-xl border border-secondary/30 bg-surface-container-low p-4 sm:p-5 relative overflow-hidden shadow-xs">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
            <span className="material-symbols-outlined text-xl" data-icon="verified_user">verified_user</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-lg font-bold text-primary font-headline">Cam kết Kiểm định Sư phạm & Minh bạch Thuật toán</h1>
              <span className="px-2 py-0.5 rounded text-xs bg-tertiary-fixed-dim/20 text-tertiary-container font-semibold border border-tertiary-fixed-dim/40">
                Explainable AI / Rules-based
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Mọi chẩn đoán đều dựa trên quy tắc giải thích được (Explainable Rules). Dữ liệu dưới ngưỡng tối thiểu (
              <strong className="text-on-surface font-semibold">N &lt; {minSampleSizeN} câu/dạng</strong>) sẽ trả về trạng thái{' '}
              <span className="bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-mono font-medium text-xs">
                Chưa đủ dữ liệu
              </span>{' '}
              thay vì suy đoán cảm tính. Tiến trình dựa vào hồ sơ làm bài thực tế của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* TOP SUMMARY METRIC CARDS (Bento Grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Reading Mastery */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Reading Mastery</span>
            <span className="px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-800 border border-amber-200 font-medium">
              {profile.readingMastery < 60 ? 'Báo động' : 'Cần cải thiện'}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-on-surface font-headline">{profile.readingMastery}%</span>
            <span className="text-xs text-on-surface-variant">
              (Band ước lượng: <strong className="text-primary font-semibold">{profile.readingBand}</strong>)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-2.5">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${profile.readingMastery}%` }}
            ></div>
          </div>
          <p className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-error" data-icon="trending_down">trending_down</span>
            <span>{profile.readingNote}</span>
          </p>
        </div>

        {/* Metric 2: Listening Mastery */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Listening Mastery</span>
            <span className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Tiến triển tốt
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-on-surface font-headline">{profile.listeningMastery}%</span>
            <span className="text-xs text-on-surface-variant">
              (Band ước lượng: <strong className="text-tertiary-container font-semibold">{profile.listeningBand}</strong>)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-2.5">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${profile.listeningMastery}%` }}
            ></div>
          </div>
          <p className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-emerald-600" data-icon="trending_up">trending_up</span>
            <span>{profile.listeningNote}</span>
          </p>
        </div>

        {/* Metric 3: Primary Bottleneck */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Điểm nghẽn cốt lõi</span>
            <span className="px-2 py-0.5 rounded text-xs bg-rose-50 text-rose-800 border border-rose-200 font-medium">
              Ưu tiên #1
            </span>
          </div>
          <div className="text-base font-bold text-error mb-1 truncate" title={profile.bottleneck.title}>
            {profile.bottleneck.title}
          </div>
          <p className="text-xs text-on-surface-variant mb-2 line-clamp-2">
            {profile.bottleneck.subtitle}
          </p>
          <div className="inline-flex items-center gap-1 text-xs text-primary font-semibold bg-primary-fixed/30 px-2 py-1 rounded">
            <span className="material-symbols-outlined text-xs" data-icon="speed">speed</span>
            <span>Thời gian/câu: {profile.bottleneck.timePerQuestion} (Chuẩn: {profile.bottleneck.standardTime})</span>
          </div>
        </div>

        {/* Metric 4: Confidence Score */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Độ tin cậy chẩn đoán</span>
            <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-primary border border-blue-200 font-medium">
              {profile.confidenceScore.label}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-primary font-headline">{profile.confidenceScore.level}</span>
            <span className="text-xs text-on-surface-variant">({profile.confidenceScore.testsCount} bài nộp gần nhất)</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden my-2.5">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
          </div>
          <p className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-primary" data-icon="fact_check">fact_check</span>
            <span>Tổng mẫu kiểm: <strong>{profile.confidenceScore.sampleQuestionsCount} câu hỏi</strong> đã phân loại</span>
          </p>
        </div>
      </section>
    </div>
  );
};
