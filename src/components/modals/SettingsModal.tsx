/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  minSampleSizeN: number;
  errorThreshold: number;
  telemetryEnabled: boolean;
  onSaveSettings: (minN: number, errorThresh: number, telemetry: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  minSampleSizeN,
  errorThreshold,
  telemetryEnabled,
  onSaveSettings
}) => {
  const [minN, setMinN] = useState(minSampleSizeN);
  const [errThresh, setErrThresh] = useState(errorThreshold);
  const [telemetry, setTelemetry] = useState(telemetryEnabled);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(minN, errThresh, telemetry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-on-background/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-xl max-w-md w-full border border-outline-variant shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="tune">tune</span>
            <h3 className="text-base sm:text-lg font-bold text-primary font-headline">Cấu hình Ngưỡng Sư phạm</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Đóng cài đặt"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="min-n-range" className="block font-semibold text-on-surface">
                Ngưỡng mẫu tối thiểu (Min Sample Size N)
              </label>
              <span className="font-bold text-primary font-mono bg-primary-fixed px-2 py-0.5 rounded text-xs">
                N = {minN}
              </span>
            </div>
            <input
              id="min-n-range"
              className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
              max="10"
              min="3"
              step="1"
              type="range"
              value={minN}
              onChange={(e) => setMinN(Number(e.target.value))}
            />
            <p className="text-[11px] text-on-surface-variant mt-1">
              Dưới {minN} câu sẽ gắn cờ "Chưa đủ dữ liệu", tránh chẩn đoán và đưa ra kết luận vội vàng.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="error-threshold-range" className="block font-semibold text-on-surface">
                Ngưỡng cảnh báo tỷ lệ lỗi (Error Ratio Alert)
              </label>
              <span className="font-bold text-primary font-mono bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded text-xs">
                {errThresh}%
              </span>
            </div>
            <input
              id="error-threshold-range"
              className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
              max="70"
              min="30"
              step="5"
              type="range"
              value={errThresh}
              onChange={(e) => setErrThresh(Number(e.target.value))}
            />
            <p className="text-[11px] text-on-surface-variant mt-1">
              Tỷ lệ sai vượt {errThresh}% sẽ lập tức kích hoạt tái cấu trúc lộ trình thích ứng.
            </p>
          </div>

          <div className="pt-3 border-t border-outline-variant/40">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                checked={telemetry}
                onChange={(e) => setTelemetry(e.target.checked)}
                className="w-4 h-4 rounded border-outline text-primary focus:ring-primary accent-primary cursor-pointer"
                type="checkbox"
              />
              <span className="text-on-surface font-medium text-xs sm:text-sm">
                Bật ghi chép thời gian từng câu (Telemetry Logging)
              </span>
            </label>
            <p className="text-[11px] text-on-surface-variant mt-1 pl-6">
              Thu thập telemetry tốc độ làm bài để phát hiện bẫy cạn kiệt thời gian ở Passage 3.
            </p>
          </div>
        </div>

        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold text-xs sm:text-sm hover:bg-surface-container-lowest cursor-pointer"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-xs sm:text-sm hover:bg-secondary cursor-pointer shadow-xs"
            onClick={handleSave}
          >
            Lưu Cấu Hình
          </button>
        </div>
      </div>
    </div>
  );
};
