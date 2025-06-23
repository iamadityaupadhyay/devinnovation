import { NextResponse } from 'next/server'

// Mock database - replace with real database in production
let projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-featured online store with payment integration',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  }
]

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request) {
  const data = await request.json()
  const newProject = {
    id: projects.length + 1,
    ...data
  }
  projects.push(newProject)
  return NextResponse.json(newProject, { status: 201 })
}

export async function PUT(request) {
  const { id, ...data } = await request.json()
  const index = projects.findIndex(p => p.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }
  
  projects[index] = { ...projects[index], ...data }
  return NextResponse.json(projects[index])
}

export async function DELETE(request) {
  const { id } = await request.json()
  projects = projects.filter(p => p.id !== id)
  return NextResponse.json({ success: true })
}