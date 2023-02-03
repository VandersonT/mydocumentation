import { useState } from 'react';
import style from './Warning.module.css';

type Props = {
    title?: string,
    content: string,
    closeFunction: () => void
}

const Warning = ({ title, content, closeFunction }: Props) => {
    
    const [ showFlash, setShowFlash ] = useState(true);

    return (
        <>
            {showFlash &&
                <div className={style.warningBox}>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <div className={style.warningBox_info}>
                        <h3>{(title) ? title : 'Warning'}</h3>
                        <p>{content}</p>
                    </div>
                    <button onClick={()=>setShowFlash(false)}>Close</button>
                </div>
            }
        </>
    );
}

export default Warning;