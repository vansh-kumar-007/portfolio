# Vansh Kumar — AI/ML Portfolio

Premium personal portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and ReactBits-inspired animated components.

## Features

- Animated hero with particles & aurora background
- Interactive skills galaxy with proficiency indicators
- Project showcase with 3D tilt cards & case study modals
- AI Lab experiments section
- Experience & learning timeline with certifications
- Live GitHub API integration
- Animated statistics dashboard
- Recruiter-focused "Why Hire" section
- Portfolio AI chatbot (client-side knowledge base)
- Contact form with FormSubmit/Formspree
- Dark/light theme, command palette (⌘K), custom cursor, scroll progress

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy Free on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Deploy (no environment variables required for basic setup)
4. Your site will be live at `your-project.vercel.app`

Optional: Set `FORMSPREE_ID` in Vercel environment variables for Formspree instead of FormSubmit.

## Project Structure

```
src/
├── app/           # Next.js app router & API routes
├── components/    # UI, sections, layout, reactbits
├── data/          # Portfolio content (projects, skills, etc.)
├── hooks/         # Custom React hooks
└── lib/           # Utilities & chatbot logic
public/
├── assets/        # Profile photo
├── resume/        # Resume PDF
├── certificates/  # Certification files
└── projects/      # Project screenshots
```

## Tech Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4 · Framer Motion · GSAP
- ReactBits-inspired components (copy-paste pattern)
- next-themes · cmdk · Radix UI

## License

MIT — © Vansh Kumar
