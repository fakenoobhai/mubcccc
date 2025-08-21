# Overview

This is a React-based school website application for Monipur Uccha Bidyalaya & College (MUBC), built with a modern tech stack featuring a React frontend with TypeScript and Express.js backend. The application provides a comprehensive school website with features for displaying academic information, teacher profiles, gallery, notices, and an admin panel for content management. The system integrates with Firebase for data storage and authentication, with a responsive design supporting both light/dark themes and bilingual content (Bengali/English).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18 with TypeScript**: Modern React application using functional components and hooks
- **Vite**: Fast build tool and development server for optimized development experience
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with pre-built component library for consistent design
- **Context-based State Management**: Theme and language contexts for global state (no Redux needed)
- **Custom Hooks**: Modular data fetching and authentication logic using custom React hooks

## Backend Architecture
- **Express.js with TypeScript**: RESTful API server with type safety
- **Modular Route Structure**: Clean separation of concerns with dedicated route handlers
- **Memory Storage Implementation**: In-memory data storage with interface-based design for easy database migration
- **Middleware Pipeline**: Request logging, JSON parsing, and error handling middleware

## Database Design
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Schema-first Approach**: Centralized schema definitions in shared directory
- **Migration Support**: Database versioning through Drizzle migrations
- **Zod Integration**: Runtime validation using drizzle-zod for type safety

## Authentication & Authorization
- **Firebase Authentication**: Anonymous sign-in for basic access
- **Hardcoded Admin Credentials**: Simple admin authentication (development approach)
- **Role-based Access**: Admin panel with content management capabilities
- **Client-side Route Protection**: Authentication state management through React context

## Content Management
- **Admin Panel**: Complete CRUD operations for teachers, notices, gallery, and hero slides
- **Real-time Updates**: Firebase Firestore for live data synchronization
- **Image Management**: URL-based image storage with validation
- **Notification System**: Toast notifications for user feedback

## Styling & UI Framework
- **Design System**: shadcn/ui components with Tailwind CSS customization
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Dark Mode Support**: System-wide theme switching with CSS variables
- **Component Library**: Extensive UI components (forms, dialogs, cards, navigation)

## Internationalization
- **Bilingual Support**: Bengali and English language switching
- **Context-based Translation**: Centralized translation management
- **Dynamic Content**: Real-time language switching without page reload

# External Dependencies

## Core Technologies
- **React**: Frontend framework with hooks and context API
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type safety across the entire application
- **Vite**: Build tool and development server
- **Node.js**: Runtime environment for the backend

## Database & ORM
- **PostgreSQL**: Primary database (configured via Drizzle but not actively used yet)
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with schema management
- **Drizzle Kit**: Migration and schema management tools

## Firebase Services
- **Firebase Authentication**: User authentication and anonymous sign-in
- **Cloud Firestore**: Real-time NoSQL database for content storage
- **Firebase SDK**: Complete Firebase integration for web applications

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives for accessibility
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management

## State Management & Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Hookform Resolvers**: Validation integration for forms

## Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TSX**: TypeScript execution for development server

## Utilities & Libraries
- **clsx**: Conditional className utility
- **date-fns**: Date manipulation and formatting
- **zod**: Runtime type validation and schema validation
- **nanoid**: Unique ID generation for client-side operations