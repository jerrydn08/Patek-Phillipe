/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface TestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testCode: string, timeSpent: number, rawScore: number, answerVector: string) => void;
  minSampleSizeN: number;
}

export const TestLogModal: React.FC<TestLogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  minSampleSizeN
}) => {
  const [testCode, setTestCode] = useState('Cambridge 17 • Test 1 Reading');
  const [timeSpent, setTimeSpent] = useState('58');
  const [rawScore, setRawScore] = useState('25');
  const [answerVector, setAnswerVector] = useState(
    '1:TRUE, 2:FALSE (User: NG), 3:NOT GIVEN (User: FALSE), 4:TRUE, 5:NOT GIVEN (User: FALSE), 6:FALSE (User: NG), 7:TRUE'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(testCode, Number(timeSpent) || 60, Number(rawScore) || 20, answerVector);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-on-background/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full border border-outline-variant shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="cloud_upload">cloud_upload</span>
            <h3 className="text-base sm:text-lg font-bold text-primary font-headline">Nạp Dữ Liệu Bài Làm (Test Log)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Mã bài kiểm tra (Test Code / Cam ID)
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs sm:text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"
                placeholder="Nhập tên bài thi..."
                type="text"
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Thời gian làm bài (Phút)
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs sm:text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"
                  type="number"
                  min="10"
                  max="120"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Số câu đúng (Total Raw / 40)
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs sm:text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"
                  type="number"
                  min="0"
                  max="40"
                  value={rawScore}
                  onChange={(e) => setRawScore(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Dán chuỗi kết quả (Answer Key Vector)
              </label>
              <textarea
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs sm:text-sm font-mono text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"
                placeholder="Ví dụ: 1:TRUE, 2:FALSE (User: NG), 3:NOT GIVEN (User: FALSE)..."
                rows={3}
                value={answerVector}
                onChange={(e) => setAnswerVector(e.target.value)}
                required
              />
              <p className="text-[11px] text-on-surface-variant mt-1">
                Hệ thống sẽ bóc tách các câu sai và tự động phân loại vào ma trận nguyên nhân gốc.
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg text-xs text-on-surface-variant border border-outline-variant/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base" data-icon="info">info</span>
              <span>
                Thuật toán sẽ chỉ cập nhật lộ trình khi dữ liệu đạt chuẩn ngưỡng N ≥ {minSampleSizeN}.
              </span>
            </div>
          </div>

          <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-semibold text-xs sm:text-sm hover:bg-surface-container-lowest cursor-pointer"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-xs sm:text-sm hover:bg-secondary flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
              <span>Chạy Chẩn Đoán Thích Ứng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
