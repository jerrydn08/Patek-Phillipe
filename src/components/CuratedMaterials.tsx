/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CuratedMaterial } from '../logic/pedagogicalEngine';

interface CuratedMaterialsProps {
  materials: CuratedMaterial[];
  onOpenMaterial: (material: CuratedMaterial) => void;
  highlightedCode?: string | null;
}

export const CuratedMaterials: React.FC<CuratedMaterialsProps> = ({
  materials,
  onOpenMaterial,
  highlightedCode
}) => {
  return (
    <section
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-5 sm:p-6 shadow-xs"
      id="curated-bank"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-5 mb-5 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="menu_book">menu_book</span>
            <h2 className="text-xl font-bold text-primary font-headline">Ngân Hàng Học Liệu Đã Xác Thực</h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Nguồn tài nguyên trích xuất nguyên bản từ kho tài liệu đã được thẩm định học thuật
          </p>
        </div>
        {/* Material availability status badge */}
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <span className="material-symbols-outlined text-sm text-emerald-700" data-icon="check_circle">check_circle</span>
          <span>Trạng thái: Đủ học liệu cho 3 bước tiếp theo</span>
        </div>
      </div>

      {/* Curated Materials Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materials.map((mat) => {
          const isHighlighted = highlightedCode === mat.code;

          return (
            <div
              key={mat.id}
              id={`card-${mat.code}`}
              className={`border bg-surface-container-lowest rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 ${
                isHighlighted
                  ? 'border-2 border-primary ring-2 ring-primary/30'
                  : mat.code === 'MAT-RD-01'
                  ? 'border-2 border-primary/40'
                  : 'border-outline-variant/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                      mat.code === 'MAT-RD-01'
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {mat.code}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold border ${mat.difficultyColor}`}>
                    Độ khó: {mat.difficulty}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-on-surface leading-snug font-headline">
                  {mat.title}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {mat.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                <span
                  className={`text-xs font-semibold flex items-center gap-1 ${
                    mat.code === 'MAT-RD-01' ? 'text-emerald-700' : 'text-on-surface-variant'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={
                      mat.type === 'practice' ? 'task' : mat.type === 'doc' ? 'library_books' : 'headphones'
                    }
                  >
                    {mat.type === 'practice' ? 'task' : mat.type === 'doc' ? 'library_books' : 'headphones'}
                  </span>
                  <span>{mat.stepMatch || 'Học liệu bổ trợ'}</span>
                </span>
                <button
                  onClick={() => onOpenMaterial(mat)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    mat.type === 'practice'
                      ? 'bg-primary-container text-on-primary hover:bg-secondary'
                      : 'border border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                  aria-label={`${mat.actionText} ${mat.code}`}
                >
                  {mat.actionText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
