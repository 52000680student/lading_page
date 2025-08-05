import { NextRequest, NextResponse } from 'next/server'

// Mock data store for demo purposes
let demoData: any[] = [
  {
    id: '1',
    title: 'Sample Rich Text Content',
    description: '<p>This is a <strong>sample description</strong> with <em>rich text formatting</em>.</p><ul><li>Bullet point 1</li><li>Bullet point 2</li></ul>',
    content: '<h2>Main Content</h2><p>This is the main content area where you can use <strong>bold text</strong>, <em>italic text</em>, and create <a href="#">links</a>.</p><p>You can also create lists:</p><ol><li>Numbered item 1</li><li>Numbered item 2</li></ol>',
    summary: 'A sample entry to demonstrate TinyMCE integration',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    return NextResponse.json(demoData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    demoData.push(newItem)
    return NextResponse.json(newItem)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = demoData.findIndex(item => item.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    demoData[index] = {
      ...demoData[index],
      ...body,
      updatedAt: new Date().toISOString()
    }
    return NextResponse.json(demoData[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    const index = demoData.findIndex(item => item.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    demoData.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}