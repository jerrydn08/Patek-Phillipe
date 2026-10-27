/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile } from '../logic/pedagogicalEngine';

interface ArchetypeSimulatorProps {
  currentArchetypeKey: 'A' | 'B' | 'C';
  onSelectArchetype: (key: 'A' | 'B' | 'C') => void;
  profile: StudentProfile;
}

export const ArchetypeSimulator: React.FC<ArchetypeSimulatorProps> = ({
  currentArchetypeKey,
  onSelectArchetype,
  profile
}) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunReSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <section
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 sm:p-6 shadow-xs"
      id="simulator-panel"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-5 mb-5 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="model_training">model_training</span>
            <h2 className="text-xl font-bold text-primary font-headline">Bảng Giả Lập Kiểm Thử Thuật Toán (Archetype Simulator)</h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Mô phỏng cơ chế ra quyết định sư phạm tất định (Deterministic Logic Engine) trên 3 hồ sơ sinh viên mẫu
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-on-surface font-mono font-semibold">Rules v2.4 Live</span>
        </div>
      </div>

      {/* Archetype Selection Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Archetype A */}
        <button
          id="arch-btn-A"
          onClick={() => onSelectArchetype('A')}
          className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
            currentArchetypeKey === 'A'
              ? 'border-primary bg-surface-container-low shadow-xs'
              : 'border-outline-variant/60 hover:border-primary/50 bg-surface-container-lowest'
          }`}
          aria-label="Chọn hồ sơ Sinh viên A"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary text-sm font-headline">Sinh viên A</span>
            <span className="text-[11px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold border border-rose-200">
              Từ vựng yếu
            </span>
          </div>
          <div className="text-xs text-on-surface-variant font-medium">Thiếu vốn từ vựng & Paraphrase học thuật</div>
          <div className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">
            Sai đều cả Passage 1 & 2 do không nhận diện từ đồng nghĩa.
          </div>
        </button>

        {/* Archetype B */}
        <button
          id="arch-btn-B"
          onClick={() => onSelectArchetype('B')}
          className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
            currentArchetypeKey === 'B'
              ? 'border-primary bg-surface-container-low shadow-xs'
              : 'border-outline-variant/60 hover:border-primary/50 bg-surface-container-lowest'
          }`}
          aria-label="Chọn hồ sơ Sinh viên B"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary text-sm font-headline">Sinh viên B (Hiện tại)</span>
            <span className="text-[11px] bg-blue-50 text-primary px-2 py-0.5 rounded font-semibold border border-blue-200">
              Lỗi logic F/NG
            </span>
          </div>
          <div className="text-xs text-on-surface-variant font-medium">Thiếu kỹ thuật phân biệt logic trực tiếp</div>
          <div className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">
            Từ vựng tốt nhưng suy diễn quá đà giữa False và Not Given.
          </div>
        </button>

        {/* Archetype C */}
        <button
          id="arch-btn-C"
          onClick={() => onSelectArchetype('C')}
          className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
            currentArchetypeKey === 'C'
              ? 'border-primary bg-surface-container-low shadow-xs'
              : 'border-outline-variant/60 hover:border-primary/50 bg-surface-container-lowest'
          }`}
          aria-label="Chọn hồ sơ Sinh viên C"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary text-sm font-headline">Sinh viên C</span>
            <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-200">
              Kẹt thời gian
            </span>
          </div>
          <div className="text-xs text-on-surface-variant font-medium">Quản lý thời gian kém (Time Management)</div>
          <div className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">
            Passage 1 làm quá kỹ (25 phút), Passage 3 phải đánh lụi.
          </div>
        </button>
      </div>

      {/* Archetype Output Console Panel */}
      <div className="bg-[#233144] text-[#eaf1ff] rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3 shadow-md border border-[#757682]/30">
        <div className="flex items-center justify-between border-b border-[#757682]/40 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="text-xs text-[#b6c4ff] pl-2 font-mono">
              Engine Console Trace • deterministic_decision_tree.py
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunReSimulation}
              className="text-[11px] text-[#b6c4ff] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Chạy lại luồng kiểm định"
            >
              <span className={`material-symbols-outlined text-xs ${isSimulating ? 'animate-spin' : ''}`} data-icon="refresh">
                refresh
              </span>
              <span>Chạy lại cây quyết định</span>
            </button>
            <span className="text-xs text-[#c5c5d3]">Status: OK (200)</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs leading-relaxed text-[#eaf1ff]" id="arch-console-output">
          {profile.consoleLogs.map((log, idx) => {
            if (idx === 0) {
              return (
                <p key={idx} className="text-emerald-400 font-bold">
                  {log}
                </p>
              );
            }
            if (log.includes('[Triggered = TRUE]')) {
              return (
                <p key={idx} className="text-amber-300">
                  {log}
                </p>
              );
            }
            if (log.includes('Kết quả xuất:')) {
              return (
                <p key={idx} className="text-[#b6c4ff] font-semibold">
                  {log}
                </p>
              );
            }
            return <p key={idx}>{log}</p>;
          })}
        </div>
      </div>
    </section>
  );
};
