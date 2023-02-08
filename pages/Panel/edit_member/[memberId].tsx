import { GetServerSideProps } from "next";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Error from "../../../components/Error";
import Success from "../../../components/Success";
import { Title } from "../../../components/Title";
import { authentication } from "../../../helpers/auth";
import { Layout } from "../../../Layouts";
import style from '../../../styles/Admin/NewMember.module.css';
import { User } from "../../../types/User";

type Props = {
    adminInfo: User,
    loggedAdmin: User
}

const edit_member = ({ adminInfo, loggedAdmin }: Props) => {
    
    const [ showPass, setShowPass ] = useState(false);
    const [ name, setName ] = useState(adminInfo['name']);
    const [ email, setEmail ] = useState(adminInfo['email']);
    const [ phone, setPhone ] = useState(adminInfo['phone']);
    const [ password, setPassword ] = useState('');
    const [ position, setPosition ] = useState(adminInfo['position']);
    const [ flashSuccess, setFlashSuccess ] = useState('');
    const [ flashError, setFlashError ] = useState('');

    /*-------------------UserEffects--------------------*/
    useEffect(()=>{
        if(!loggedAdmin){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])
    /*--------------------------------------------------*/

    const closeFlashs = () => {
        setFlashError('');
        setFlashSuccess('');
    }

    const generatePass = () => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }
        
        setPassword(password);
        setShowPass(true);
    }

    const togglePass = () => {
        setShowPass(!showPass);
    }

    const trySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if(loggedAdmin['position'] == "1" && loggedAdmin['id'] != adminInfo['id']){
            console.log('nao é dono e nem é seu perfil')
            setFlashError("You can only edit your own profile.")
            return;
        }

        setPosition(e.target.value as string);
    }

    const submit = () => {
        

        setFlashSuccess("This profile has been updated.")
    }

    return (
        <Layout selected="members">
            <>

                {flashSuccess &&
                    <Success content={flashSuccess} closeFunction={closeFlashs} />
                }
                {flashError &&
                    <Error content={flashError} closeFunction={closeFlashs} />
                }

                <Title 
                    content={(loggedAdmin['id'] == adminInfo['id']) ? 'Your Profile' : adminInfo['name']+"'s Profile"}
                />

                <p className={style.subTitle}>The administrator can only edit his own account. The Global Moderator can edit all account.</p>

                <div className={style.form}>
                    <label htmlFor="name">Username:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>

                    <label htmlFor="pass">New Password:</label>
                    <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your new pass (Optional)" />

                    <label>Position:</label>
                    <select value={position} onChange={trySelect}>
                        <option value="1">Administrator</option>
                        <option value="2">Global Moderator</option>
                    </select>

                    <button className={style.registerButton} onClick={submit}>Save Changes</button>
                </div>

            </>
        </Layout>
    )
}

export default edit_member;

export const getServerSideProps: GetServerSideProps = async (context) => {

    /*Get logged admin data*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);

    /*Get admin profile data*/
    const profileId = context.query.memberId as string;

    let res = await fetch(`http://localhost:4000/staff/${profileId}`);
    let response = await res.json();

    if(response['error']){
        return {
            redirect: {
                destination: '/Panel',
                permanent: false,
            },
        }
    }

    return {
        props: {
            adminInfo: response['admin'],
            loggedAdmin: user['userFound'] || null
        }
    }
}