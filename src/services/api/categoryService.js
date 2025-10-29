import categoryData from '@/services/mockData/categories.json'

let categories = [...categoryData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(150)
    return categories.map(category => ({ ...category }))
  },

  async getById(id) {
    await delay(100)
    const category = categories.find(c => c.Id === parseInt(id))
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await delay(200)
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0
    const newCategory = {
      Id: maxId + 1,
      name: categoryData.name,
      color: categoryData.color || "#6366F1"
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updateData) {
    await delay(150)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) return null
    
    categories[index] = { ...categories[index], ...updateData }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(150)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) return false
    
    categories.splice(index, 1)
    return true
  }
}