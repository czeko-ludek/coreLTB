# Elever - Construction Company Website

A modern, fully responsive construction company website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Atomic Design** architecture
- **Fully Responsive** design
- **Lucide React** icons
- **Component-based** architecture

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
elever/
├── app/
│   ├── layout.tsx          # Root layout with Header & Footer
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Atomic components (Button, Icon, etc.)
│   ├── shared/             # Molecular components (Cards, etc.)
│   └── sections/           # Organism components (Sections)
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration with Design System

```

## 🎨 Design System

All design tokens are defined in `tailwind.config.ts`:

- **Colors**: Primary orange (#f97316), dark backgrounds, light surfaces
- **Typography**: 8 size scales with Inter font
- **Spacing**: Standard Tailwind scale
- **Shadows**: 4 levels (sm, md, lg, xl)
- **Border Radius**: 5 levels (sm to full)

## 📄 Components

### Atoms (UI)
- Button, Icon, SectionLabel, InputField

### Molecules (Shared)
- SectionHeader, StatCard, ServiceCard, TeamMemberCard, TestimonialCard, BlogPostCard, ProjectCard, CompanyStatBox, NumberedListItem, SliderArrow, PartnerLogo

### Organisms (Sections)
- Header, HeroSection, AboutCompanySection, ServicesSection, HowItWorksSection, ProjectsSection, TeamSection, TestimonialsSection, CtaSection, BlogSection, PartnersSection, Footer

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: clsx

## 📝 Notes

- Replace placeholder images with actual project images
- Update logo.svg with your company logo
- Customize content in app/page.tsx and app/layout.tsx
- Add partner logos to public/partners/

## 🌟 Credits

Built following Atomic Design principles with a focus on modularity and reusability.


