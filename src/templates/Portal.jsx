import React from 'react'
import {
  Image,
  Layout,
  theme,
  Typography
} from 'antd'
import Link from 'next/link'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const Portal = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      {props.meta}
      <Header style={{ width: '100%' }}>
        <Link
          href='/'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Image src='/apple-touch-icon.png' alt='Logo' width={56} preview={false} />
          <Title level={3} style={{ color: '#fff', marginBottom: 0 }}>Investment</Title>
        </Link>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: '80vh', background: colorBgContainer }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Investment Forms ©2023 Created by Owais</Footer>
    </Layout>
  )
}

export default Portal