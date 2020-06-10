import { createReducer, on } from '@ngrx/store';
import * as actions from './filtro.actions';
import { setFiltro } from './filtro.actions';


export const initialState: actions.filtrosValidos = 'todos';

const _filtroReducer = createReducer(initialState,
    on(actions.setFiltro, (state, { filtro }) => filtro)
);

export function filtroReducer(state, action) {
    return _filtroReducer(state, action);
}
