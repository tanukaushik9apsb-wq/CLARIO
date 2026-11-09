import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, CheckSquare, Square, ExternalLink, 
  Clock, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Bell, ShieldCheck
} from 'lucide-react';

export const DeadlineCalendarView: React.FC = () => {
  const { deadlines, checklistTasks, toggleChecklistTask, showToast } = useApp();

  const [viewMode, setViewMode] = useState<'calendar' | 'checklist'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const completedCount = checklistTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / checklistTasks.length) * 100);

  // October 2026 Calendar Grid (Starts on Thursday Oct 1)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 4; // Thursday offset

  const getDeadlinesForDay = (day: number) => {
    const dayStr = `2026-10-${day < 10 ? '0' + day : day}`;
    return deadlines.filter(d => d.date === dayStr);
  };

  return (
    <div className="min-h-screen bg-[#101A3A] text-[#F8F8FC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#FFF2D8]/15">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8CB7FF] font-semibold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Time-Critical Milestones</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#FFF2D8]">
              Deadline Calendar & Checklist
            </h1>
            <p className="text-xs sm:text-sm text-[#A8B3D4] mt-2 max-w-2xl leading-relaxed">
              Track mandatory choice locking cutoffs, fee payment dates, and physical reporting annexures. 
              Complete tasks step-by-step to protect your allotted seat.
            </p>
          </div>

          {/* View Mode Toggle Pill */}
          <div className="flex items-center p-1 rounded-full bg-[#142147] border border-[#FFF2D8]/15 text-xs">
            <button
              onClick={() => setViewMode('calendar')}
              className={`py-2 px-4 rounded-full font-medium transition-all ${
                viewMode === 'calendar' ? 'bg-[#FFF2D8] text-[#101A3A] font-semibold' : 'text-[#A8B3D4] hover:text-[#FFF2D8]'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('checklist')}
              className={`py-2 px-4 rounded-full font-medium transition-all ${
                viewMode === 'checklist' ? 'bg-[#FFF2D8] text-[#101A3A] font-semibold' : 'text-[#A8B3D4] hover:text-[#FFF2D8]'
              }`}
            >
              Action Checklist ({completedCount}/{checklistTasks.length})
            </button>
          </div>
        </div>

        {/* Counselling Completion Progress Bar */}
        <div className="bg-[#142147] rounded-2xl border border-[#FFF2D8]/15 p-5 mb-8 shadow-md">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2 font-medium text-[#FFF2D8]">
              <CheckCircle2 className="w-4 h-4 text-[#27866B]" />
              <span>Counselling Readiness Progress</span>
            </div>
            <span className="font-mono text-[#8CB7FF] font-bold">{progressPercent}% Completed</span>
          </div>

          <div className="w-full h-2.5 bg-[#101A3A] rounded-full overflow-hidden border border-[#FFF2D8]/10">
            <div
              className="h-full bg-gradient-to-r from-[#27866B] to-[#8CB7FF] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-[#A8B3D4] mt-2">
            {checklistTasks.length - completedCount} action items remaining before final seat allotment reporting.
          </div>
        </div>

        {/* 1. CALENDAR VIEW */}
        {viewMode === 'calendar' && (
          <div className="bg-[#142147] rounded-2xl border border-[#FFF2D8]/15 p-6 shadow-xl">
            
            {/* Month Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#FFF2D8]/10">
              <div className="font-serif text-2xl text-[#FFF2D8] font-normal">
                {selectedMonth}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A8B3D4]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Priority</span>
                <span className="flex items-center gap-1.5 ml-3"><span className="w-2.5 h-2.5 rounded-full bg-[#8CB7FF]"></span> Standard Window</span>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#A8B3D4] mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty leading days */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[85px] sm:min-h-[105px] rounded-xl bg-[#101A3A]/30 border border-transparent"></div>
              ))}

              {daysInMonth.map((day) => {
                const dayDeadlines = getDeadlinesForDay(day);
                const isToday = day === 14;

                return (
                  <div
                    key={day}
                    className={`min-h-[85px] sm:min-h-[105px] rounded-xl p-2 border flex flex-col justify-between transition-all ${
                      isToday
                        ? 'bg-[#172F91]/30 border-[#8CB7FF] shadow-[0_0_15px_rgba(140,183,255,0.2)]'
                        : dayDeadlines.length > 0
                        ? 'bg-[#101A3A] border-[#FFF2D8]/20 hover:border-[#FFF2D8]/40'
                        : 'bg-[#101A3A]/60 border-[#FFF2D8]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-medium ${isToday ? 'text-[#8CB7FF] font-bold' : 'text-[#FFF2D8]'}`}>
                        {day}
                      </span>
                      {isToday && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#8CB7FF] text-[#101A3A] font-bold">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 mt-1">
                      {dayDeadlines.map((dl) => (
                        <div
                          key={dl.id}
                          className={`p-1 sm:p-1.5 rounded text-[10px] sm:text-[11px] leading-tight font-medium truncate ${
                            dl.priority === 'High'
                              ? 'bg-red-950/70 border border-red-500/40 text-red-200'
                              : 'bg-[#172F91]/60 border border-[#8CB7FF]/30 text-[#FFF2D8]'
                          }`}
                          title={`${dl.authority}: ${dl.title}`}
                        >
                          <span className="font-semibold block sm:inline">{dl.authority}: </span>
                          <span className="truncate">{dl.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upcoming Next 3 Critical Dates */}
            <div className="mt-8 pt-6 border-t border-[#FFF2D8]/10">
              <h4 className="font-serif text-lg text-[#FFF2D8] font-normal mb-3">
                Key Approaching Deadlines
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {deadlines.slice(0, 3).map((dl) => (
                  <div key={dl.id} className="p-3 rounded-xl bg-[#101A3A] border border-[#FFF2D8]/10 flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#FFF2D8]">{dl.title}</div>
                      <div className="text-[11px] text-[#A8B3D4]">Date: {dl.date} • {dl.authority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. CHECKLIST VIEW */}
        {viewMode === 'checklist' && (
          <div className="bg-[#142147] rounded-2xl border border-[#FFF2D8]/15 overflow-hidden shadow-xl">
            <div className="p-5 border-b border-[#FFF2D8]/10 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#FFF2D8] font-normal">
                Personalized Counselling Action Checklist
              </h3>
              <span className="text-xs text-[#A8B3D4]">
                Tick each task as you complete official submission
              </span>
            </div>

            <div className="divide-y divide-[#FFF2D8]/10">
              {checklistTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleChecklistTask(task.id)}
                  className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                    task.completed ? 'bg-[#101A3A]/40' : 'hover:bg-[#101A3A]/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      className="mt-0.5 text-[#FFF2D8] hover:text-[#8CB7FF] transition-colors"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-[#27866B]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#A8B3D4]" />
                      )}
                    </button>

                    <div>
                      <div className={`text-xs sm:text-sm font-medium ${
                        task.completed ? 'line-through text-[#A8B3D4]' : 'text-[#FFF2D8]'
                      }`}>
                        {task.title}
                      </div>

                      <div className="text-[11px] text-[#A8B3D4] flex flex-wrap items-center gap-3 mt-1">
                        <span>Authority: <strong className="text-[#8CB7FF]">{task.authority}</strong></span>
                        <span>Deadline: <strong className="text-amber-300">{task.deadline}</strong></span>
                        <span>Category: {task.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={task.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#101A3A] border border-[#FFF2D8]/15 text-[#8CB7FF] hover:text-[#FFF2D8] flex items-center gap-1 text-[11px]"
                      title="Open Official Documentation Link"
                    >
                      <span>Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#101A3A]/80 border-t border-[#FFF2D8]/10 text-center text-xs text-[#A8B3D4]">
              Marking a task complete tracks your progress locally. It does not replace submission on the respective government portal.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
