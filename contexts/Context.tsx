import { createContext, useReducer } from "react";
import { ThemeType, themeInitialState, themeReducer } from '../reducers/themeReducer';
import { reducerActionType } from "../types/reducerActionType";

type initialStateType = {
    theme: ThemeType;
}

type ContextType = {
    state: initialStateType;
    dispatch: React.Dispatch<any>;
}

const initialState = {
    theme: themeInitialState    
}

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
    theme: themeReducer(state.theme, action)
});

export const ContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [ state, dispatch ] = useReducer(mainReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}