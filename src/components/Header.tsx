/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProfile } from '../logic/pedagogicalEngine';

interface HeaderProps {
  currentProfile: StudentProfile;
  isTeacherMode: boolean;
  onToggleRole: () => void;
  onOpenLogModal: () => void;
  onOpenExportModal: () => void;
  onOpenHelpModal: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  isTeacherMode,
  onToggleRole,
  onOpenLogModal,
  onOpenExportModal,
  onOpenHelpModal,
  onOpenNotifications
}) => {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/50 sticky top-0 z-40 shadow-xs">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-xl" data-icon="school">school</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-primary tracking-tight font-headline">IELTS Adaptive</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-high text-primary border border-outline-variant/40">
                V3.2 Engine
              </span>
            </div>
            <p className="text-xs text-on-surface-variant hidden md:block">
              Hệ Thống Ôn Luyện Thích Ứng & Chẩn Đoán Sư Phạm
            </p>
          </div>
        </div>

        {/* Student Diagnostic Anchor Pill */}
        <div className="hidden lg:flex items-center gap-4 bg-surface-container-low px-4 py-1.5 rounded-lg border border-outline-variant/40 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></span>
            <span className="font-semibold text-on-surface">{currentProfile.id}</span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60"></div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary" data-icon="flag">flag</span>
            <span>Mục tiêu: <strong className="text-on-surface font-semibold">{currentProfile.targetBand}</strong></span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60"></div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary" data-icon="timer">timer</span>
            <span>Còn: <strong className="text-on-surface font-semibold">{currentProfile.timeRemaining}</strong> ({currentProfile.studyPace})</span>
          </div>
        </div>

        {/* Trailing Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Toggle Pill */}
          <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant/40 flex items-center">
            <button
              onClick={() => isTeacherMode && onToggleRole()}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                !isTeacherMode
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="role-student-btn"
              aria-label="Xem giao diện sinh viên"
            >
              Sinh viên
            </button>
            <button
              onClick={() => !isTeacherMode && onToggleRole()}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                isTeacherMode
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="role-tutor-btn"
              aria-label="Xem giao diện giảng viên"
            >
              Giảng viên
            </button>
          </div>

          {/* Trailing Primary Action */}
          <button
            onClick={onOpenLogModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:bg-secondary transition-all shadow-xs cursor-pointer"
            id="open-log-btn"
            aria-label="Nạp bài làm mới"
          >
            <span className="material-symbols-outlined text-base" data-icon="upload_file">upload_file</span>
            <span>Nạp bài làm mới</span>
          </button>

          {/* Export Diagnostics Action */}
          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-semibold text-sm transition-all cursor-pointer"
            title="Xuất báo cáo chẩn đoán"
            aria-label="Xuất báo cáo chẩn đoán"
          >
            <span className="material-symbols-outlined text-base" data-icon="file_download">file_download</span>
            <span className="hidden xl:inline">Xuất báo cáo</span>
          </button>

          {/* Icon Actions */}
          <div className="flex items-center border-l border-outline-variant/40 pl-1.5 ml-1">
            <button
              onClick={onOpenNotifications}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors relative cursor-pointer"
              title="Thông báo cập nhật thuật toán"
              aria-label="Thông báo cập nhật thuật toán"
            >
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button
              onClick={onOpenHelpModal}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
              title="Trợ giúp & Quy tắc sư phạm"
              aria-label="Trợ giúp và quy tắc sư phạm"
            >
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
