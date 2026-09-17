import pypandoc

content = """# Finora HRM Platform

A multi-tenant Human Resource Management (HRM) platform designed for white-label usage by multiple organizations.

## Current Technology Stack

- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Package Manager:** pnpm
- **Authentication:** JWT
- **Authorization:** Role-Based Access Control (RBAC)
- **API Style:** REST
- **Frontend:** React + Vite (planned/in progress)

## Project Structure

```text
hrm-platform/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── auth/
│   │       ├── database/
│   │       ├── employee/
│   │       ├── tenant/
│   │       ├── user/
│   │       ├── department/
│   │       ├── designation/
│   │       ├── location/
│   │       ├── role/
│   │       ├── permission/
│   │       └── app.module.ts
│   └── web/
├── package.json
└── pnpm-workspace.yaml