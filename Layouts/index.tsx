import { ReactElement } from 'react';
import MenuPanel from '../components/MenuPanel';
import style from './Layout.module.css';

type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {

    return (
        <div>
            <MenuPanel />
            <div className={style.content}>
                {children}
            </div>
        </div>
    );

}