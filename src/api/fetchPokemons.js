const numberPokemons = 12;

export function fetchPokemons(page) {
    const offset = (page - 1) * numberPokemons;
    return fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${numberPokemons}`
        )
        .then((response) => response.json())
        .then((data) => {
            // "https://pokeapi.co/api/v2/pokemon/19/"
            return data.results.map((obj) => {
                return {
                    id: obj.url.slice(34, -1),
                    name: obj.name
                };
            });
        });
}