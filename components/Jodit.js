import { Layout } from '../Layouts';
import style from '../styles/Admin/Topic.module.css';
import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import Link from 'next/link';
import Success from './Success';

const Jodit = ({sendContent, defaultContent}) => {
    
    const editor = useRef(null);
    const [ content, setContent ] = useState(defaultContent);
    const [ flashSuccess, setFlashSuccess ] = useState('');

    const config = {
        readonly: false,
        height: 500
    };

    const handlerUpdate = (event) => {
        const editorContent = event.target.value;
        setContent(editorContent);
    }

    const syncAction = () => {
        sendContent(content);
        setFlashSuccess('You can save now, your data is synced.')
    }

    const closeFlash = () => {
        setFlashSuccess('');
    }

    return (
        <>
            {flashSuccess &&
                <Success content={flashSuccess} closeFunction={closeFlash} />
            }

            <section className={style.editor}>
                <div className={style.editorHead}>
                    <h3 className={style.TitleSection}>Editor</h3>
                    <button className={style.syncButton} onClick={syncAction}>
                        Sync <i className="fa-solid fa-rotate"></i>
                    </button>
                </div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={(newContent) => {}}
                />
            </section>

            {/*<section className={style.showResultBox}>
                <div className={style.editorHead}>
                    <h3 className={style.TitleSection}>Preview</h3>
                </div>
                
                <div className={style.showResult}>
                   { content}
                </div>
            </section>
            */}

        </>
    );
}

export default Jodit;