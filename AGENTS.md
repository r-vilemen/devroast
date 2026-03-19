<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:devroast-patterns -->

# DevRoast - Padrões e Boas Práticas

## 1. Componentes UI

### Estrutura de Arquivos
- Cada componente em arquivo próprio: `src/components/ui/{component-name}.tsx`
- Interfaces exportadas com sufixo `Props`: `export interface ButtonProps`
- Componentes com named exports: `export function Button()`

### Estilização
- **Sempre usar `tv()`** do `tailwind-variants` para estilização
- Não misturar classes CSS com `tv()`
- Cores seguem o design system (ver tokens)

### Propagação de Props
- Usar spread `{...props}` para permitir override de classes
- Interfaces estendem `React.HTMLAttributes<HTMLDivElement>` quando apropriado

## 2. Server vs Client Components

### Regra Principal
- **Server Components por padrão** (sem "use client")
- `"use client"` apenas quando necessário:
  - `useState`, `useEffect`, `useRef`
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs

### Padrão Async + Suspense
Componentes async (ex: Shiki) **NÃO** podem ser usados diretamente em Client Components.

**Solução:**
```
highlighted-code-block.tsx    ← async server component
highlighted-code-block-client.tsx  ← "use client" + Suspense wrapper
```

## 3. Sistema de Temas

### Tokens
- Centralizados em: `src/lib/themes/tokens.ts`
- Estrutura: `baseTokens.colors.{categoria}.{nome}`
- Cores do design system:
  - Green: `#10B981`
  - Amber: `#F59E0B`
  - Red: `#EF4444`
  - Background page: `#0C0C0C`
  - Background surface: `#171717`
  - Background elevated: `#1A1A1A`
  - Background input: `#111111`
  - Border: `#2A2A2A`

### ThemeProvider
- Localização: `src/lib/themes/context.tsx`
- Suporta: `mode` (light/dark/system) e `season`
- Hook: `useTheme()` para acessar configurações

## 4. Performance

### PROIBIDO em Render
- ❌ `Math.random()` para valores visuais → usar valores pré-definidos
- ❌ `Math.random()` para IDs → usar `useId()` do React
- ❌ `new Date()` para timestamps → usar `useMemo` ou servidor

### Otimizações
- `useMemo` para cálculos pesados
- `useCallback` para callbacks estáveis
- Lazy loading para bundles pesados (Shiki)

## 5. Accessibility (A11y)

### Obrigatório em Interações
- `aria-expanded` em toggles/accordions
- `aria-haspopup="listbox"` em selects
- `aria-label` em botões sem texto
- `role="listbox"` em dropdowns
- `role="button"` em elementos clicáveis

### OVERLAY (backdrop)
- Usar `<button type="button">` em vez de `<div>` com click handlers
- Sempre ter `aria-label` descritivo

### Estados
- `aria-selected` em tabs
- `aria-disabled` quando aplicável
- Focus visible: `focus-visible:ring-2 focus-visible:ring-[#10B981]`

## 6. DRY (Don't Repeat Yourself)

### Extrair Componentes
- UI reutilizável → novo componente em `components/ui/`
- Lógica duplicada → hook customizado em `hooks/`
- Estilização similar → função `tv()` compartilhada

### Try/Catch Pattern
```tsx
// ❌ DUPLICADO
try {
  return <ComponentA />
} catch {
  return <ComponentA />
}

// ✅ EXTRAIR
function Content(props) { return <ComponentA {...props} /> }
try { return <Content /> } catch { return <Content /> }
```

## 7. TypeScript

### Boas Práticas
- Tipos explícitos em interfaces públicas
- `as const` para literais
- Evitar `any` — usar `unknown` quando necessário
- Exportar tipos quando reutilizáveis

### Imports
```tsx
// ✅ CORRETO
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

// ❌ ERRADO
import { tv, type VariantProps } from "tailwind-variants";
```

## 8. Linting e Formatação

### Biome
```bash
npx biome check src/          # Verificar
npx biome check --write src/   # Corrigir
npx biome check --write --unsafe src/  # Incluir fixes unsafe
```

### Regras Importantes
- Comentários dentro de JSX → usar `{/* comment */}`
- Não redeclarar funções/variáveis
- `const` vs `let` — não atribuir a `const`

## 9. Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx          # Homepage
│   └── components/        # Página de showcase
├── components/ui/         # Componentes UI
│   ├── button.tsx
│   ├── toggle.tsx
│   └── ...
├── lib/
│   ├── themes/            # Sistema de temas
│   │   ├── tokens.ts     # Definições de tokens
│   │   ├── seasons.ts     # Temas sazonais
│   │   ├── context.tsx    # ThemeProvider
│   │   └── index.ts       # Exports
│   └── shiki.ts           # Configuração Shiki
└── hooks/                 # Hooks customizados (futuro)
```

## 10. Git Workflow

### Commits
-Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`

### Antes de Commit
```bash
npm run build      # Verificar TypeScript
npx biome check src/  # Verificar lint
```

<!-- END:devroast-patterns -->
