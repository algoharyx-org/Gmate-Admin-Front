import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type NotificationType = "task" | "deadline" | "system" | "mention";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  hasLink: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "task",
    title: "New Task Assigned",
    message: "Sarah Chen assigned you to 'Review Button States'.",
    time: "15m ago",
    read: false,
    hasLink: true,
  },
  {
    id: 4,
    type: "mention",
    title: "Marcus mentioned you",
    message: "@Alex, what do you think about the new API auth flow?",
    time: "1h ago",
    read: false,
    hasLink: true,
  },
];

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "time">) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((n: Omit<Notification, "id" | "read" | "time">) => {
    const newNotif: Notification = {
      ...n,
      id: Date.now(),
      read: false,
      time: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
