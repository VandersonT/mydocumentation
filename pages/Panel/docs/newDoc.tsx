import { Layout } from "../../../Layouts";
import style from '../../../../styles/Admin/Docs.module.css';
const Jodit = dynamic(() => import('./Jodit'), { ssr: false })
import dynamic from 'next/dynamic'


const Docs = () => {

    return (
        <Layout selected="docs">
            <>
                <Jodit />
            </>
        </Layout>
    )
}

export default Docs;