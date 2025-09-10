# Componentes do Carrinho

Este diretório contém todos os componentes relacionados à página do carrinho, organizados de forma modular para facilitar manutenção e reutilização.

## Estrutura dos Componentes

### 📄 `page.tsx`

Componente principal da página do carrinho que gerencia os diferentes estados e renderiza os componentes apropriados.

**Estados gerenciados:**

- Loading: Mostra skeleton enquanto carrega dados
- Empty: Carrinho vazio com call-to-action
- Content: Exibe itens e resumo do pedido

### 🧩 Componentes de Estado

#### `CartLoadingState`

Skeleton completo da página durante carregamento.

- Layout grid 2/3 colunas
- 3 skeletons de itens
- Skeleton do resumo do pedido

#### `CartEmptyState`

Estado quando carrinho está vazio.

- Ícone de carrinho
- Mensagem explicativa
- Botão para continuar comprando

### 🛒 Componentes de Conteúdo

#### `CartItemsList`

Lista dos itens no carrinho com funcionalidades:

- Scroll infinito com indicador visual
- Contador de itens no cabeçalho
- Detecção automática de scroll
- Layout responsivo

**Props:**

```tsx
interface CartItemsListProps {
  items: Array<{
    id: string;
    productVariant: {
      id: string;
      name: string;
      imageUrl: string;
      priceInCents: number;
      product: { name: string };
    };
    quantity: number;
  }>;
}
```

#### `OrderSummary`

Resumo do pedido com totais e ações:

- Contador de produtos e unidades
- Cálculo de subtotal e total
- Botões de finalizar compra e continuar comprando
- Layout sticky no desktop

**Props:**

```tsx
interface OrderSummaryProps {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  totalPriceInCents: number;
}
```

### 💀 Componentes Skeleton

#### `CartItemSkeleton`

Placeholder para item do carrinho:

- Imagem 80x80px
- 3 linhas de texto variadas
- Controles de quantidade
- Preço no lado direito

#### `OrderSummarySkeleton`

Placeholder para resumo do pedido:

- Cabeçalho
- 4 linhas de informações
- 2 botões de ação
- Espaçamentos consistentes

## 🎨 Recursos Visuais

### Animações

- **Shimmer Effect**: Gradiente animado nos skeletons
- **Bounce**: Indicador de scroll com animação
- **Smooth Scroll**: Transições suaves na lista

### Responsividade

- **Mobile First**: Layout adaptativo
- **Breakpoints**: lg: para desktop (grid 3 colunas)
- **Touch Friendly**: Controles otimizados para toque

### Acessibilidade

- **Semantic HTML**: Estrutura semântica correta
- **ARIA Labels**: Onde necessário
- **Keyboard Navigation**: Suporte completo
- **Color Contrast**: Cores adequadas

## 📁 Arquivo de Exportação

### `index.ts`

Centraliza todas as exportações para imports limpos:

```tsx
import {
  CartEmptyState,
  CartItemsList,
  CartLoadingState,
  OrderSummary,
} from "./components";
```

## 🔄 Fluxo de Estados

```
Loading → Empty | Content
              ↓
          [Add Items]
              ↓
           Content
```

## 🚀 Benefícios da Modularização

1. **Manutenibilidade**: Cada componente tem responsabilidade única
2. **Testabilidade**: Componentes isolados são mais fáceis de testar
3. **Reutilização**: Skeletons podem ser usados em outras páginas
4. **Performance**: Carregamento otimizado de componentes
5. **Legibilidade**: Código mais organizado e fácil de entender
