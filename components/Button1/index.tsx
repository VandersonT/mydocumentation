import style from './Button.module.css';
import Link from 'next/link';

type Props = {
    text: string,
    path: string
}

export const Button1 = ({text, path}: Props) => {
    return <Link href={path}><a className={style.button}>{text}</a></Link>
}