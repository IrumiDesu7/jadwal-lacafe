# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application called "jadwal-lacafe" (Indonesian for "cafe schedule"). It's a drag-and-drop schedule manager for coffee shop staff with features for managing shifts (PAGI/MALAM/LIBUR) and staff assignments.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production (runs TypeScript checks first)
pnpm build

# Preview production build
pnpm preview

# Run ESLint
pnpm lint

# Add new shadcn components
pnpm dlx shadcn@latest add [component-name]
```

## Tech Stack

- **React**: 19.1.0
- **TypeScript**: 5.8.3 (strict mode enabled)
- **Vite**: 7.0.2
- **Package Manager**: pnpm
- **Build**: Vite with @vitejs/plugin-react
- **UI**: Tailwind CSS 4.1.11 + Shadcn/UI components
- **Icons**: Lucide React 0.525.0
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Styling Utils**: clsx, tailwind-merge, class-variance-authority

## Application Architecture

### Core Features
- **Drag & Drop Schedule Management**: Staff can be reordered, shifts can be dragged to schedule cells
- **Staff Management**: Add/remove staff members with dialog interface
- **Indonesian Day Headers**: Uses Indonesian day names (Senin-Minggu)
- **Three Shift Types**: PAGI (morning), MALAM (night), LIBUR (off)
- **Color-coded Shifts**: Green for PAGI, Blue for MALAM, Gray for LIBUR

### Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── schedule/              # Schedule-specific components
│   │   ├── ScheduleTable.tsx  # Main table with drag/drop context
│   │   ├── ScheduleCell.tsx   # Individual schedule cells (droppable)
│   │   ├── DraggableStaffName.tsx  # Staff name (sortable)
│   │   ├── DraggableShift.tsx      # Shift badges (draggable)
│   │   └── StaffManager.tsx        # Add/remove staff dialog
│   └── ScheduleManager.tsx    # Main app component
├── hooks/
│   └── useSchedule.ts         # Schedule state management
├── types/
│   └── schedule.ts            # Type definitions & constants
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
└── App.tsx                   # Root component
```

### Data Model

```typescript
type ShiftType = 'PAGI' | 'MALAM' | 'LIBUR';
type DayOfWeek = 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU' | 'MINGGU';

interface Staff {
  id: string;
  name: string;
}

interface Schedule {
  [staffId: string]: {
    [day in DayOfWeek]: ShiftType;
  };
}
```

### Drag & Drop Implementation

- **@dnd-kit/core**: Main drag and drop functionality
- **@dnd-kit/sortable**: Staff reordering in left column
- **@dnd-kit/utilities**: Transform utilities for animations

**Drag Sources:**
- Staff names (sortable within left column)
- Shift badges (draggable to schedule cells)

**Drop Targets:**
- Schedule cells (accept shift changes)
- Staff name positions (for reordering)

### State Management

Uses React hooks with `useSchedule` custom hook:
- Staff list management (add/remove/reorder)
- Schedule state (staff assignments per day)
- Optimistic updates for drag operations

## TypeScript Configuration

The project uses strict TypeScript settings with project references:
- `tsconfig.app.json` - Application code
- `tsconfig.node.json` - Build tool configuration

Key settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- Target: ES2022
- JSX Transform: react-jsx
- Path aliases: `@/*` maps to `./src/*`
- Use `type`-only imports for types when `verbatimModuleSyntax` is enabled

## Code Standards

1. TypeScript strict mode enabled - no `any` types
2. ESLint configured for React and TypeScript
3. React 19 with new JSX transform (no React import needed)
4. Tailwind CSS for styling with Shadcn/UI component system
5. Use `cn()` utility from `@/lib/utils` for conditional class names
6. Color-coded shifts via `SHIFT_COLORS` constant in types
7. Indonesian localization for day names and UI text

## Important Notes

- No testing framework is currently installed
- No routing library (React Router) is configured
- No external state management library (uses React hooks)
- No API client - all data managed locally
- Drag and drop constraints prevent invalid operations
- Staff can only be reordered within the name column
- Shifts can be clicked to cycle through types or dragged to change