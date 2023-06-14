import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Space,
  Table,
  Tag,
  Typography,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action Date',
    dataIndex: 'actionDate',
    key: 'actionDate',
    render: (_, record) => new Date(record.actionDate).toLocaleDateString()
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => (
      <>
        {status === 'pending'
          && <Tag color='volcano'>
              {status.toUpperCase()}
          </Tag>
        }
        {status === 'approved'
          && <Tag color='green'>
              {status.toUpperCase()}
          </Tag>
        }
      </>
    ),
  },
]

const FormsTable = () => {
  const [data, setData] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState(0)
  const [certification, setCertification] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/forms')
        const data = await response.json()
        setData(data)
      } catch (error) {
        message.error('Error fetching data')
      }
    }
    fetchData()
  }, [])

  const updateData = async (key, formData) => {
    try {
      const response = await fetch(`/api/forms/update?key=${key}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      message.success(result.message)
    } catch (error) {
      message.error('Error updating data')
    }
  }
  const onFinish = (e, key) => {
    e.preventDefault()
    updateData(key, { firstName, lastName, phoneNumber, age, certification })
  }
  return (
    <div>
    <Table
      columns={columns}
      expandable={{
        expandIcon: ({ expanded, onExpand, record }) =>
        expanded ? (
          <CloseOutlined onClick={e => onExpand(record, e)} />
        ) : (
          <MenuOutlined onClick={e => onExpand(record, e)} />
        ),
        expandedRowRender: (record) => (
          <Form onFinish={(e) => onFinish(e, record.key)}>
            <Space direction='vertical' style={{ width: '50%' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Title level={5}>Custodian Details</Title>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  initialValue={record.firstName}
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <Input
                    placeholder='First Name'
                    value={record.firstName}
                    defaultValue={record.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  initialValue={record.lastName}
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input
                    placeholder='Last Name'
                    value={record.lastName}
                    defaultValue={record.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Item>
              </Space>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Title level={5}>Other Information</Title>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  initialValue={record.phoneNumber}
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input
                    placeholder='Phone Number'
                    value={record.phoneNumber}
                    defaultValue={record.phoneNumber}
                    onChange={(e) => setPhoneNumber(+e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Age"
                  name="age"
                  initialValue={record.age}
                  rules={[{ required: true, message: 'Please input your age!' }]}
                >
                  <Input
                    placeholder='Your Age'
                    value={record.age}
                    defaultValue={record.age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Item>
              </Space>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Title level={5}>Certification</Title>
                <Form.Item
                  label="Certification"
                  name="certification"
                  initialValue={record.certification}
                  rules={[{ required: true, message: 'Please input your certification!' }]}
                >
                  <Input
                    placeholder='Certification'
                    value={record.certification}
                    defaultValue={record.certification}
                    onChange={(e) => setCertification(e.target.value)}
                  />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item>
                  <Button
                    style={{ width: 80 }}
                    htmlType="submit"
                  >
                    Update
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    style={{ width: 80 }}
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </Form.Item>
              </Space>
            </Space>
          </Form>
        ),
      }}
      dataSource={data?.sort((a, b) => new Date(b.actionDate) - new Date(a.actionDate))}
      />
      </div>
  )
}
export default FormsTable
