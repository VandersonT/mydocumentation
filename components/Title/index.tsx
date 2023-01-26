import Link from 'next/link';
import style from './Title.module.css';

type Props = {
    content: string,
    side?: 'left' | 'center',
    buttonPath?: string
}

export const Title = ({ content, side, buttonPath }: Props) => {
    return (
        <div className={style.main}>
            <div>
                <h1  className={`${style.title} ${(side == 'center') ? style.tittle_center : '' }`}>
                        {content}
                </h1>
                {side != 'center' &&
                    <div className={style.line}></div>
                }
            </div>
            {buttonPath &&
                <Link href={buttonPath}>
                    <button className={style.button}>Add new</button>
                </Link>
            }
        </div>
    )
}