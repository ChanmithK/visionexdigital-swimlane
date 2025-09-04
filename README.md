# Swimlane Dashboard

A modern, responsive task management dashboard built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features drag-and-drop functionality, real-time search, and persistent data storage.

## ✨ Features

- 🎯 **Drag & Drop Interface** - Intuitive task management with smooth animations
- 🔍 **Real-time Search** - Instantly filter tasks as you type
- 💾 **Persistent Storage** - Tasks saved in localStorage for session persistence
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop (768px+)
- 🎨 **Modern UI/UX** - Clean design with Tailwind CSS styling
- ⚡ **High Performance** - Built with Next.js 15 and React 19
- 🔧 **TypeScript** - Full type safety throughout the application
- 🏗️ **Component Architecture** - Modular and maintainable code structure

## 🎯 Task Management

### Swimlane Columns

- **To Do** - Gray badge for pending tasks
- **In Progress** - Orange badge for active work
- **Approved** - Green badge for completed tasks
- **Reject** - Red badge for rejected items

### Task Features

- Drag tasks between swimlanes
- Task categories with color coding
- Team member avatars
- Due dates and priority indicators
- Attachment and comment counts
- Group calls and stream indicators

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ChanmithK/visionexdigital-swimlane.git
   cd visionexdigital-swimlane
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build the application for production    |
| `npm start`     | Start the production server             |
| `npm run lint`  | Run ESLint for code quality             |

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── Dashboard.tsx     # Main dashboard layout
│   ├── Header.tsx        # Top navigation header
│   ├── Sidebar.tsx       # Left navigation sidebar
│   ├── ProjectHeader.tsx # Project information header
│   ├── Swimlane.tsx      # Individual swimlane column
│   └── TaskCard.tsx      # Individual task card
├── store/                # State management
│   └── taskStore.ts      # Zustand store for tasks
├── types/                # TypeScript definitions
│   └── task.ts          # Task and swimlane interfaces
public/                   # Static assets
├── logo.png             # Application logo
├── Image-team.png       # Team avatar image
└── Image-placeholder.png # Task placeholder image
```

## 🛠️ Technology Stack

### Core Technologies

- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management & Interactions

- **[Zustand 5.0.8](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[@dnd-kit](https://dndkit.com/)** - Modern drag-and-drop toolkit
  - `@dnd-kit/core` - Core drag-and-drop functionality
  - `@dnd-kit/sortable` - Sortable list components
  - `@dnd-kit/utilities` - Utility functions

### UI & Icons

- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting and quality
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🎨 Design System

### Color Palette

- **To Do**: `bg-gray-200 text-gray-700`
- **In Progress**: `bg-orange-400 text-white`
- **Approved**: `bg-green-500 text-white`
- **Reject**: `bg-red-500 text-white`

### Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px)
- **Large**: `lg:` (≥ 1024px)

### Key Design Principles

- Mobile-first responsive design
- Consistent spacing and typography
- Accessible color contrast
- Smooth animations and transitions
- Touch-friendly interactive elements

## 🔧 Configuration

### Next.js Configuration

- **Turbopack** enabled for faster builds
- **App Router** architecture
- **TypeScript** strict mode
- **ESLint** integration

### Tailwind CSS

- **Version 4** with latest features
- **Custom color scheme** for task status
- **Responsive utilities** for all breakpoints
- **PostCSS** integration

## 📱 Responsive Design

### Mobile (< 640px)

- Sidebar hidden, accessible via menu
- Swimlanes: `min-w-64 w-64`
- Horizontal scrolling for swimlanes
- Touch-optimized interactions

### Tablet (≥ 768px)

- Sidebar visible with proper flex behavior
- Swimlanes: `md:min-w-80 md:w-80`
- Improved header spacing and alignment
- Touch-friendly sizing maintained

### Desktop (≥ 1024px)

- Full sidebar navigation
- Optimal swimlane widths
- Enhanced hover states
- Keyboard navigation support

## 💾 Data Management

### Storage Strategy

- **localStorage** for task persistence
- **Zustand** for real-time state management
- **Mock data** for initial application state
- **Automatic synchronization** between storage and state

### Data Flow

1. **Initialization**: Load tasks from localStorage or fallback to mock data
2. **Updates**: Real-time state updates via Zustand
3. **Persistence**: Automatic save to localStorage on changes
4. **Search**: Dynamic filtering without storage changes

## 🔍 Search Functionality

- **Real-time filtering** as you type
- **Multi-field search** across task titles and categories
- **Case-insensitive** matching
- **Instant results** with no performance impact
- **Clear search** functionality

## 🎭 Drag & Drop Features

### Capabilities

- **Cross-swimlane** task movement
- **Visual feedback** during drag operations
- **Drop zone indicators** for valid targets
- **Smooth animations** and transitions
- **Touch support** for mobile devices
- **Keyboard navigation** for accessibility

### Interaction States

- **Hover effects** on draggable items
- **Active drag** visual feedback
- **Drop zone highlighting** when hovering
- **Invalid drop** prevention
- **Snap-back animation** for failed drops

## 🚀 Performance Optimizations

- **React.memo** for component optimization
- **useMemo** and **useCallback** for expensive operations
- **Lazy loading** for better initial load times
- **Optimized re-renders** with proper state management
- **Efficient drag-and-drop** with minimal DOM updates

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** with touch support

## 🔨 Development

### Code Quality

- **ESLint** for code standards
- **TypeScript** for type safety
- **Consistent formatting** and style
- **Component-based architecture**
- **Proper error handling**

### Best Practices

- **Mobile-first** responsive design
- **Accessibility** considerations
- **Performance** optimizations
- **Type safety** throughout
- **Modular** component structure

### Environment Variables

No environment variables required for basic functionality.

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **dnd-kit** for the drag-and-drop functionality
- **Zustand** for lightweight state management
- **Lucide** for beautiful icons
