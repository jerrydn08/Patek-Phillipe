/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Array<{
    id: string;
    title: string;
    time: string;
    description: string;
    type: 'rule' | 'sample' | 'milestone';
  }>;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-on-background/30 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-surface-container-lowest max-w-sm w-full h-full shadow-2xl border-l border-outline-variant flex flex-col">
        <div className="p-4 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="notifications">notifications</span>
            <h3 className="font-bold text-primary font-headline text-base">Thông Báo Thuật Toán</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-md cursor-pointer"
            aria-label="Đóng thông báo"
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <div className="p-4 overflow-y-auto custom-scroll flex-1 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-surface-container-low/50 rounded-xl border border-outline-variant/40 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{n.title}</span>
                <span className="text-[11px] text-on-surface-variant font-mono">{n.time}</span>
              </div>
              <p className="text-on-surface leading-relaxed">{n.description}</p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-outline-variant/40 text-center bg-surface-container-low text-xs text-on-surface-variant">
          Mọi quyết định đều giải trình được qua Console Trace.
        </div>
      </div>
    </div>
  );
};
