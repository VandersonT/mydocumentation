import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Docs.module.css';

const Docs = () => {

    const [ docButtonBox, setDocButtonBox ] = useState([false]);

    const openMenu = (index: number) => {
        let aux = [];
        for(let i = 0; i < docButtonBox.length; i++)
            aux[i] = false;

        aux[index] = true;
        setDocButtonBox(aux);
    }

    const closeMenu = (index: number) => {
        setDocButtonBox([false]);
    }

    return (
        <Layout selected="docs">
            <>
                <Head>
                    <title>Documentations - Panel</title>
                </Head>
                <Title content="Documentations" buttonPath="/" />

                <p>All documentation (5)</p>
                <div>
                    <table className={style.table}>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                            </tr>
                            <tr onMouseMove={ () => openMenu(0)} onMouseLeave={() => closeMenu(0)}>
                                <td>
                                    <Link href=""><p className={style.pointer}>PHP Documentation</p></Link>
                                    
                                    {docButtonBox[0] &&
                                        <div className={style.tdButtonBox}>
                                            <Link href=""><button>Edit</button></Link>
                                            <button>Trash</button>
                                            <a href="" target="_blank"><button>View Online</button></a>
                                        </div>
                                    }
                                </td>
                                <td><Link href=""><p>Vanderson Tiago</p></Link></td>
                                <td><p>20/11/2022</p></td>
                            </tr>
                            <tr onMouseMove={ () => openMenu(1)} onMouseLeave={() => closeMenu(1)}>
                                <td>
                                    <Link href=""><p className={style.pointer}>Node Documentation</p></Link>
                                    
                                    {docButtonBox[1] &&
                                        <div className={style.tdButtonBox}>
                                            <Link href=""><button>Edit</button></Link>
                                            <button>Trash</button>
                                            <a href="" target="_blank"><button>View Online</button></a>
                                        </div>
                                    }
                                </td>
                                <td><Link href=""><p>Vanderson Tiago</p></Link></td>
                                <td><p>20/11/2022</p></td>
                            </tr>
                            <tr onMouseMove={ () => openMenu(2)} onMouseLeave={() => closeMenu(2)}>
                                <td>
                                    <Link href=""><p className={style.pointer}>Adonis Documentation</p></Link>
                                    
                                    {docButtonBox[2] &&
                                        <div className={style.tdButtonBox}>
                                            <Link href=""><button>Edit</button></Link>
                                            <button>Trash</button>
                                            <a href="" target="_blank"><button>View Online</button></a>
                                        </div>
                                    }
                                </td>
                                <td><Link href=""><p>Vanderson Tiago</p></Link></td>
                                <td><p>20/11/2022</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        </Layout>
    )
}

export default Docs;