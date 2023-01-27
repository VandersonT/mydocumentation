import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/Topic.module.css';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const Jodit = () => {

    const editor = useRef(null);
    const [ content, setContent ] = useState('teste');

    const config = {
        readonly: false,
        height: 400
    };

    const handlerUpdate = (event) => {
        const editorContent = event.target.value;
        setContent(editorContent);
    }

    return (
        <>
            <div className={style.mainTitle}>
                <i className="fa-solid fa-rotate-left"></i>
                <h1>PHP Documentation <i className={`fa-solid fa-pen-to-square ${style.editIcon}`}></i></h1>
                <div></div>
            </div>

            <div className={style.app}>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={(newContent) => {}}
                />
            </div>

            <div className={style.showResult}>
                {content}
            </div>

        </>
    );
}

export default Jodit;