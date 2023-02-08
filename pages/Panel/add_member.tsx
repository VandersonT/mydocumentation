import { GetServerSideProps } from "next";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Title } from "../../components/Title";
import { authentication } from "../../helpers/auth";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/NewMember.module.css';
import { User } from "../../types/User";

type Props = {
    loggedAdmin: User
}

const add_member = ({ loggedAdmin }: Props) => {

    const [ showPass, setShowPass ] = useState(false);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ position, setPosition ] = useState("1");


    /*-------------------UserEffects--------------------*/
    useEffect(()=>{
        if(!loggedAdmin){
            destroyCookie(undefined, 'token');
            Router.push('/Panel/login');
        }
    },[])
    /*--------------------------------------------------*/

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

    const submit = () => {
        
    }

    return (
        <Layout selected="members">
            <>
                ddddd: {loggedAdmin['name']}
                <Title content="Add New Member" />
                <p className={style.subTitle}>Create a new account and send it to the person who will use it.
                Afterwards, the person can enter the 'Members' section and edit their user.</p>

                <div className={style.form}>
                    <label htmlFor="name">Username:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>

                    <label htmlFor="pass">Password:</label>
                    <div className={style.passwordBox}>
                        <input id="pass" type={(showPass) ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={togglePass} className={style.togglePass}><i className="fa-solid fa-eye"></i>{(showPass) ? 'Hide' : 'Show'}</button>
                    </div>
                    <button className={style.buttonGenerate} onClick={generatePass}>Generate Password</button>

                    <label>Position:</label>
                    <select value={position} onChange={e => setPosition(e.target.value)}>
                        <option value="1">Administrator</option>
                        <option value="2">Global Moderator</option>
                    </select>

                    <button className={style.registerButton} onClick={submit}>Register</button>
                </div>

            </>
        </Layout>
    )
}

export default add_member;

export const getServerSideProps: GetServerSideProps = async (context) => {

    /*Try to authenticate*/
    const cookies = parseCookies(context);
    let user = await authentication(cookies.token);


    return {
        props:{
            loggedAdmin: user['userFound'] || null
        }
    }
}