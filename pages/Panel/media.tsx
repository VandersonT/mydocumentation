import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";

const Media = () => {
    return (
        <Layout selected="media">
            <>
                <Head>
                    <title>Media - Panel</title>
                </Head>
                <Title content="Media" />
            </>
        </Layout>
    )
}

export default Media;