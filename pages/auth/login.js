import Layout from "../../components/Layout"

export default function Login() {
    return (
        <Layout title={'Login # ' + process.env.appName}>
            <div className="container">
                <h1>Login</h1>
            </div>
        </Layout>
    )
}
