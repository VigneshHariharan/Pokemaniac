// A person can have many teams
// A team will have its own data from analysis
// A team will consist no more than 6 pokemons
// Same pokemon can be choosen
import { setItemInCache, getItemFromCache } from './utils'
import { useState } from 'react'
const pokemonTeamKey = 'pokemonTeamKey'

// class Pokemon {
//   constructor (pokemonRawDetails) {
//     this.name = pokemonRawDetails.name
//     this.image =
//       pokemonRawDetails.sprites.front_default || 'images/pokeball.svg'
//     // this.stats = pokemon.stats
//   }
// }

export class PokemonTeam {
  constructor () {
    const data = getItemFromCache(pokemonTeamKey) || {}
    this.team = data.team || []
    this.pokemonData = data.pokemonData || {}
  }

  updateDataToStorage () {
    setItemInCache(
      pokemonTeamKey,
      {
        team: this.team,
        pokemonData: this.pokemonData
      },
      true
    )
  }

  addPokemon (pokemonRawDetails) {
    if (this.team.length >= 6) return 'Your team already has more number'
    // const pokemon = new Pokemon(pokemonRawDetails)
    this.team.push(pokemonRawDetails)
    this.updateDataToStorage()
  }

  deletePokemon (details) {
    this.team = this.team.filter(pokemon => details.name !== pokemon.name)
    this.updateDataToStorage()
  }

  getTeam () {
    return this.team
  }
}

export const pokemonTeam = new PokemonTeam()

class TeamHandler {
  createTeam (teamName) {}
}
