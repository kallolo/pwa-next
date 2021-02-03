import Head from 'next/head'
import Layout from '../components/Layout'
export default function Home() {
  return (
    <Layout title={'Home # ' + process.env.appName}>
      <div className="container">
        <h1 className="text-lg font-bold text-blue-600"> Home</h1>
      </div>
    </Layout>
  )
}
