import {
  ClipboardList,
  TriangleAlert,
  Info,
  AtSign,
  Clock,
  Check,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { useNotifications, type NotificationType } from "@/context/NotificationContext";

type FilterTab = "All" | "Unread" | "Tasks" | "Mentions";

type TypeStyle = {
  icon: React.ReactNode;
  iconBgClass: string;
  iconColorClass: string;
  unreadBorderClass: string;
  unreadTitleClass: string;
};

const TYPE_STYLES: Record<NotificationType, TypeStyle> = {
  task: {
    icon: <ClipboardList size={18} />,
    iconBgClass: "bg-indigo-500/10",
    iconColorClass: "text-indigo-600 dark:text-indigo-400",
    unreadBorderClass: "border-l-indigo-600 dark:border-l-indigo-400",
    unreadTitleClass: "text-indigo-600 dark:text-indigo-400",
  },
  deadline: {
    icon: <TriangleAlert size={18} />,
    iconBgClass: "bg-rose-500/10",
    iconColorClass: "text-rose-600 dark:text-rose-400",
    unreadBorderClass: "border-l-rose-600 dark:border-l-rose-400",
    unreadTitleClass: "text-foreground",
  },
  system: {
    icon: <Info size={18} />,
    iconBgClass: "bg-slate-500/10",
    iconColorClass: "text-slate-600 dark:text-slate-400",
    unreadBorderClass: "border-l-slate-600 dark:border-l-slate-400",
    unreadTitleClass: "text-slate-600 dark:text-slate-400",
  },
  mention: {
    icon: <AtSign size={18} />,
    iconBgClass: "bg-indigo-500/10",
    iconColorClass: "text-indigo-600 dark:text-indigo-400",
    unreadBorderClass: "border-l-indigo-600 dark:border-l-indigo-400",
    unreadTitleClass: "text-indigo-600 dark:text-indigo-400",
  },
};

const TABS: FilterTab[] = ["All", "Unread", "Tasks", "Mentions"];

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const [tab, setTab] = useState<FilterTab>("All");

  const visible = notifications.filter((n) => {
    if (tab === "Unread") return !n.read;
    if (tab === "Tasks") return n.type === "task";
    if (tab === "Mentions") return n.type === "mention";
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <h1 className="text-3xl font-black tracking-tight leading-none">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-indigo-600 text-white rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest animate-pulse">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium text-center sm:text-left">
            Stay updated with your latest activities and mentions.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-white/10 px-5 py-2 text-xs font-bold transition-all hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95"
        >
          <Check size={14} />
          Mark all as read
        </button>
      </div>

      <div className="border-b border-slate-200 dark:border-white/5">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                tab === t
                  ? "text-indigo-600 dark:text-white"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-200 dark:border-white/5 rounded-[2rem] bg-white/30 dark:bg-white/5">
            <Bell size={40} className="text-slate-200 dark:text-slate-800 mb-4" />
            <p className="text-slate-400 font-medium">No notifications found.</p>
          </div>
        )}

        {visible.map((notif) => {
          const ts = TYPE_STYLES[notif.type];
          return (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`group relative flex gap-5 rounded-[2rem] border p-6 transition-all duration-300 cursor-pointer ${
                !notif.read 
                  ? "bg-white dark:bg-white/5 border-indigo-500/20 shadow-md" 
                  : "bg-white/50 dark:bg-transparent border-slate-200 dark:border-white/5 opacity-70 hover:opacity-100"
              }`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-transform group-hover:scale-110 ${ts.iconBgClass} border-current/10 ${ts.iconColorClass}`}>
                {ts.icon}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-black tracking-tight ${!notif.read ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                    {notif.title}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase">
                    <Clock size={12} className="opacity-50" />
                    {notif.time}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">
                  {notif.message}
                </p>

                {notif.hasLink && (
                  <div className="pt-3">
                    <button className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-all">
                      View details
                      <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>
              
              {!notif.read && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-indigo-600 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
