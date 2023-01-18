import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";

const Pages = () => {
    return (
        <Layout selected="pages">
            <>
                <Head>
                    <title>Pages - Panel</title>
                </Head>
                <Title content="Pages" />
            </>
        </Layout>
    )
}

export default Pages;