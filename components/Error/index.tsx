import { useState } from 'react';
import style from './Error.module.css';

type Props = {
    title?: string,
    content: string
}

const Error = ({ title, content }: Props) => {
    
    const [ showFlash, setShowFlash ] = useState(true);

    return (
        <>
            {showFlash &&
                <div className={style.errorBox}>
                    <i className="fa-solid fa-bug"></i>
                    <div className={style.errorBox_info}>
                        <h3>{(title) ? title : 'Success'}</h3>
                        <p>{content}</p>
                    </div>
                    <button onClick={()=>setShowFlash(false)}>Close</button>
                </div>
            }
        </>
    );
}

export default Error;