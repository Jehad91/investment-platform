import fs from 'fs'
import path from 'path'


export default function handler(req, res) {
  const filePath = path.resolve('src', 'data', 'data.json')
  if (req.method === 'POST') {
    const formData = req.body
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
      const jsonData = JSON.parse(data)
      jsonData.push(formData)
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2))
      res.status(200).json({ message: 'Data has been written to the file successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error writing data to file' })
    }
  } else {
    res.status(404).json({ error: 'Not found Jehad' });
  }
}
