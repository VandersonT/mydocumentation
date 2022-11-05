/*----------------IMPORTS-----------------------*/
import style from './Footer.module.css';
/*----------------------------------------------*/

const Footer = () => {
    return (
        <footer>
            <div className={style.footerInfo}>
                <h3>Others Docs</h3>
                <div className={style.docsMainBox}>
                    <div className={style.docsBox}>
                        <p>Php Documentation</p>
                        <p>Node.js Documentation</p>
                        <p>Next Documentation</p>
                    </div>
                    <div className={style.docsBox}>
                        <p>React.js Documentation</p>
                        <p>Adonis Documentation</p>
                        <p>Laravel Documentation</p>
                    </div>
                    <div className={style.docsBox}>
                        <p>Pyton Documentation</p>
                        <p>C/C++ Documentation</p>
                        <p>Gulp Documentation</p>
                    </div>
                    <div className={style.docsBox}>
                        <p>Git/GitHub Documentation</p>
                        <p>Docker Documentation</p>
                        <p>JavaScript Documentation</p>
                    </div>
                </div>
            </div>

            <div className={style.copyright}>
                <p>MyDocumentations 2022 © Some rights reserved</p>
            </div>
        </footer>
    );
}
export default Footer;