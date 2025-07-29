import { MetadataRoute } from 'next'
import labhouseData from '@/data/labhouse-data.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mednovanhatrang.com/'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic test package routes
  const testPackageRoutes: MetadataRoute.Sitemap = labhouseData.testPackages.generalCheckup.map((pkg) => ({
    url: `${baseUrl}/test-package/${pkg.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...testPackageRoutes]
}
