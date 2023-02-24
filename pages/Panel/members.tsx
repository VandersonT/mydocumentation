/*----------------------------------Imports-------------------------------*/
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import MenuPanel from "../../components/MenuPanel";
import { Title } from "../../components/Title";
import { authentication } from "../../helpers/auth";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/Members.module.css';
import { User } from "../../types/User";
/*------------------------------------------------------------------------*/



/*-------------------------------------Types------------------------------*/
type Props = {
    admins: User[],
    loggedAdmin: User
}
/*------------------------------------------------------------------------*/



const Members = ({ admins, loggedAdmin }: Props) => {


    /*--------------------------------States----------------------------------*/
    /*------------------------------------------------------------------------*/



    /*------------------------------UseEffects--------------------------------*/
    /*------------------------------------------------------------------------*/


    /*-------------------------------Functions--------------------------------*/
    /*------------------------------------------------------------------------*/

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
                                            ${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/${(admin['position'] == '2') ? 'owner.png' : 'adm.jpg' }`}
                                        />
                                    </td>
                                    <Link href={`/Panel/edit_member/${admin['id']}`}>
                                        <td className={style.link}>{admin['name']} {loggedAdmin['id'] == admin['id'] ? '[You]' : ''}</td>
                                    </Link>
                                    <td>{admin['phone']}</td>
                                    <td className={style.link}>
                                        <a target="_blank" rel="noreferrer" href={`mailto:${admin['email']}`}>{admin['email']}</a>    
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

    /*----------------------Try to authenticate-------------------------------*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);//Try to authenticate
    
    if(!user){
        nookies.set(context, 'token', '', {
            maxAge: -1,
            path: '/',
        });
        return {redirect: {destination: '/Panel/login',permanent: false,}}
    }
    /*------------------------------------------------------------------------*/


    /*-----------------------Get staff's--------------------------------------*/
    let res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/staff`);
    let response = await res.json();
    /*------------------------------------------------------------------------*/


    return {
        props:{
            admins: response['admins'],
            loggedAdmin: user['userFound'] || null
        }
    }
}