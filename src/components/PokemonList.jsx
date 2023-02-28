import Pokemon from "./Pokemon";
import React, { useState, useEffect } from "react";
import { fetchPokemons } from "../api/fetchPokemons";

const sleep = () => new Promise((r) => setTimeout(r, 1000));

const PokemonList = () => {
  const numberPokemons = 12;

  const [pokemons, setPokemons] = useState([]);
  // const [pokemonsLoaded, setPokemonsLoaded] = useState(false)

  const initialСatchPokemons = Object.fromEntries(
    pokemons.map((pokemon) => {
      return [pokemon.id, false];
    })
  );
  const [catchPokemons, setCatchPokemons] = useState(initialСatchPokemons);

  const [numberPage, setNumberPage] = useState(1);

  useEffect(() => {
    downloadPokemons();
  }, [numberPage]);

  async function counter(id) {
    await sleep();
    setCatchPokemons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  let counterCatchPokemons = Object.values(catchPokemons).filter(
    (value) => value === true
  ).length;

  function downloadPokemons() {
    fetchPokemons(numberPage).then((dataPokemons) => {
      setPokemons(dataPokemons);
      // setPokemonsLoaded(true)
    });
  }

  //Если стейт меняем на основе предыдущего, то лучше писать коллбек

  function goForward() {
    setNumberPage((numberPage) => numberPage + 1);
  }

  function goBack() {
    setNumberPage((numberPage) => numberPage - 1);
  }

  // if(!pokemonsLoaded) {
  //   return <button className='btn' onClick={downloadPokemons}>Загрузить покемонов</button>
  // }

  return (
    <div className="pokemons">
      <h1 className="title">Поймано покемонов</h1>
      <p className="counter">
        {counterCatchPokemons}/{pokemons.length}
      </p>
      <div className="btnPokemons">
        <button
          disabled={numberPage === 1}
          onClick={goBack}
          className="btnPokemons1">
          Назад
        </button>
        <p className="text">{numberPage}</p>
        <button onClick={goForward} className="btnPokemons2">
          Вперёд
        </button>
      </div>
      <div className="container-pokemons">
        {pokemons.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            togglePokemon={counter}
            isCatch={catchPokemons[pokemon.id]}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
