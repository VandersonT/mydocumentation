import { useState } from 'react';
import style from './Warning.module.css';

type Props = {
    title?: string,
    content: string
}

const Warning = ({ title, content }: Props) => {
    
    const [ showFlash, setShowFlash ] = useState(true);

    return (
        <>
            {showFlash &&
                <div className={style.warningBox}>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <div className={style.warningBox_info}>
                        <h3>{(title) ? title : 'Success'}</h3>
                        <p>{content}</p>
                    </div>
                    <button onClick={()=>setShowFlash(false)}>Close</button>
                </div>
            }
        </>
    );
}

export default Warning;