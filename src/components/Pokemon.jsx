import React, { useState } from "react";
import "../styles/Pokemons.css";

const Pokemon = ({ pokemon, isCatch, togglePokemon }) => {
  // const {pokemon} = props;

  // const [isCatch, setIsCatch] = useState(false)
  // function catchPokemons() {
  // 	setIsCatch(!isCatch)
  // 	countCatchP(!isCatch)
  // }

  const [state, setState] = useState(0);
  return (
    <div
      style={{ backgroundColor: isCatch ? "red " : "green" }}
      className="pokemon">
      <p className="pokemon__name">
        {pokemon.id}
        {pokemon.name} {state}
      </p>
      <img
        onClick={() => setState((p) => p + 1)}
        className="pokemon__image"
        width={96}
        height={96}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <button
        onClick={() => {
          const obj = { x: 1, y: 2, togglePokemon };

          obj.togglePokemon(pokemon.id);
        }}
        className="pokemon__button">
        {isCatch ? "Отпустить" : "Поймать"}
      </button>
    </div>
  );
};



export default Pokemon;
