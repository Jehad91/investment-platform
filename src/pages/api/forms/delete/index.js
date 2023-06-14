import fs from 'fs'
import path from 'path'


export default function handler(req, res) {
  const filePath = path.resolve('src', 'data', 'data.json')
  if (req.method === 'DELETE') {
    const { age } = req.query
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
      const jsonData = JSON.parse(data)
      const updatedData = jsonData.filter((data) => data.age !== +age)
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2))
      res.status(200).json({ message: 'Data deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error deleting data from file' })
    }
  } else {
    res.status(404).json({ error: 'Not found Jehad' });
  }
}
