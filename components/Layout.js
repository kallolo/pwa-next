import Head from 'next/head'
import Navbar from './Navbar'
export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/icons/favicon-32x32.png" />
            </Head>
            <Navbar />
            <div className="mt-8">
                {props.children}
            </div>
        </div>
    )
}
