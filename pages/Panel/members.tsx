import { GetServerSideProps } from "next";
import Head from "next/head";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Members.module.css';
import { User } from "../../types/User";

type Props = {
    admins: User[]
}

const Members = ({ admins }: Props) => {

    console.log(admins)
    return (
        <Layout selected="members">
            <>
                <Head>
                    <title>Members - Panel</title>
                </Head>
                <Title content="Members" buttonPath="/Panel/add_member" />
                
                <p className={style.subTitle}>All members ({admins.length})</p>
                <div className={style.tableBox}>
                    <table className={style.table}>
                        <tbody>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                </tr>
                                {admins.map((admin: User, index: number)=>(
                                    <tr key={index}>
                                        <td>
                                            <img src={`
                                                http://localhost:3000/assets/images/${(admin['position'] == '2') ? 'owner.png' : 'adm.jpg' }`}
                                            />
                                        </td>
                                        <td className={style.link}>{admin['name']}</td>
                                        <td>{admin['phone']}</td>
                                        <td className={style.link}>
                                            <a target="_blank" href={`mailto:${admin['email']}`}>{admin['email']}</a>    
                                        </td>
                                        <td>{(admin['position'] == '2') ? 'Global Moderator' : 'Administrator'}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </>
        </Layout>
    )
}

export default Members;

export const getServerSideProps: GetServerSideProps = async (context) => {

    let res = await fetch('http://localhost:4000/staff');
    let response = await res.json();


    return {
        props:{
            admins: response['admins']
        }
    }
}