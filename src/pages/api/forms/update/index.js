import fs from 'fs'
import path from 'path'


export default function handler(req, res) {
  const filePath = path.resolve('src', 'data', 'data.json')
  if (req.method === 'PATCH') {
    const formData = req.body
    const { key } = req.query
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
      const jsonData = JSON.parse(data)
      // const updatedData = jsonData.find((data) => data.age === +age)
      // updatedData.name = formData.name
      // updatedData.age = formData.age
      console.log(formData, 'form')
      console.log(key, 'key')
      jsonData.map((data) => {
        if (data.key === key) {
          data.firstName = formData.firstName
          data.lastName = formData.lastName
          data.phoneNumber = formData.phoneNumber
          data.age = formData.age
          data.certification = formData.certification
        } else {
          return data
        }
      })
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2))
      res.status(200).json({ message: 'Data updated successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error updating data from file' })
    }
  } else {
    res.status(404).json({ error: 'Not found Jehad' });
  }
}
