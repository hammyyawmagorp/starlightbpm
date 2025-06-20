# Starlight Building Maintenance

A professional website for Starlight Building Maintenance, a family-owned cleaning company serving the Greater Toronto Area (GTA).

## Features

- **Professional Website** - Modern, responsive design
- **Window Cleaning Services** - Primary service focus
- **Instant Estimator** - Online quote calculator (no phone calls required)
- **Contact Forms** - Easy customer communication
- **Email Notifications** - Automatic email alerts for form submissions
- **SEO Optimized** - Search engine friendly
- **Security** - Rate limiting, input validation, security headers

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Neon (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Neon database account
- Resend account for email notifications

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd starlightbpm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:

   ```env
   # Database
   DATABASE_URL="your-neon-database-url-here"

   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key-here"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Email Setup

### Resend Configuration

1. **Sign up for Resend** at [resend.com](https://resend.com)
2. **Get your API key** from the Resend dashboard
3. **Add to environment variables**:
   ```env
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   ```

### Email Features

- **Contact Form Notifications** - Email sent to `starlightbpm@gmail.com` when contact form is submitted
- **Estimator Notifications** - Email sent with confirmation number when estimator form is submitted
- **Professional Templates** - HTML email templates with company branding
- **Error Handling** - Graceful fallback if email fails

### Email Templates

- **Contact Form Email**: Includes all contact information and message
- **Estimator Email**: Includes contact info, service details, and confirmation number

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

Make sure to add these in your Vercel dashboard:

- `DATABASE_URL`
- `RESEND_API_KEY`

## SEO Features

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Configured at `/robots.txt`
- **Meta Tags**: Optimized for window cleaning services
- **Structured Data**: Schema.org markup for local business
- **Alt Text**: All images have descriptive alt text

## Security Features

- **Rate Limiting**: 20 requests/minute per IP
- **Input Validation**: All forms validated
- **Security Headers**: XSS, clickjacking protection
- **HTTPS**: Enforced for all URLs
- **Database Protection**: Prisma ORM prevents SQL injection

## Services

- **Window Cleaning** - Primary service (residential & commercial)
- **Gutter Cleaning** - Maintenance services
- **Waste Removal** - Litter pickup and disposal
- **Property Maintenance** - Various cleaning services

## Contact

For questions about this website, contact the development team.

---

**Starlight Building Maintenance** - Professional cleaning services in Brampton and GTA.
