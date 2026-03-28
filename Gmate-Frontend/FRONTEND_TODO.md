# GMATE Frontend – React/Next.js Todo List

Based on **GMATE_PRD.md**. Stack: **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **React Query**, **Zod**, JWT in HTTP-only cookies.

---

## 1. Project setup

- [ ] **1.1** Scaffold Next.js app with App Router, TypeScript, Tailwind CSS
- [ ] **1.2** Add dependencies: `@tanstack/react-query`, `zod`, and any auth/API helpers
- [ ] **1.3** Configure React Query provider and base API URL (e.g. `NEXT_PUBLIC_API_URL`)

---

## 2. Authentication

- [ ] **2.1** API client for auth: `POST /api/auth/oauth`, `GET /api/auth/me`, `POST /api/auth/logout`
- [ ] **2.2** Auth context/store (user, role, loading, login/logout)
- [ ] **2.3** Protected route wrapper/middleware (redirect to `/login` if not authenticated)
- [ ] **2.4** Role-based guards (student / instructor / admin) for route access
- [ ] **2.5** Login page `/login` with Google OAuth trigger

---

## 3. Public pages

- [ ] **3.1** **/** – Home (hero, featured courses, CTA to browse/login)
- [ ] **3.2** **/courses** – Course listing (published only), with pagination
- [ ] **3.3** **/courses/[id]** – Course detail (title, description, thumbnail, level, category, enroll CTA for students)
- [ ] **3.4** **/login** – OAuth login entry (link/button to backend OAuth flow)

---

## 4. Student pages

- [ ] **4.1** **/dashboard** – Student dashboard (overview, recent progress, quick links)
- [ ] **4.2** **/my-courses** – List enrolled courses (from `GET /api/users/me/courses`)
- [ ] **4.3** **/learn/[courseId]** – Learning view: sections/lessons sidebar, lesson content/video, “Complete lesson” and progress %

---

## 5. Instructor pages

- [ ] **5.1** **/instructor** – Instructor dashboard (stats, quick actions)
- [ ] **5.2** **/instructor/courses** – List instructor’s courses (create/edit/delete)
- [ ] **5.3** **/instructor/courses/new** – Create course (form: title, description, thumbnail, category, level, published)
- [ ] **5.4** **/instructor/courses/[id]/edit** – Edit course + manage sections & lessons
- [ ] **5.5** Sections UI: add/edit/delete sections, set order
- [ ] **5.6** Lessons UI: add/edit/delete lessons (title, content, videoUrl, duration, order)

---

## 6. Admin pages

- [ ] **6.1** **/admin** – Admin dashboard
- [ ] **6.2** **/admin/users** – User list, promote to instructor
- [ ] **6.3** **/admin/courses** – Moderate/delete courses

---

## 7. Enrollment & progress

- [ ] **7.1** Enroll button on course detail → `POST /api/courses/:courseId/enroll` (one-time, authenticated)
- [ ] **7.2** “Complete lesson” in learn view → `POST /api/lessons/:lessonId/complete`
- [ ] **7.3** Progress display: `GET /api/courses/:courseId/progress`, show completion % (completedLessons / totalLessons × 100)

---

## 8. Shared UI & UX

- [ ] **8.1** Root layout with header/footer and role-based navigation (public / student / instructor / admin)
- [ ] **8.2** Loading skeletons/spinners for async data
- [ ] **8.3** Error boundaries and API error handling (toast or inline messages)
- [ ] **8.4** Pagination on course listing (align with backend pagination)
- [ ] **8.5** Form validation with Zod on create/edit course and lesson forms

---

## Page summary (from PRD)

| Role    | Routes |
|--------|--------|
| Public | `/`, `/courses`, `/courses/[id]`, `/login` |
| Student | `/dashboard`, `/my-courses`, `/learn/[courseId]` |
| Instructor | `/instructor`, `/instructor/courses`, `/instructor/courses/new`, `/instructor/courses/[id]/edit` |
| Admin | `/admin`, `/admin/users`, `/admin/courses` |

---

## API surface (for reference)

- Auth: `POST /api/auth/oauth`, `GET /api/auth/me`, `POST /api/auth/logout`
- Courses: `POST/GET /api/courses`, `GET/PUT/DELETE /api/courses/:id`
- Sections: `POST /api/courses/:courseId/sections`, `PUT/DELETE /api/sections/:id`
- Lessons: `POST /api/sections/:sectionId/lessons`, `GET/PUT/DELETE /api/lessons/:id`
- Enrollment: `POST /api/courses/:courseId/enroll`, `GET /api/users/me/courses`
- Progress: `POST /api/lessons/:lessonId/complete`, `GET /api/courses/:courseId/progress`

---

Tick off items in this file as you complete them. The in-editor todo list mirrors the same phases for quick tracking.
