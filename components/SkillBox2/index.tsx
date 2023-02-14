import style from './SkillBox2.module.css';

type Props = {
    img: string,
    title: string,
    text: string
}

export const SkillBox2 = ({img, title, text}: Props) => {
    return (
        <div className={style.docSingle}>
            <img src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/"+img`} />
            <div className={style.docSingle__info}>
                <h2>{title}</h2>
                <p className={style.text}>{text}</p>
            </div>
        </div>
    );
}