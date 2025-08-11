import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidateTag, revalidatePath } from 'next/cache'

// Model mapping to Prisma client methods
const modelMap: { [key: string]: any } = {
  contact: prisma.contact,
  location: prisma.location,
  testpackage: prisma.testPackage,
  testcategory: prisma.testCategory,
  process: prisma.process,
  advantage: prisma.advantage,
  navigation: prisma.navigation,
  faqcategory: prisma.faqCategory,
  healthinfocategory: prisma.healthInfoCategory,
  socialmedia: prisma.socialMedia,
  legalpage: prisma.legalPage,
  images: prisma.images,
  appdata: prisma.appData
}

// GET - List all entries for a model
export async function GET(
  request: NextRequest,
  { params }: { params: { model: string } }
) {
  try {
    const { model } = params
    const modelClient = modelMap[model.toLowerCase()]
    
    if (!modelClient) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const data = await modelClient.findMany({
      include: model.toLowerCase() === 'contact' ? { locations: true } : undefined
    })
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

// POST - Create new entry
export async function POST(
  request: NextRequest,
  { params }: { params: { model: string } }
) {
  try {
    const { model } = params
    const modelClient = modelMap[model.toLowerCase()]
    
    if (!modelClient) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const body = await request.json()
    const data = await modelClient.create({ data: body })

    // Revalidate labhouse API and relevant paths
    try {
      revalidatePath('/api/labhouse')
      revalidatePath('/')
      revalidatePath('/services')
    } catch (e) {
      console.warn('Revalidation after create failed:', e)
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating data:', error)
    return NextResponse.json({ error: 'Failed to create data' }, { status: 500 })
  }
}

// PUT - Update entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { model: string } }
) {
  try {
    const { model } = params
    const modelClient = modelMap[model.toLowerCase()]
    
    if (!modelClient) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const body = await request.json()
    const { id, ...updateData } = body
    
    // Handle special case for contact model with locations
    if (model.toLowerCase() === 'contact' && updateData.locations) {
      const { locations, ...contactData } = updateData
      
      const data = await modelClient.update({
        where: { id },
        data: {
          ...contactData,
          locations: {
            deleteMany: {},
            create: locations.map((location: any) => ({
              id: location.id,
              address: location.address,
              hours: location.hours
            }))
          }
        }
      })
      
      return NextResponse.json(data)
    }
    
    const data = await modelClient.update({
      where: { id },
      data: updateData
    })

    // Revalidate labhouse API and relevant paths
    try {
      revalidatePath('/api/labhouse')
      revalidatePath('/')
      revalidatePath('/services')
    } catch (e) {
      console.warn('Revalidation after update failed:', e)
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating data:', error)
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 })
  }
}

// DELETE - Delete entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { model: string } }
) {
  try {
    const { model } = params
    const modelClient = modelMap[model.toLowerCase()]
    
    if (!modelClient) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await modelClient.delete({ where: { id } })

    // Revalidate labhouse API and relevant paths
    try {
      revalidatePath('/api/labhouse')
      revalidatePath('/')
      revalidatePath('/services')
    } catch (e) {
      console.warn('Revalidation after delete failed:', e)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting data:', error)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}