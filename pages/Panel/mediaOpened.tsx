import style from '../../styles/Admin/mediaOpened.module.css';
import Image from 'next/image';

const mediaOpened = () => {
    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.header}>
                    <h3>Attachment details</h3>
                    <button>
                        <Image
                            src="/assets/images/close.png" alt="close"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
                <div className={style.contentBox}>
                    <div className={style.content}>
                        <Image
                            src="/assets/images/media.png" alt="close"
                            width={616}
                            height={359}
                        />
                        <button>Delete</button>
                    </div>
                    <div className={style.sidebar}>
                        <div>
                            <p>Title</p>
                            <input type="text" />
                        </div>
                        <div>
                            <p>Alternative Text</p>
                            <input type="text" />
                        </div>
                        <div className={style.url}>
                            <p>File Url</p>
                            <input type="text" value="teste" disabled />
                            <button>Copy URL to clipboard</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default mediaOpened;