import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  // Read the JSON data
  const dataPath = path.join(process.cwd(), 'data', 'labhouse-data.json')
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.location.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.testPackage.deleteMany()
  await prisma.testCategory.deleteMany()
  await prisma.process.deleteMany()
  await prisma.advantage.deleteMany()
  await prisma.navigation.deleteMany()
  await prisma.faqCategory.deleteMany()
  await prisma.healthInfoCategory.deleteMany()
  await prisma.socialMedia.deleteMany()
  await prisma.legalPage.deleteMany()
  await prisma.images.deleteMany()
  await prisma.appData.deleteMany()

  // Seed Contact data
  const contact = await prisma.contact.create({
    data: {
      hotline: jsonData.contact.hotline,
      email: jsonData.contact.email,
      workingDays: jsonData.contact.workingHours.days,
      workingTime: jsonData.contact.workingHours.time,
      locations: {
        create: jsonData.contact.locations.map((location: any) => ({
          id: location.id,
          address: location.address,
          hours: location.hours,
        }))
      }
    }
  })

  // Seed Test Packages
  for (const pkg of jsonData.testPackages.generalCheckup) {
    await prisma.testPackage.create({
      data: {
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
      }
    })
  }

  // Seed Test Categories
  for (const category of jsonData.testCategories) {
    await prisma.testCategory.create({
      data: {
        id: category.id,
        name: category.name,
        url: category.url,
        description: category.description || null,
      }
    })
  }

  // Seed Process steps
  for (const step of jsonData.process) {
    await prisma.process.create({
      data: {
        step: step.step,
        title: step.title,
        description: step.description,
        icon: step.icon,
      }
    })
  }

  // Seed Advantages
  for (const advantage of jsonData.advantages) {
    await prisma.advantage.create({
      data: {
        id: advantage.id,
        title: advantage.title,
        icon: advantage.icon,
        order: advantage.order,
      }
    })
  }

  // Seed Navigation
  await prisma.navigation.create({
    data: {
      testPackages: jsonData.navigation.testPackages,
      faq: jsonData.navigation.faq,
      healthInfo: jsonData.navigation.healthInfo,
      about: jsonData.navigation.about,
    }
  })

  // Seed FAQ Categories
  for (const faq of jsonData.faqCategories) {
    await prisma.faqCategory.create({
      data: {
        name: faq.name,
        url: faq.url,
      }
    })
  }

  // Seed Health Info Categories
  for (const healthInfo of jsonData.healthInfoCategories) {
    await prisma.healthInfoCategory.create({
      data: {
        name: healthInfo.name,
        url: healthInfo.url,
      }
    })
  }

  // Seed Social Media
  for (const social of jsonData.socialMedia) {
    await prisma.socialMedia.create({
      data: {
        platform: social.platform,
        url: social.url,
      }
    })
  }

  // Seed Legal Pages
  for (const legal of jsonData.legalPages) {
    await prisma.legalPage.create({
      data: {
        name: legal.name,
        url: legal.url,
      }
    })
  }

  // Seed Images
  await prisma.images.create({
    data: {
      banner: jsonData.images.banner,
      aboutBanner: jsonData.images.aboutBanner,
      facility: jsonData.images.facility,
      mainImage: jsonData.images.mainImage,
    }
  })

  // Seed App Data
  await prisma.appData.create({
    data: {
      copyright: jsonData.copyright,
    }
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })