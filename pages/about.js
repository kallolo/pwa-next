import React from 'react'
import Layout from '../components/Layout'

export default function About() {
    return (
        <Layout title={'About # ' + process.env.appName}>
            <div className="container">
                <h2>About</h2>
            </div>
        </Layout>
    )
}
