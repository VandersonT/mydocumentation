import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/Topic.module.css';

const Topic = () => {
    return (
        <Layout>
            <div className={style.mainTitle}>
                <i className="fa-solid fa-rotate-left"></i>
                <h1>PHP Documentation <i className={`fa-solid fa-pen-to-square ${style.editIcon}`}></i></h1>
                <div></div>
            </div>
        </Layout>
    );
}

export default Topic;