import { ReactElement } from 'react';
import MenuPanel from '../components/MenuPanel';
import style from './Layout.module.css';

type Props = {
    children: ReactElement
    selected?: string
}

export const Layout = ({ children, selected }: Props) => {

    return (
        <div>
            <MenuPanel selected={selected} />
            <div className={style.content}>
                {children}
            </div>
        </div>
    );

}