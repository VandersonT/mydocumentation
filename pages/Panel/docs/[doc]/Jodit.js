import { Layout } from '../../../../Layouts';
import style from '../../../../styles/Admin/Topic.module.css';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import Link from 'next/link';

const Jodit = () => {

    const editor = useRef(null);
    const [ content, setContent ] = useState('');

    const config = {
        readonly: false,
        height: 500
    };

    const handlerUpdate = (event) => {
        const editorContent = event.target.value;
        setContent(editorContent);
    }

    return (
        <>
            <section className={style.mainTitle}>
                <Link href="/Panel/docs/php_documentation"><i className="fa-solid fa-rotate-left"></i></Link>
                <h1>PHP Documentation <i className={`fa-solid fa-pen-to-square ${style.editIcon}`}></i></h1>
                <button className={style.save}>Save</button>
            </section>

            <section className={style.metaTags}>
                <h3>Meta Tags</h3>
                <div className={style.struct}>
                    <div className={style.col}>
                        <input type="text" placeholder="Type a title"/>
                        <textarea placeholder="Type a description"></textarea>
                    </div>
                    <div className={style.col}>
                        <textarea placeholder="type metatags here (ex: carro, veiculo)"></textarea>
                    </div>
                </div>
            </section>

            <section className={style.editor}>
                <h3 className={style.TitleSection}>Editor</h3>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={(newContent) => {}}
                />
            </section>

            <section className={style.showResultBox}>
                <h3 className={style.TitleSection}>Preview</h3> 
                
                <div className={style.showResult}>
                   { HTMLReactParser(content)}
                </div>
            </section>

        </>
    );
}

export default Jodit;