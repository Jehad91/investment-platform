import 'antd/dist/reset.css'
import '../style/global.css'

import { ConfigProvider } from 'antd'

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#a29bfe',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp