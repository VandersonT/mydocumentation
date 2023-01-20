import style from './Title.module.css';

type Props = {
    content: string,
    side?: 'left' | 'center'
}

export const Title = ({ content, side }: Props) => {
    return (
        <div className={style.main}>
            <h1  className={`${style.title} ${(side == 'center') ? style.tittle_center : '' }`}>
                    {content}
            </h1>
            {side != 'center' &&
                <div className={style.line}></div>
            }
        </div>
    )
}