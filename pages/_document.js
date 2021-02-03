import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body className="bg-white text-black dark:bg-black dark:text-white transition duration-500">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument