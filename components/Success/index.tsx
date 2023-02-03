import { useState } from 'react';
import style from './Success.module.css';

type Props = {
    title?: string,
    content: string,
    closeFunction: () => void
}

const Success = ({ title, content, closeFunction }: Props) => {
    
    const [ showFlash, setShowFlash ] = useState(true);

    return (
        <>
            {showFlash &&
                <div className={style.successBox}>
                    <i className="fa-regular fa-circle-check"></i>
                    <div className={style.successBox_info}>
                        <h3>{(title) ? title : 'Success'}</h3>
                        <p>{content}</p>
                    </div>
                    <button onClick={closeFunction}>Close</button>
                </div>
            }
        </>
    );
}

export default Success;