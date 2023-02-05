import { Layout } from "../../../Layouts";
import style from '../../../styles/Admin/NewDoc.module.css';
import dynamic from 'next/dynamic'
import { Title } from "../../../components/Title";


const Docs = () => {

    return (
        <Layout selected="docs">
            <>
            <Title content="Add New Doc" />
                <p className={style.subTitle}>Be careful, you can't edit the data after creating the documentation.
                Make sure all data is entered correctly.</p>

                <form className={style.form}>
                    <label htmlFor="docName">Doc Name:</label>
                    <input id="docName" type="text" />

                    <label htmlFor="description">Description:</label>
                    <input id="description" type="text" />
                    
                    <label htmlFor="imageUrl">Image Url:</label>
                    <input id="imageUrl" type="text" />

                    <label htmlFor="slug">Slug:</label>
                    <input id="slug" type="text" />

                    <button className={style.registerButton}>Register</button>
                </form>
            </>
        </Layout>
    )
}

export default Docs;