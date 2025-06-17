import { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title:
    'Professional Window Cleaning Services in Brampton & GTA | Starlight BPM',
  description:
    'Expert window cleaning services in Brampton and GTA. Residential and commercial window cleaning with 15+ years experience. Free estimates available. Serving Brampton, Toronto, and surrounding areas.',
  keywords:
    'window cleaning Brampton, GTA window cleaning, residential window cleaning, commercial window cleaning, professional window cleaners, window cleaning services Ontario, Brampton window washers, GTA window maintenance',
  openGraph: {
    title: 'Professional Window Cleaning Services in Brampton & GTA',
    description:
      'Expert window cleaning services in Brampton and GTA. Residential and commercial window cleaning with 15+ years experience. Free estimates available.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
