import { useState } from 'react';
import style from './Error.module.css';

type Props = {
    title?: string,
    content: string,
    closeFunction: () => void
}

const Error = ({ title, content, closeFunction }: Props) => {
    
    const [ showFlash, setShowFlash ] = useState(true);

    return (
        <>
            {showFlash &&
                <div className={style.errorBox}>
                    <i className="fa-solid fa-bug"></i>
                    <div className={style.errorBox_info}>
                        <h3>{(title) ? title : 'Error'}</h3>
                        <p>{content}</p>
                    </div>
                    <button onClick={closeFunction}>Close</button>
                </div>
            }
        </>
    );
}

export default Error;