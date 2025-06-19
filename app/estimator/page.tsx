import { Metadata } from 'next'
import Estimator from '@/components/Estimator'

export const metadata: Metadata = {
  title:
    'Instant Window Cleaning Estimate Calculator | No Phone Calls - Starlight BPM',
  description:
    'Get an instant window cleaning estimate online - no phone calls, no waiting, no forms to fill out. The only site that gives you immediate window cleaning quotes for Brampton and GTA. Also available: gutter cleaning, waste removal estimates.',
  keywords:
    'instant window cleaning estimate, online window cleaning calculator, no phone call window cleaning quote, immediate window cleaning price, window cleaning estimate calculator Brampton, GTA window cleaning cost calculator, instant quote window cleaning',
  openGraph: {
    title: 'Instant Window Cleaning Estimate Calculator | No Phone Calls',
    description:
      'Get an instant window cleaning estimate online - no phone calls, no waiting. The only site that gives you immediate window cleaning quotes for Brampton and GTA.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function EstimatorPage() {
  return <Estimator />
}
