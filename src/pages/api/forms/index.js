import fs from 'fs'
import path from 'path'


export default function handler(req, res) {
  const filePath = path.resolve('src', 'data', 'data.json')
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
      res.status(200).json(JSON.parse(data))
    }
    catch (error) {
      res.status(500).json({ error: 'Error reading data from file' })
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}
