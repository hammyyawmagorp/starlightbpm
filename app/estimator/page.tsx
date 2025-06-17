import { Metadata } from 'next'
import Estimator from '@/components/Estimator'

export const metadata: Metadata = {
  title: 'Free Window Cleaning Estimate in Brampton & GTA | Starlight BPM',
  description:
    'Get a free window cleaning estimate for your home or business in Brampton and GTA. Quick, accurate quotes for residential and commercial window cleaning services. No obligation.',
  keywords:
    'window cleaning estimate Brampton, free window cleaning quote GTA, window cleaning cost calculator, residential window cleaning estimate, commercial window cleaning quote, Brampton window cleaning prices, GTA window cleaning rates',
  openGraph: {
    title: 'Free Window Cleaning Estimate in Brampton & GTA',
    description:
      'Get a free window cleaning estimate for your home or business in Brampton and GTA. Quick, accurate quotes for residential and commercial window cleaning services.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function EstimatorPage() {
  return <Estimator />
}
