import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Window Cleaning Experts | Starlight BPM Brampton & GTA',
  description:
    'Contact Starlight Building Maintenance for professional window cleaning services in Brampton and GTA. Also offering gutter cleaning, waste removal, and property maintenance. Family-owned business with 15+ years experience.',
  keywords:
    'window cleaning contact Brampton, GTA window cleaning company, professional window cleaners contact, Starlight BPM window cleaning, Brampton window washing contact, gutter cleaning contact, property maintenance contact GTA',
  openGraph: {
    title: 'Contact Window Cleaning Experts | Starlight BPM Brampton & GTA',
    description:
      'Contact us for professional window cleaning services in Brampton and GTA. Also offering gutter cleaning, waste removal, and property maintenance.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
