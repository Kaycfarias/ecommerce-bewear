# 🛍️ BeWear E-commerce

Um e-commerce moderno e completo para produtos de moda, desenvolvido com as mais recentes tecnologias web.

> 🎓 **Projeto desenvolvido durante o bootcamp BeWear da [FullStack Club](https://fullstackclub.com.br)** - Uma jornada completa de aprendizado em desenvolvimento full-stack moderno.

## 🚀 Tecnologias

### Frontend

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://reactjs.org/)** - Biblioteca UI com recursos mais recentes
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI modernos

### Backend & Database

- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM type-safe para TypeScript
- **[BetterAuth](https://www.better-auth.com/)** - Autenticação moderna

### State Management & Forms

- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado servidor
- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript

### Pagamentos & UI

- **[Stripe](https://stripe.com/)** - Processamento de pagamentos
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 🎯 Funcionalidades

### 🛒 Shopping

- [x] Catálogo de produtos com filtros por categoria
- [x] Visualização detalhada de produtos e variantes
- [x] Carrinho de compras com atualização em tempo real
- [x] Indicador visual de itens no carrinho
- [x] Sistema de checkout completo

### 👤 Usuário

- [x] Autenticação segura (login/registro)
- [x] Gerenciamento de perfil
- [x] Histórico de pedidos
- [x] Endereços de entrega

### 💳 Pagamentos

- [x] Integração completa com Stripe
- [x] Páginas de sucesso e cancelamento
- [x] Processamento seguro de pagamentos

### 🎨 UX/UI

- [x] Design responsivo para todos os dispositivos
- [x] Skeleton loading para melhor UX
- [x] Componentes modulares e reutilizáveis
- [x] Footer sticky e header fixo

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── actions/          # Server Actions do Next.js
├── app/              # App Router (rotas e páginas)
├── components/       # Componentes reutilizáveis
├── db/               # Schema e configuração do banco
├── hooks/            # Hooks customizados (queries/mutations)
├── lib/              # Utilitários e configurações
└── providers/        # Context providers (React Query, etc)
```

### Padrões de Desenvolvimento

- **Server Actions**: Todas as operações de backend usando `"use server"`
- **Type Safety**: TypeScript strict mode em todo o projeto
- **Component Design**: Componentes modulares seguindo padrão shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Code Quality**: ESLint + Prettier configurados

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm/yarn/pnpm

### Configuração

1. **Clone o repositório**

```bash
git clone https://github.com/Kaycfarias/ecommerce-bewear.git
cd ecommerce-bewear
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Configure as seguintes variáveis:

- `DATABASE_URL` - URL de conexão PostgreSQL
- `STRIPE_SECRET_KEY` - Chave secreta do Stripe
- `STRIPE_PUBLISHABLE_KEY` - Chave pública do Stripe
- `BETTER_AUTH_SECRET` - Chave secreta para autenticação

4. **Configure o banco de dados**

```bash
# Gerar migrações
npx drizzle-kit generate

# Executar migrações
npx drizzle-kit migrate

# Popular dados de exemplo (opcional)
npm run seed
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting com ESLint
```

## 🌐 Deploy

### Vercel (Recomendado)

O deploy mais fácil é usar a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push na branch main

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Railway
- Digital Ocean
- AWS
- Google Cloud Platform

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

Desenvolvido por [Kayc Farias](https://github.com/Kaycfarias)

## 🎓 Sobre o Bootcamp BeWear

Este projeto foi desenvolvido durante o **Bootcamp BeWear** da [FullStack Club](https://fullstackclub.com.br), um programa intensivo de formação em desenvolvimento full-stack com foco em tecnologias modernas.

### O que foi aprendido:

- ⚡ **Next.js 15** com App Router e Server Actions
- 🎨 **Tailwind CSS 4** e componentes shadcn/ui
- 🗄️ **PostgreSQL** com Drizzle ORM
- 🔐 **BetterAuth** para autenticação moderna
- 💳 **Stripe** para processamento de pagamentos
- 📱 **TypeScript** strict mode e type safety
- 🚀 **React Query** para gerenciamento de estado
- 🏗️ **Arquitetura moderna** e boas práticas

### Sobre a FullStack Club:

A [FullStack Club](https://fullstackclub.com.br) é uma comunidade focada em ensinar desenvolvimento full-stack com as tecnologias mais atuais do mercado, proporcionando uma experiência prática e completa.

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!
