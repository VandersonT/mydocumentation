import Head from "next/head";
import Link from "next/link";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Media.module.css';

const Media = () => {
    return (
        <Layout selected="media">
            <>
                <Head>
                    <title>Media - Panel</title>
                </Head>
                <Title content="Media" />

                <div className={style.menuBar}>
                    <select>
                        <option>All media</option>
                    </select>
                    <button>Delete All</button>
                </div>

                <section className={style.mediaBox}>
                    <div className={style.newMedia}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <Link href="/Panel/mediaOpened">
                        <img src="http://localhost:3000/assets/images/mediaTest.png" className={style.mediaSingle} />
                    </Link>
                    <Link href="/">
                        <img src="http://localhost:3000/assets/images/mediaTest.png" className={style.mediaSingle} />
                    </Link>
                </section>

            </>
        </Layout>
    )
}

export default Media;