import Link from 'next/link';
import style from './Title.module.css';

type Props = {
    content: string,
    buttonPath?: string
}

export const Title = ({ content, buttonPath }: Props) => {
    return (
        <div className={style.main}>
            <div>
                <h1  className={style.title}>
                        {content}
                </h1>
                <div className={style.line}></div>
            </div>
            {buttonPath &&
                <Link href={buttonPath}>
                    <button className={style.button}>Add new</button>
                </Link>
            }
        </div>
    )
}