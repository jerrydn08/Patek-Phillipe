/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CuratedMaterial } from '../../logic/pedagogicalEngine';

interface MaterialPracticeModalProps {
  material: CuratedMaterial | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteExercise: (materialCode: string, score: number, total: number) => void;
}

export const MaterialPracticeModal: React.FC<MaterialPracticeModalProps> = ({
  material,
  isOpen,
  onClose,
  onCompleteExercise
}) => {
  if (!isOpen || !material) return null;

  return (
    <div className="fixed inset-0 bg-on-background/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-xl max-w-3xl w-full border border-outline-variant shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-primary text-xl ${
                material.type === 'practice'
                  ? 'text-primary'
                  : material.type === 'doc'
                  ? 'text-purple-700'
                  : 'text-indigo-700'
              }`}
            >
              {material.type === 'practice'
                ? 'quiz'
                : material.type === 'doc'
                ? 'menu_book'
                : 'graphic_eq'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded">
                  {material.code}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-semibold border ${material.difficultyColor}`}>
                  {material.difficulty}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface font-headline mt-0.5">
                {material.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Đóng bài học"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scroll flex-1 space-y-6">
          {material.type === 'practice' && (
            <PracticeRunner
              material={material}
              onFinish={(score, total) => onCompleteExercise(material.code, score, total)}
            />
          )}

          {material.type === 'doc' && <DocViewer material={material} />}

          {material.type === 'audio' && <AudioSessionViewer material={material} />}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex justify-between items-center shrink-0">
          <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-600" data-icon="verified">verified</span>
            <span>Tài liệu đối chiếu đã thẩm định học thuật</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Interactive Practice Runner for F/NG
 */
const PracticeRunner: React.FC<{
  material: CuratedMaterial;
  onFinish: (score: number, total: number) => void;
}> = ({ material, onFinish }) => {
  const questions = material.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'TRUE' | 'FALSE' | 'NOT GIVEN'>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const userAns = selectedAnswers[currentQ?.id];
  const isChecked = showExplanation[currentQ?.id];

  const handleSelectAnswer = (ans: 'TRUE' | 'FALSE' | 'NOT GIVEN') => {
    if (isChecked) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleCheckAnswer = () => {
    if (!userAns) return;
    setShowExplanation((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // calculate score
      let correct = 0;
      questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) correct++;
      });
      onFinish(correct, questions.length);
    }
  };

  if (isCompleted) {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="text-center py-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl" data-icon="task_alt">task_alt</span>
        </div>
        <h4 className="text-xl font-bold text-on-surface font-headline">Hoàn thành phiên luyện tập!</h4>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto">
          Bạn đã hoàn thành <strong>{questions.length}</strong> câu phân biệt trực diện giữa False và Not Given.
        </p>
        <div className="inline-block p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 my-2">
          <div className="text-3xl font-bold text-primary font-headline">{percentage}%</div>
          <div className="text-xs text-on-surface-variant mt-1">
            Đúng {correctCount} / {questions.length} câu
          </div>
        </div>
        <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg max-w-lg mx-auto">
          Thuật toán ghi nhận: Khả năng phân biệt Direct Contradiction đã tăng điểm. Tiếp tục luyện tập để đạt mốc mở khóa Bước 2 (≥ 75%).
        </div>
        <div>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswers({});
              setShowExplanation({});
              setIsCompleted(false);
            }}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:bg-secondary cursor-pointer transition-colors"
          >
            Luyện tập lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Question Stepper */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant border-b border-outline-variant/40 pb-3">
        <span className="font-semibold text-primary">
          Câu hỏi {currentIndex + 1} / {questions.length}
        </span>
        <div className="flex gap-1.5">
          {questions.map((q, idx) => {
            const hasAnswered = selectedAnswers[q.id];
            const isRight = hasAnswered === q.correctAnswer;
            const isRevealed = showExplanation[q.id];

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-6 h-6 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentIndex === idx
                    ? 'ring-2 ring-primary bg-primary text-on-primary'
                    : isRevealed
                    ? isRight
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                    : hasAnswered
                    ? 'bg-surface-container-high text-on-surface'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Passage Excerpt Box */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
        <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
          Trích đoạn bài đọc (Passage Evidence):
        </span>
        <p className="text-sm font-serif italic text-on-surface leading-relaxed">
          {currentQ.passageExcerpt}
        </p>
      </div>

      {/* Statement */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
          Câu nhận định cần kiểm chứng (Statement):
        </span>
        <div className="p-3 bg-surface-container-lowest rounded-lg border-2 border-primary/20 font-medium text-sm text-on-surface">
          "{currentQ.statement}"
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {(['TRUE', 'FALSE', 'NOT GIVEN'] as const).map((opt) => {
          const isSelected = userAns === opt;
          const isCorrect = currentQ.correctAnswer === opt;

          let btnClass = 'border border-outline-variant hover:border-primary/60 bg-surface-container-lowest';
          if (isSelected) {
            btnClass = 'border-2 border-primary bg-primary-fixed/40 font-bold text-primary';
          }
          if (isChecked) {
            if (isCorrect) {
              btnClass = 'border-2 border-emerald-600 bg-emerald-50 text-emerald-800 font-bold';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-2 border-rose-600 bg-rose-50 text-rose-800 font-bold';
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelectAnswer(opt)}
              disabled={isChecked}
              className={`p-3 rounded-lg text-sm text-center transition-all cursor-pointer ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback & Pedagogical Explanation */}
      {isChecked && (
        <div
          className={`p-4 rounded-xl border space-y-2 ${
            userAns === currentQ.correctAnswer
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            <span
              className="material-symbols-outlined text-base"
              data-icon={userAns === currentQ.correctAnswer ? 'check_circle' : 'cancel'}
            >
              {userAns === currentQ.correctAnswer ? 'check_circle' : 'cancel'}
            </span>
            <span>
              {userAns === currentQ.correctAnswer
                ? 'Chính xác! Đáp án đúng là ' + currentQ.correctAnswer
                : `Chưa chính xác! Bạn chọn ${userAns}, đáp án chuẩn là ${currentQ.correctAnswer}`}
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            <strong>Phân tích logic:</strong> {currentQ.explanation}
          </p>
          <div className="text-xs bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/30 text-on-surface">
            <span className="font-semibold text-rose-800">Cơ chế bẫy (Distractor Trap):</span>{' '}
            {currentQ.distractorReason}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end gap-3 pt-2">
        {!isChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!userAns}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs sm:text-sm hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-xs"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-semibold text-xs sm:text-sm hover:bg-secondary flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả tổng'}</span>
            <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Doc Viewer for Paraphrase
 */
const DocViewer: React.FC<{ material: CuratedMaterial }> = ({ material }) => {
  const sections = material.docContent?.sections || [];

  return (
    <div className="space-y-6 text-sm">
      <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-xs sm:text-sm text-purple-900 leading-relaxed">
        <strong>Mục tiêu sư phạm:</strong> Khắc phục lỗi đọc tuyến tính (Linear Reading) và mở rộng vốn cụm từ học thuật C1-C2 nhằm ngăn ngừa tình trạng quá tải nhận thức ở Passage 2.
      </div>

      {sections.map((sec, idx) => (
        <div key={idx} className="space-y-3">
          <h4 className="font-bold text-primary font-headline text-base border-b border-outline-variant/40 pb-2">
            {sec.heading}
          </h4>
          <p className="text-on-surface leading-relaxed text-xs sm:text-sm">
            {sec.body}
          </p>
          <div className="space-y-3 pt-2">
            {sec.examples.map((ex, exIdx) => (
              <div
                key={exIdx}
                className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/60 space-y-2 text-xs"
              >
                <div>
                  <span className="font-semibold text-on-surface-variant block">Câu gốc học thuật (IELTS Academic):</span>
                  <p className="font-serif italic text-on-surface bg-surface-container-lowest p-2 rounded border border-outline-variant/40 mt-1">
                    "{ex.original}"
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-emerald-800 block">Bản phân rã ngữ nghĩa (Semantic Paraphrase):</span>
                  <p className="text-on-surface bg-emerald-50/60 p-2 rounded border border-emerald-200 mt-1">
                    {ex.academicParaphrase}
                  </p>
                </div>
                <div className="text-rose-900 bg-rose-50/60 p-2 rounded border border-rose-200">
                  <span className="font-bold">Bẫy thí sinh hay mắc:</span> {ex.trap}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Audio Session Viewer for Listening Distractors
 */
const AudioSessionViewer: React.FC<{ material: CuratedMaterial }> = ({ material }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = material.audioContent;

  return (
    <div className="space-y-5">
      {/* Audio Controller Player Mock */}
      <div className="bg-[#233144] text-[#eaf1ff] p-4 sm:p-5 rounded-xl border border-outline/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#85f8c4]" data-icon="headphones">headphones</span>
            <span className="font-semibold text-xs sm:text-sm truncate">{audio?.title}</span>
          </div>
          <span className="font-mono text-xs text-[#b6c4ff]">{audio?.duration}</span>
        </div>

        {/* Audio Waveform Visualization Simulation */}
        <div className="flex items-center gap-1 h-8 px-2 bg-[#0d1c2e] rounded-lg overflow-hidden">
          {[40, 65, 80, 45, 90, 70, 30, 50, 95, 60, 40, 85, 75, 55, 90, 35, 60, 80, 45, 70, 95, 30, 50, 70, 40].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-[#85f8c4]' : 'bg-[#757682]'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 1 : 0.8))) % 100}%` : `${h * 0.4}%`
              }}
            ></div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center font-bold hover:scale-105 transition-transform cursor-pointer"
              aria-label={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
            >
              <span className="material-symbols-outlined text-lg">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <span className="text-xs text-[#c5c5d3]">
              {isPlaying ? 'Đang phát hội thoại Section 3...' : 'Nhấn phát để nghe bài mẫu'}
            </span>
          </div>
          <span className="text-xs font-mono text-[#85f8c4]">Tốc độ: 1.0x (Chuẩn thi thật)</span>
        </div>
      </div>

      {/* Pedagogical Distractor Tips */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs space-y-1.5 text-amber-950">
        <span className="font-bold flex items-center gap-1 text-amber-900">
          <span className="material-symbols-outlined text-sm" data-icon="tips_and_updates">tips_and_updates</span>
          <span>Bí kíp bắt bẫy Distractors Section 3:</span>
        </span>
        {audio?.distractorTips.map((tip, i) => (
          <p key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-1">
            {tip}
          </p>
        ))}
      </div>

      {/* Script Lines with Distractor Annotations */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
          Lời thoại kèm phân tích chuyển hướng (Transcript with Pedagogical Markers):
        </h4>
        <div className="space-y-2.5">
          {audio?.transcriptLines.map((line, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                line.isDistractor
                  ? 'bg-rose-50/80 border-rose-300'
                  : 'bg-surface-container-low border-outline-variant/40'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-primary">{line.speaker}</span>
                <span className="font-mono text-[11px] text-on-surface-variant">{line.time}</span>
              </div>
              <p className="text-on-surface leading-relaxed">{line.text}</p>
              {line.note && (
                <div className="mt-1.5 p-2 bg-rose-100/60 rounded text-xs text-rose-900 font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm" data-icon="warning">warning</span>
                  <span>{line.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
