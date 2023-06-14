import { Meta } from '@/meta'
import Portal from '@/templates/Portal'
import FormsTable from '@/components/Table'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

const Home = () => {
  // const postData = async (formData) => {
  //   try {
  //     const response = await fetch('/api/post', {
  //       method: 'POST',
  //       body: JSON.stringify(formData),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const result = await response.json();
  //     console.log('Result:', result);
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //   }
  // }
  // const deleteData = async (age) => {
  //   try {
  //     const response = await fetch(`/api/delete?age=${age}`, { method: 'DELETE' });
  //     const result = await response.json()
  //     console.log('Result:', result)
  //   } catch (error) {
  //     console.error('Error deleting data:', error)
  //   }
  // }

  // postData({ name: 'John Doe', age: 25 })
  // deleteData(35)
  return (
    <Portal meta={<Meta title='Home Page' />}>
      <Title level={4} style={{ margin: '20px 0 50px' }}>Investment Forms</Title>
      <FormsTable />
    </Portal>
  )
}

export default Home
