'use client'

import { useState, useEffect } from 'react'
import ProjectForm from "@/app/admin/components/ProjectForm"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    // Fetch projects from API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter(project => project.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
      
      <ProjectForm 
        project={editingProject} 
        onSuccess={(updatedProject) => {
          if (editingProject) {
            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
          } else {
            setProjects([...projects, updatedProject])
          }
          setEditingProject(null)
        }}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{project.title}</td>
                  <td className="py-3 px-4">{project.description.substring(0, 50)}...</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}