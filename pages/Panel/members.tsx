import { GetServerSideProps } from "next";
import Head from "next/head";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { authentication } from "../../helpers/auth";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Members.module.css';
import { User } from "../../types/User";

type Props = {
    admins: User[],
    loggedAdmin: User
}

const Members = ({ admins, loggedAdmin }: Props) => {

    /*-------------------UserEffects--------------------*/
    useEffect(()=>{
        if(!loggedAdmin){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])
    /*--------------------------------------------------*/

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

    /*Try to authenticate*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);

    /*Get staff's*/
    let res = await fetch('http://localhost:4000/staff');
    let response = await res.json();


    return {
        props:{
            admins: response['admins'],
            loggedAdmin: user['userFound'] || null
        }
    }
}