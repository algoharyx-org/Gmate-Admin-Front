# GMATE - Learning Management System (LMS)

## Product Requirements Document (PRD)

Version: 1.0 (MVP) Tech Stack: Next.js, React, Tailwind CSS, React
Query, Node.js, Express, MongoDB, OAuth, TypeScript

------------------------------------------------------------------------

# 1. Product Overview

## Vision

GMATE is a modern Learning Management System (LMS) that enables
instructors to create structured online courses and allows students to
enroll, consume lessons, and track learning progress.

The MVP focuses on: - Course creation and management - Enrollment
system - Lesson consumption - Progress tracking - Role-based access
control (RBAC) - OAuth authentication

------------------------------------------------------------------------

# 2. Technical Architecture

## Frontend

-   Framework: Next.js (App Router)
-   Language: TypeScript
-   Styling: Tailwind CSS
-   State Management & Server State: React Query (TanStack Query)
-   Form Validation: Zod
-   Auth Handling: JWT stored in HTTP-only cookies

## Backend

-   Runtime: Node.js
-   Framework: Express.js
-   Language: TypeScript
-   Database: MongoDB (Mongoose ODM)
-   Authentication: Google OAuth + JWT
-   Validation: Zod or Joi
-   Security: Helmet, CORS, Rate Limiting

------------------------------------------------------------------------

# 3. User Roles

## Student

-   Login via OAuth
-   Browse courses
-   Enroll in courses
-   Access enrolled courses
-   Complete lessons
-   View progress

## Instructor

-   Create/edit/delete courses
-   Manage sections and lessons
-   View enrolled students
-   Access instructor dashboard

## Admin

-   Manage users
-   Promote users to instructor
-   Moderate/delete courses

------------------------------------------------------------------------

# 4. Core Functional Requirements

## 4.1 Authentication

Endpoints: - POST /api/auth/oauth - GET /api/auth/me - POST
/api/auth/logout

Requirements: - OAuth (Google) - JWT-based session - Role-based
middleware - Protected routes

------------------------------------------------------------------------

## 4.2 Course Management

Course Fields: - title - description - thumbnail - instructorId -
category - level (Beginner \| Intermediate \| Advanced) - published -
createdAt - updatedAt

Endpoints: - POST /api/courses - GET /api/courses - GET
/api/courses/:id - PUT /api/courses/:id - DELETE /api/courses/:id

Rules: - Only instructors can create courses - Only course owner can
edit/delete - Only published courses visible to students

------------------------------------------------------------------------

## 4.3 Sections

Fields: - title - courseId - order

Endpoints: - POST /api/courses/:courseId/sections - PUT
/api/sections/:id - DELETE /api/sections/:id

------------------------------------------------------------------------

## 4.4 Lessons

Fields: - title - content - videoUrl - sectionId - order - duration

Endpoints: - POST /api/sections/:sectionId/lessons - PUT
/api/lessons/:id - DELETE /api/lessons/:id - GET /api/lessons/:id

------------------------------------------------------------------------

## 4.5 Enrollment

Fields: - userId - courseId - enrolledAt

Endpoints: - POST /api/courses/:courseId/enroll - GET
/api/users/me/courses

Rules: - User can enroll only once - Must be authenticated

------------------------------------------------------------------------

## 4.6 Progress Tracking

Fields: - userId - lessonId - completed - completedAt

Endpoints: - POST /api/lessons/:lessonId/complete - GET
/api/courses/:courseId/progress

Progress Calculation: completionPercentage = completedLessons /
totalLessons \* 100

------------------------------------------------------------------------

# 5. Database Models (MongoDB)

## User

-   \_id
-   name
-   email
-   role (student \| instructor \| admin)
-   oauthProvider
-   createdAt

## Course

-   \_id
-   title
-   description
-   thumbnail
-   instructorId
-   category
-   level
-   published
-   createdAt
-   updatedAt

## Section

-   \_id
-   title
-   courseId
-   order

## Lesson

-   \_id
-   title
-   content
-   videoUrl
-   sectionId
-   order
-   duration

## Enrollment

-   \_id
-   userId
-   courseId
-   enrolledAt

## Progress

-   \_id
-   userId
-   lessonId
-   completed
-   completedAt

------------------------------------------------------------------------

# 6. Frontend Pages

Public: - / - /courses - /courses/\[id\] - /login

Student: - /dashboard - /my-courses - /learn/\[courseId\]

Instructor: - /instructor - /instructor/courses -
/instructor/courses/new - /instructor/courses/\[id\]/edit

Admin: - /admin - /admin/users - /admin/courses

------------------------------------------------------------------------

# 7. Non-Functional Requirements

Performance: - Pagination on course listing - MongoDB indexing on
courseId, instructorId, userId

Security: - JWT verification middleware - Role-based authorization -
Input validation - CORS configuration - Rate limiting

Scalability: - Modular folder structure - Separation of concerns
(controllers, services, models) - Environment-based configuration

------------------------------------------------------------------------

# 8. Deployment

Frontend: Vercel Backend: Railway / Render Database: MongoDB Atlas

Required Environment Variables: - MONGO_URI - JWT_SECRET -
GOOGLE_CLIENT_ID - GOOGLE_CLIENT_SECRET - FRONTEND_URL

------------------------------------------------------------------------

# 9. MVP Completion Criteria

The MVP is complete when: - OAuth login works - Instructors can create
structured courses - Students can enroll - Lesson completion updates
progress - Protected routes enforce roles - Application runs in
production environment

------------------------------------------------------------------------

# 10. Post-MVP Enhancements

-   Stripe integration
-   AI quiz generator
-   AI tutor assistant
-   Certificates (PDF)
-   Reviews & ratings
-   Notifications
-   Advanced analytics

------------------------------------------------------------------------

End of Document
