import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title:
    'Starlight Building Maintenance | Professional Cleaning Services in Brampton, Ontario',
  description:
    'Family-owned Canadian cleaning company based in Brampton, Ontario. We provide professional window cleaning, gutter maintenance, and property care services exclusively in the Greater Toronto Area (GTA).',
  keywords:
    'Canadian cleaning services, Brampton window cleaning, GTA property maintenance, Ontario cleaning company, Canadian building maintenance, Greater Toronto Area cleaning services',
  openGraph: {
    title: 'Starlight Building Maintenance | GTA Cleaning Services',
    description:
      'Professional Canadian cleaning services in Brampton and the Greater Toronto Area. Family-owned business providing window cleaning, gutter maintenance, and property care.',
    locale: 'en_CA',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/sbmicon.png', type: 'image/png' },
      { url: '/icon.ico', type: 'image/x-icon' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-CA">
      <head>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Starlight Building Maintenance',
              description:
                'Family-owned Canadian cleaning company providing professional window cleaning, gutter maintenance, and property care services in the Greater Toronto Area.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Brampton',
                addressRegion: 'ON',
                addressCountry: 'CA',
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '43.5890',
                  longitude: '-79.6441',
                },
                geoRadius: '50000',
                description: 'Greater Toronto Area (GTA)',
              },
              serviceArea: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '43.5890',
                  longitude: '-79.6441',
                },
                geoRadius: '50000',
                description: 'Greater Toronto Area (GTA)',
              },
              url: 'https://starlightbpm.ca',
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
