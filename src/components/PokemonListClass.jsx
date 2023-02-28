import Pokemon from "./Pokemon";
import React, { useState, useEffect } from "react";
import { fetchPokemons } from "../api/fetchPokemons";

export class PokemonListClass extends React.Component {
  // state = {
  //   catchPokemons: {
  //     25: true,
  //     201: false,
  //     556: false,
  //   },
  // };

  constructor() {
    super();
    this.state = {
      catchPokemons: {
        25: true,
        201: false,
        556: false,
      },
      numberPage: 1,
      pokemons: [],
    };

    // // const x = 2 + 1;

    // console.log("hasOwnProperty", this.hasOwnProperty("counter"));
    // console.log("in", "counter" in this);

    // console.log("this", Object.keys(this)); //экземпляр класса PokemonListClass
    // console.log("this.__proto__", this.__proto__); // PokemonListClass.prototype === {counter, render}
    // console.log("this.__proto__.__proto__", this.__proto__.__proto__); // React.Component.prototype === { setState }

    this.counter = this.counter.bind(this);
    this.goForward = this.goForward.bind(this);
    this.goBack = this.goBack.bind(this);
    // // this.counter = this.__proto__.counter.bind(this);
    // // this.counter = PokemonListClass.prototype.counter.bind(this);
    // //Решает проблему того, что каждый раз в рендере не вызывается функция bind.
    // //

    // console.log("end", Object.keys(this)); //экземпляр класса PokemonListClass
    // console.log("end", this); //экземпляр класса PokemonListClass
  }

  componentDidMount() {
    this.downloadPokemons();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", { prevState, state: this.state });
    if (prevState.numberPage !== this.state.numberPage) {
      this.downloadPokemons();
    }
  }

  downloadPokemons() {
    fetchPokemons(this.state.numberPage).then((dataPokemons) => {
      this.setState({
        pokemons: dataPokemons,
      });
    });
  }

  goForward() {
    this.setState((prev) => {
      return {
        numberPage: prev.numberPage + 1,
      };
    });
  }

  goBack() {
    this.setState((prev) => {
      return {
        numberPage: prev.numberPage - 1,
      };
    });
  }

  counter(id) {
    // console.log("counter >>>", id);
    // console.log("this", this);
    this.setState((prev) => {
      return {
        catchPokemons: {
          ...prev.catchPokemons,
          [id]: !prev.catchPokemons[id],
        },
      };
    });
  }

  render() {
    // const pokemons = [
    //   { id: "25", name: "pikachu" },
    //   { id: "201", name: "unown" },
    //   { id: "556", name: "maractus" },
    // ];

    let counterCatchPokemons = Object.values(this.state.catchPokemons).filter(
      (value) => value === true
    ).length;

    const result = (
      <div className="pokemons">
        <h1 className="title">Поймано покемонов</h1>
        <p className="counter">
          {counterCatchPokemons}/{this.state.pokemons.length}
        </p>
        <div className="btnPokemons">
          <button
            disabled={this.state.numberPage === 1}
            onClick={this.goBack}
            className="btnPokemons1">
            Назад
          </button>
          <p className="text">{this.state.numberPage}</p>
          <button onClick={this.goForward} className="btnPokemons2">
            Вперёд
          </button>
        </div>
        <div className="container-pokemons">
          {this.state.pokemons.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              togglePokemon={this.counter}
              isCatch={this.state.catchPokemons[pokemon.id]}
              pokemon={pokemon}
            />
          ))}
        </div>
      </div>
    );

    // React.createElement
    console.log(result);
    return result;
  }
}

//любой комипонент возврашает реакт-элемент или какой-то примитив
//рендеринг в браузере - отрисовка
//рендеринг в реакте - вызов функционального компонента/метода render в классах создание реакт-элемента, не имеет к отрисовке. имеет отношение к виртуалноу дому.
//отрисовка - когда в DOM чет поменялос

// https://beta.reactjs.org/learn/render-and-commit

//componentDidCatch
//DidUnmount