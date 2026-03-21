# CodeUnion — Full-Stack Web Platform

A modern, production-ready web development agency platform built with **Laravel 12**, **React 19**, **Inertia.js**, **Tailwind CSS**, **PostgreSQL**, **Redis**, and **Meilisearch**.

## 🎯 Features

### 📱 Public Website
- Homepage with hero, features, and CTA
- About page with team showcase
- Services catalog
- Portfolio gallery with filtering
- Blog with categories and tags
- Contact form

### 💼 Client Portal
- Personal dashboard with quotation/ticket stats
- Ticket management (create, view, reply)
- Quotation viewing and acceptance
- Profile management

### 📊 Admin Dashboard
- Full CRUD for all resources
- Blog management with SEO metadata
- Portfolio showcase with technologies
- Client management and communication
- Ticket system with internal notes
- Quotation builder with line items
- User and role management
- Analytics and reporting

### 🤖 AI Integration
- ChatBot with conversation history
- Quotation assistant for cost estimation
- Blog content generator
- SEO meta/keyword generator
- Support assistant

### 🔐 Security
- Role-based access control (RBAC)
- Email verification
- Password reset flow
- API token authentication via Sanctum
- Permission-based features

## 🛠 Tech Stack

**Backend**
- Laravel 12 with Inertia.js v2
- PostgreSQL (primary database)
- Redis (caching & queue)
- Meilisearch (full-text search)
- OpenAI API integration
- Laravel Scout for search indexing
- Spatie Permission for RBAC
- DomPDF for quotation PDFs

**Frontend**
- React 19
- Inertia.js React adapter
- Tailwind CSS v3 with plugins
- Headless UI & Radix UI components
- Lucide React icons
- Vite v6 for bundling

**Deployment**
- Docker & Docker Compose
- Nginx reverse proxy
- PHP 8.3-FPM

## 📋 Project Structure

```
codeunion/
├── app/
│   ├── Controllers/          # Request handlers
│   ├── Models/               # Eloquent models
│   ├── Services/             # Business logic
│   └── Providers/            # Service providers
├── bootstrap/                # Application bootstrap
├── config/                   # Configuration files
├── database/
│   ├── migrations/           # Database schema
│   └── seeders/              # Data seeds
├── docker/                   # Docker configuration
├── modules/                  # Feature modules
│   ├── Website/
│   ├── Blog/
│   ├── Portfolio/
│   ├── Clients/
│   ├── Tickets/
│   ├── Quotations/
│   ├── Dashboard/
│   ├── Accounts/
│   └── AI/
├── public/                   # Web root
├── resources/
│   ├── js/
│   │   ├── Pages/           # React page components
│   │   ├── Layouts/         # Layout components
│   │   └── Components/      # Reusable components
│   ├── css/                 # Tailwind configuration
│   └── views/               # Blade templates
├── routes/                  # Route definitions
├── storage/
│   ├── app/                 # Application files
│   ├── logs/                # Log files
│   └── ai/prompts/          # AI prompt templates
├── tests/                   # Test suite
├── .env                     # Environment variables
├── composer.json            # PHP dependencies
├── docker-compose.yml       # Docker orchestration
└── package.json             # JavaScript dependencies
```

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- OR: PHP 8.3+, Node.js 22+, PostgreSQL 16, Redis 7+, Meilisearch

### Installation

#### Using Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/yourusername/codeunion.git
cd codeunion

# Copy environment file
cp .env.example .env

# Start services
docker-compose up -d

# Install dependencies
docker-compose exec app composer install
docker-compose exec app npm install

# Generate app key
docker-compose exec app php artisan key:generate

# Run migrations
docker-compose exec app php artisan migrate

# Seed database
docker-compose exec app php artisan db:seed

# Build frontend
docker-compose exec app npm run build

# Access application
# Web: http://localhost
# Admin: admin@codeunion.dev / password
# Client: client@codeunion.dev / password
```

#### Local Development

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Setup databases
# Ensure PostgreSQL, Redis, and Meilisearch are running
php artisan migrate
php artisan db:seed

# Start development servers
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite (hot reload)
npm run dev
```

## 📚 API Routes

All API routes are prefixed with `/api/v1` and require token authentication:

```
GET    /api/v1/blog               # List blog posts
GET    /api/v1/blog/:id           # Get single post
GET    /api/v1/portfolio          # List portfolio
GET    /api/v1/portfolio/:id      # Get single project
GET    /api/v1/tickets            # List user's tickets
POST   /api/v1/tickets            # Create ticket
GET    /api/v1/quotations         # List quotations
POST   /api/v1/quotations/:id/accept  # Accept quotation
```

## 🔑 Authentication

**Email:** `admin@codeunion.dev` or `client@codeunion.dev`  
**Password:** `password`

### Roles & Permissions

- **super-admin** — Full system access
- **admin** — Admin dashboard access
- **editor** — Blog & portfolio editing
- **support** — Ticket management
- **client** — Portal-only access

## 🗄️ Database

### Key Tables

- `users` — User accounts
- `clients` — Client organizations
- `blog_posts`, `blog_categories`, `blog_tags` — Blog content
- `portfolio_projects`, `technologies` — Portfolio items
- `tickets`, `ticket_replies` — Support system
- `quotations`, `quotation_items` — Quotation management
- `roles`, `permissions` — RBAC

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test tests/Feature/BlogTest.php
```

## 📦 Deployment

### Production Checklist

- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate strong `APP_KEY`
- [ ] Configure database credentials
- [ ] Setup Redis and Meilisearch instances
- [ ] Configure OpenAI API key
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Setup email service (Postmark, Resend, SES)
- [ ] Configure AWS S3 for file storage (if needed)
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Build frontend: `npm run build`
- [ ] Setup queue worker: `php artisan queue:work`

### Docker Deployment

1. Build image: `docker build -t codeunion:latest .`
2. Push to registry: `docker push youregistry/codeunion:latest`
3. Deploy with docker-compose or Kubernetes

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support, contact: support@codeunion.dev

---

**Built with ❤️ by the CodeUnion team**
# codeunionsoftware
