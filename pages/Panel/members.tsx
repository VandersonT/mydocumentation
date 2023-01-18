import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";

const Members = () => {
    return (
        <Layout selected="members">
            <>
                <Head>
                    <title>Members - Panel</title>
                </Head>
                <Title content="Members" />
            </>
        </Layout>
    )
}

export default Members;