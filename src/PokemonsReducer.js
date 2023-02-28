function pokemonsReducer(state = [], action) {
    if (action.type === 'GET__POKEMONS') {
        return action.pokemons;
    }
    return state;
}


//Редюсер на пойманных покемонов и 1 на номер текущей страницы
//Объединить их
//Завести стор, 
//Пойти в компогент и начать вызывать там методы стора useSelector и useDispatch