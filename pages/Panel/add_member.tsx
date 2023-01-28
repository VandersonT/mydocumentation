import { Title } from "../../components/Title";
import { Layout } from "../../Layouts";
import style from '../../styles/Admin/NewMember.module.css';

const add_member = () => {
    return (
        <Layout selected="members">
            <>
                
                <Title content="Add New Member" />
                <p className={style.subTitle}>Create a new account and send it to the person who will use it.
                Afterwards, the person can enter the 'Staff' section and edit their user.</p>

                <form className={style.form}>
                    <label htmlFor="name">Username:</label>
                    <input id="name" type="text" />

                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" />
                    
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" type="text" />

                    <label>Password:</label>
                    <div>
                        <input type="text" />
                        <button className={style.togglePass}><i className="fa-solid fa-eye"></i>Hide</button>
                    </div>
                    <button className={style.buttonGenerate}>Generate Password</button>

                    <label>Position:</label>
                    <select>
                        <option>Administrador</option>
                        <option>Moderador Global</option>
                    </select>

                    <button className={style.registerButton}>Register</button>
                </form>

            </>
        </Layout>
    )
}

export default add_member;