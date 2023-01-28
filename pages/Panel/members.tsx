import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Members.module.css';

const Members = () => {
    return (
        <Layout selected="members">
            <>
                <Head>
                    <title>Members - Panel</title>
                </Head>
                <Title content="Members" buttonPath="/" />
                
                <p className={style.subTitle}>All members (3)</p>
                <table className={style.table}>
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Since</th>
                        </tr>
                        <tr>
                            <td>
                                <img src="http://localhost:3000/assets/images/avatarTest.png" />
                            </td>
                            <td className={style.link}>Vanderson Tiago</td>
                            <td>(33)98886-0799</td>
                            <td className={style.link}>vandersontpaulo@gmail.com</td>
                            <td>Owner</td>
                            <td>12/01/2022</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="http://localhost:3000/assets/images/avatarTest.png" />
                            </td>
                            <td className={style.link}>Vanderson Tiago</td>
                            <td>(33)98886-0799</td>
                            <td className={style.link}>vandersontpaulo@gmail.com</td>
                            <td>Owner</td>
                            <td>12/01/2022</td>
                        </tr>
                    </tbody>
                </table>
            </>
        </Layout>
    )
}

export default Members;