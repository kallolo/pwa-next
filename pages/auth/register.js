import Layout from "../../components/Layout"

export default function Register() {
    return (
        <Layout title={'Register # ' + process.env.appName}>
            <div className="container">
                <h1>Register</h1>
            </div>
        </Layout>
    )
}
