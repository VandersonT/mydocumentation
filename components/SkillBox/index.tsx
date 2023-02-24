import style from './SkillBox.module.css';

type Props = {
    img: string,
    title: string,
    text: string
}

export const SkillBox = ({img, title, text}: Props) => {
    return (
        <div className={style.services__single}>
            <img className={style.serviceSingle__image} src={`${process.env.NEXT_PUBLIC_SYSTEMURL}/assets/images/${img}`} alt="image about service" />
            <div className={style.serviceSingle__info}>
                <h2>{title}</h2>
                <p className={style.text}>{text}</p>
            </div>
        </div>
    );
}