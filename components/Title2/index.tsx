import Link from 'next/link';
import style from './Title2.module.css';

type Props = {
    content: string,
    returnPath: string,
    buttonPath: string
}

const Title2 = ({ content, returnPath, buttonPath }: Props) => {
    return (
        <main className={style.main}>
            <Link href={returnPath}>
                <i className={`fa-solid fa-rotate-left ${style.return}`}></i>
            </Link>
            <h1 className={style.title}>{content}</h1>
            <div></div>
        </main>
    )
}

export default Title2;