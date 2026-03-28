import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./Layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import MyTasksPage from "./pages/dashboard/MyTasksPage";
import ProjectsDashboard from "./pages/dashboard/projects/ProjectsDashboard";
import ProjectDetailsPage from "./pages/dashboard/projects/ProjectDetailsPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyPasswordCode from "./pages/VerifyPasswordCode";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/dashboard/ProfilePage";
import EditProfilePage from "./pages/dashboard/EditProfilePage";
import { NotificationProvider } from "./context/NotificationContext";
import TaskDetails from "./pages/TaskDetails";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import TeamPage from "./pages/dashboard/TeamPage";
import TimelinePage from "./pages/dashboard/TimelinePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/verifyPasswordCode"
                element={<VerifyPasswordCode />}
              />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardPage />} />
                <Route path="my-tasks" element={<MyTasksPage />} />
                <Route path="tasks/:id" element={<TaskDetails />} />
                <Route path="projects" element={<ProjectsDashboard />} />
                <Route
                  path="projects/:projectId"
                  element={<ProjectDetailsPage />}
                />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/edit" element={<EditProfilePage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="timeline" element={<TimelinePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster richColors position="top-center" expand={true} />
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
