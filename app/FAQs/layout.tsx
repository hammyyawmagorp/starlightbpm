import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Window Cleaning FAQ: What People Say vs Expert Facts | Starlight BPM',
  description:
    'Unique FAQ format: Compare what customers say about our window cleaning services vs expert facts and insights. Real customer experiences and professional knowledge about window cleaning in Brampton and GTA.',
  keywords:
    'window cleaning customer reviews, window cleaning expert facts, what people say about window cleaning, window cleaning FAQ Brampton, GTA window cleaning reviews, window cleaning customer experiences, professional window cleaning insights',
  openGraph: {
    title:
      'Window Cleaning FAQ: What People Say vs Expert Facts | Starlight BPM',
    description:
      'Unique FAQ format: Compare what customers say about our window cleaning services vs expert facts and insights. Real experiences and professional knowledge.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
