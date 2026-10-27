/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProfile } from '../logic/pedagogicalEngine';

interface SidebarProps {
  currentProfile: StudentProfile;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSettings: () => void;
  onToggleRole: () => void;
  isTeacherMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentProfile,
  activeSection,
  onNavigate,
  onOpenSettings,
  onToggleRole,
  isTeacherMode
}) => {
  const navItems = [
    { id: 'overview', label: 'Tổng quan chẩn đoán', icon: 'analytics' },
    { id: 'adaptive-pathway', label: 'Lộ trình thích ứng', icon: 'route' },
    { id: 'curated-bank', label: 'Ngân hàng học liệu', icon: 'menu_book' },
    { id: 'root-cause-section', label: 'Phân tích nguyên nhân', icon: 'troubleshoot' },
    { id: 'changelog-panel', label: 'Lịch sử cập nhật lộ trình', icon: 'psychology' },
    { id: 'simulator-panel', label: 'Giả lập Archetype', icon: 'model_training' },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block" aria-label="Điều hướng chính">
      <div className="sticky top-24 bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-4 shadow-xs">
        {/* User Badge */}
        <div className="pb-4 mb-4 border-b border-outline-variant/40 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg font-headline">
            {currentProfile.id.split('-').pop() || '88A'}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-primary truncate">{currentProfile.id}</div>
            <div className="text-xs text-on-surface-variant truncate">Mục tiêu: {currentProfile.targetBand}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-3 text-sm rounded-lg px-3 py-2 transition-colors duration-150 ${
                  isActive
                    ? 'bg-surface-container-low text-primary font-bold border-l-4 border-primary shadow-2xs'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} data-icon={item.icon}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Sidebar Button */}
        <button
          onClick={() => onNavigate('simulator-panel')}
          className="w-full mb-6 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-semibold text-sm transition-all duration-150 border border-outline-variant/40 cursor-pointer shadow-2xs"
          aria-label="Thử nghiệm thuật toán"
        >
          <span className="material-symbols-outlined text-sm" data-icon="play_circle">play_circle</span>
          <span>Thử nghiệm thuật toán</span>
        </button>

        {/* Sub / Footer Tab Labels */}
        <div className="pt-3 border-t border-outline-variant/40 space-y-1">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 text-on-surface-variant hover:text-primary text-xs px-2 py-1.5 rounded transition-colors text-left cursor-pointer"
            aria-label="Mở cấu hình và giới hạn"
          >
            <span className="material-symbols-outlined text-sm" data-icon="settings">settings</span>
            <span>Cấu hình & Giới hạn (N ≥ 5)</span>
          </button>
          <button
            onClick={onToggleRole}
            className="w-full flex items-center gap-2 text-on-surface-variant hover:text-primary text-xs px-2 py-1.5 rounded transition-colors text-left cursor-pointer"
            aria-label="Chuyển chế độ giảng viên"
          >
            <span className="material-symbols-outlined text-sm" data-icon="switch_account">switch_account</span>
            <span>{isTeacherMode ? 'Về chế độ Sinh viên' : 'Chuyển chế độ Giảng viên'}</span>
          </button>
        </div>

        {/* Academic Rigor Watermark */}
        <div className="mt-6 p-3 bg-surface-container-low rounded-lg border border-outline-variant/40 text-[11px] text-on-surface-variant leading-relaxed">
          <div className="flex items-center gap-1 font-semibold text-primary mb-1">
            <span className="material-symbols-outlined text-xs" data-icon="verified">verified</span>
            <span>Pedagogical Engine</span>
          </div>
          Xử lý suy luận tất định (Deterministic Logic). Không tạo sinh dữ liệu ảo hoặc lời khuyên giả lập.
        </div>
      </div>
    </aside>
  );
};
