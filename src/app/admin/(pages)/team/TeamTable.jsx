'use client'
import { useState, useTransition } from 'react'
import { Mail, Linkedin, Trash2, Edit2, Search, Check, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const TeamTable = ({ members, deleteTeamMember, updateTeamMember, bulkDeleteTeamMembers }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Filter members based on search query
  const filteredMembers = members.filter(member => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      member.name.toLowerCase().includes(query) ||
      member.position.toLowerCase().includes(query) ||
      member.department.toLowerCase().includes(query) ||
      (Array.isArray(member.skills) 
        ? member.skills.some(skill => skill.toLowerCase().includes(query))
        : member.skills.toLowerCase().includes(query)
    ))
  })

  // Toggle member selection
  const toggleMemberSelection = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId) 
        : [...prev, memberId]
    )
  }

  // Toggle all members selection
  const toggleAllMembersSelection = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map(member => member._id))
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member to delete')
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      selectedMembers.forEach(id => formData.append('memberIds', id))
      
      const result = await bulkDeleteTeamMembers(formData)
      if (result.success) {
        toast.success(result.message)
        setSelectedMembers([])
        router.refresh()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Controls */}
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {selectedMembers.length > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedMembers.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                  onChange={toggleAllMembersSelection}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow
                  key={member._id}
                  member={member}
                  isSelected={selectedMembers.includes(member._id)}
                  onSelect={toggleMemberSelection}
                  deleteTeamMember={deleteTeamMember}
                  updateTeamMember={updateTeamMember}
                  isPending={isPending}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No team members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = ({ member, isSelected, onSelect, deleteTeamMember, updateTeamMember, isPending }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: member.name || '',
    position: member.position || '',
    department: member.department || '',
    bio: member.bio || '',
    skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
    email: member.email || '',
    linkedin: member.linkedin || '',
    image: member.profileImage || '',
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const formDataObj = new FormData()
    formDataObj.append('memberId', member._id)
    formDataObj.append('name', formData.name)
    formDataObj.append('position', formData.position)
    formDataObj.append('department', formData.department)
    formDataObj.append('bio', formData.bio)
    formDataObj.append('skills', formData.skills)
    formDataObj.append('email', formData.email)
    formDataObj.append('linkedin', formData.linkedin)
    formDataObj.append('image', formData.image)

    const result = await updateTeamMember(formDataObj)
    if (result.success) {
      toast.success('Member updated successfully')
      setIsEditing(false)
    } else {
      toast.error(result.error || 'Failed to update member')
    }
  }

  const handleDelete = async () => {
    const formDataObj = new FormData()
    formDataObj.append('memberId', member._id)
    
    const result = await deleteTeamMember(formDataObj)
    if (result.success) {
      toast.success('Member deleted successfully')
    } else {
      toast.error(result.error || 'Failed to delete member')
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(member._id)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      
      {isEditing ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={formData.image || '/default-profile.jpg'}
                  alt={formData.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={`block w-full rounded-md border ${errors.position ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
            />
            {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position}</p>}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`block w-full rounded-md border ${errors.department ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
            />
            {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
          </td>
          <td className="px-6 py-4">
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Comma separated skills"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Email"
              />
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="LinkedIn URL"
              />
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isPending}
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={handleUpdate}
                className="text-green-600 hover:text-green-900"
                disabled={isPending}
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={member.profileImage || '/default-profile.jpg'}
                  alt={member.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{member.name}</div>
               
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{member.position}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{member.department}</div>
          </td>
          <td className="px-6 py-4">
            <div className="flex flex-wrap gap-1">
              {Array.isArray(member.skills) && member.skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {skill}
                </span>
              ))}
              {member.skills?.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{member.skills.length - 3}
                </span>
              )}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex space-x-2">
              {member.email && (
                <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-blue-500">
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-900"
                disabled={isPending}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-900"
                disabled={isPending}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  )
}

export default TeamTable