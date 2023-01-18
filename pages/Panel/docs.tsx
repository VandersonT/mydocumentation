import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";

const Docs = () => {
    return (
        <Layout selected="docs">
            <>
                <Head>
                    <title>Documentations - Panel</title>
                </Head>
                <Title content="Documentations" />
            </>
        </Layout>
    )
}

export default Docs;