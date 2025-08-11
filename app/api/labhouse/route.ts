import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type {
  Contact,
  Location,
  TestPackage,
  TestCategory,
  Process as ProcessModel,
  Advantage,
  Navigation,
  FaqCategory,
  HealthInfoCategory,
  SocialMedia,
  LegalPage,
  Images,
  AppData,
} from '@prisma/client'

export async function GET() {
  try {
    // Fetch all data from database
    const [contact, testPackages, testCategories, process, advantages, navigation, faqCategories, healthInfoCategories, socialMedia, legalPages, images, appData] = await Promise.all([
      prisma.contact.findFirst({
        include: {
          locations: true
        }
      }),
      prisma.testPackage.findMany(),
      prisma.testCategory.findMany(),
      prisma.process.findMany({
        orderBy: {
          step: 'asc'
        }
      }),
      prisma.advantage.findMany({
        orderBy: {
          order: 'asc'
        }
      }),
      prisma.navigation.findFirst(),
      prisma.faqCategory.findMany(),
      prisma.healthInfoCategory.findMany(),
      prisma.socialMedia.findMany(),
      prisma.legalPage.findMany(),
      prisma.images.findFirst(),
      prisma.appData.findFirst()
    ])

    // Transform data to match original JSON structure
    const responseData = {
      contact: contact ? {
        hotline: contact.hotline,
        email: contact.email,
        workingHours: {
          days: contact.workingDays,
          time: contact.workingTime
        },
        locations: contact.locations.map((location: Location) => ({
          id: location.id,
          address: location.address,
          hours: location.hours
        }))
      } : null,
      testPackages: {
        generalCheckup: testPackages.map((pkg: TestPackage) => ({
          id: pkg.id,
          name: pkg.name,
          category: pkg.category,
          gender: pkg.gender,
          price: pkg.price,
          indicators: pkg.indicators,
          resultTime: pkg.resultTime,
          icon: pkg.icon,
          featured: pkg.featured,
          image: pkg.image,
          description: pkg.description
        }))
      },
      testCategories: testCategories.map((category: TestCategory) => ({
        id: category.id,
        name: category.name,
        url: category.url,
        description: category.description
      })),
      process: process.map((step: ProcessModel) => ({
        step: step.step,
        title: step.title,
        description: step.description,
        icon: step.icon
      })),
      advantages: advantages.map((advantage: Advantage) => ({
        id: advantage.id,
        title: advantage.title,
        icon: advantage.icon,
        order: advantage.order
      })),
      navigation: navigation ? {
        testPackages: navigation.testPackages,
        faq: navigation.faq,
        healthInfo: navigation.healthInfo,
        about: navigation.about
      } : null,
      faqCategories: faqCategories.map((faq: FaqCategory) => ({
        name: faq.name,
        url: faq.url
      })),
      healthInfoCategories: healthInfoCategories.map((health: HealthInfoCategory) => ({
        name: health.name,
        url: health.url
      })),
      socialMedia: socialMedia.map((social: SocialMedia) => ({
        platform: social.platform,
        url: social.url
      })),
      legalPages: legalPages.map((legal: LegalPage) => ({
        name: legal.name,
        url: legal.url
      })),
      images: images ? {
        banner: images.banner,
        aboutBanner: images.aboutBanner,
        facility: images.facility,
        mainImage: images.mainImage
      } : null,
      copyright: appData?.copyright || ''
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching labhouse data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}