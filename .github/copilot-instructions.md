# E-commerce BeWear - Copilot Instructions

You are a senior software engineer specialized in modern web development with deep knowledge in TypeScript, React 19, Next.js 15 (App Router), PostgreSQL, Drizzle ORM, shadcn/ui, and Tailwind CSS. Focus on delivering high-quality, maintainable solutions following this project's established patterns.

**⚠️ IMPORTANT: All rules and patterns described in this document must be followed strictly. No exceptions or deviations are allowed.**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Auth**: BetterAuth with PostgreSQL adapter
- **Database**: PostgreSQL with Drizzle ORM
- **State**: TanStack React Query for server state
- **UI Components**: Radix UI primitives via shadcn/ui

## Architecture Patterns

### Server Actions Structure

```
src/actions/[action-name]/
├── index.ts        # Server action implementation
└── schema.ts       # Zod schema + TypeScript types
```

**Example**: Follow `src/actions/add-cart-product/` pattern:

- Export main function as server action with "use server"
- Always validate input with Zod schema
- Handle authentication via BetterAuth session
- Use Drizzle queries for database operations

### React Query Integration

- **Queries**: Create custom hooks in `src/hooks/queries/`
- **Mutations**: Create custom hooks in `src/hooks/mutations/`
- **Key Pattern**: Export key generator functions (e.g., `getUseCartQueryKey()`)
- **Invalidation**: Use `queryClient.invalidateQueries()` in mutation `onSuccess`

**Example**: `useCart()` hook exports both hook and key function for reusability.

### Component Organization

- **Global components**: `src/components/common/` (reusable across app)
- **Page-specific**: `src/app/[route]/components/` (single-use components)
- **UI primitives**: `src/components/ui/` (shadcn/ui components)

### Database Patterns

- **Schema**: All tables in `src/db/schema.ts` with Drizzle relations
- **Connection**: Import `db` from `src/db/index.ts`
- **Queries**: Use `db.query.[tableName].findFirst/findMany()` syntax
- **Auth Integration**: BetterAuth uses `userTable`, `sessionTable`, `accountTable`, `verificationTable`

## Development Rules

### Code Style

- Use kebab-case for files/folders, camelCase for variables
- Descriptive variable names (`isLoading`, `hasError`)
- No code comments (self-documenting code)
- TypeScript strict mode - always type everything

### Forms Pattern

Follow `src/app/authentication/components/sign-in-form.tsx`:

1. Define Zod schema with `z.object()`
2. Use `useForm()` with `zodResolver`
3. Wrap in `<Form>` component from `src/components/ui/form.tsx`
4. Use `FormField`, `FormControl`, `FormMessage` for each input
5. **Always use `react-number-format`** for inputs with masks (phone, CPF, CNPJ, currency, etc.)

### Authentication Flow

- Server actions: Check session with `auth.api.getSession({ headers })`
- Client components: Use `authClient` from `src/lib/auth-client.ts`
- Protected routes: Verify user session before database operations

### State Management

- **Server state**: React Query (async data, caching, background updates)
- **Client state**: React useState for UI-only state
- **Global state**: Avoid - use React Query for shared server data

## Critical Workflows

### Adding New Features

1. Create server action in `src/actions/[feature]/`
2. Add database schema changes in `src/db/schema.ts`
3. Run `drizzle-kit generate` and `drizzle-kit migrate`
4. Create React Query hooks for client interaction
5. Build UI with shadcn/ui components

### Database Changes

```bash
# After schema changes:
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Key Dependencies

- `@tanstack/react-query`: Server state management
- `better-auth`: Authentication with PostgreSQL adapter
- `drizzle-orm`: Type-safe SQL query builder
- `react-hook-form` + `@hookform/resolvers`: Form handling
- `zod`: Runtime validation + TypeScript types

## Don't Do

- Never write code comments
- Never run `npm run dev` to test changes
- Don't use generic error handling - be specific to business logic
- Don't create components without checking existing shadcn/ui options
- Don't skip Zod validation for any user input
- Don't use useState for server data - always use React Query
