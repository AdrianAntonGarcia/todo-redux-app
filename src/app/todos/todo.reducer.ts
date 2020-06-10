import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, borrarTodos } from './todo.actions';
import { Todo } from './models/todo.model';


export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del capitan américa')
];

// El operador spread nos retorna un nuevo arreglo sin mutar el original, es una copia
// No podemos hacer un push porque podríamos mutar el state
// El map regresa un nuevo arreglo
const _todoReducer = createReducer(estadoInicial,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
    on(borrarTodos, (state) => state.filter(todo => todo.completado === false)),
    on(toggleAll, (state, { completado }) => {
        return state.map(todo => {
            return {
                ...todo,
                completado
            };
        });
    }),
    on(toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                //Así mutamos el objeto
                // todo.completado = !todo.completado;
                // return todo;
                return {
                    ...todo,
                    completado: !todo.completado
                };
            } else {
                return todo;
            }
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                //Así mutamos el objeto
                // todo.completado = !todo.completado;
                // return todo;
                return {
                    ...todo,
                    texto
                };
            } else {
                return todo;
            }
        });
    }),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}
