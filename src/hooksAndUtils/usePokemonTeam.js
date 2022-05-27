import { useState, useReducer, useMemo, useCallback, useEffect } from 'react'
import produce from 'immer';
import generateUniqueId from 'generate-unique-id';
import { useImmerReducer } from "use-immer";
import { setItemInCache, getItemFromCache } from './utils';


const pokemonTeamKey = 'pokemonTeamKey'

// team - { teamName: { team, analytics }, teamName }

function PokemonTeam (name, team, analytics, description) {
  this.teamName = name || "";
  this.team = team || [];
  this.analytics = analytics || {};
  this.description = description || "";
};

const initialPokemonTeam = [
  // {
  //   id:1,
  //   name:'Dragonite'
  // },
  // {
  //   id:2,
  //   name:'Swampert'
  // },
  // {
  //   id:3,
  //   name:'Infernape'
  // },
  //  {
  //   id:4,
  //   name:'Espeon'
  // },
  //  {
  //   id:5,
  //   name:'Goodra'
  // },
  //  {
  //   id:6,
  //   name:'Luxray'
  // },
];

const initialTeam = new PokemonTeam("Favs",initialPokemonTeam, {}, "The author's favourite")

function PokemonTeams () {
  this.teams = {
    teamOne: initialTeam
  }
  this.teamOrder = ['teamOne']
}

const getPokemonTeamDefaultValue = () => {
  console.log('f',getItemFromCache(pokemonTeamKey))
  return getItemFromCache(pokemonTeamKey) || new PokemonTeams()
}

const setPokemonTeamDefaultValue = value => {
  return setItemInCache(pokemonTeamKey, value, true)
}

//  TeamOne: {
//       teamName: 'Favourite Team',
//       team: [{ name: 'Dragonite' }]
//     }
const actions = {
  CREATE_TEAM: 'CREATE_TEAM',
  EDIT_TEAM: 'EDIT_TEAM',
  DELETE_TEAM: 'DELETE_TEAM',
  ADD_POKEMON_TO_TEAM: 'ADD_POKEMON_TO_TEAM',
  EDIT_POKEMON_IN_TEAM: 'EDIT_POKEMON_IN_TEAM',
  DELETE_POKEMON_IN_TEAM: 'DELETE_POKEMON_IN_TEAM'
}

const setPokemonDetailsTeam = pokemon => {
  return pokemon
}

// Using console in reducer makes 
const reducer = (state, action) => {
      console.log(state,'state')
      const payload = action.payload || {}
      switch (action.type) {
        case actions.CREATE_TEAM:
          state.teams[payload.teamId] = new PokemonTeam(payload.teamName);
          state.teamOrder.push(payload.teamId);
          return {...state};

        case actions.ADD_POKEMON_TO_TEAM:
          // id should be created
          const pokemonTeam = [...state.teams[payload.teamId].team, setPokemonDetailsTeam(payload.pokemonDetails)]
          // state.teams[payload.teamId].team.push();

          const newTeamDes = { ...state.teams, [payload.teamId]: { ...state.teams[payload.teamId], team: pokemonTeam } };
          // console.log("ADD_POKEMON_TO_TEAM",state)
          return {...state, teams: newTeamDes };


        case actions.DELETE_POKEMON_IN_TEAM:
          state.teams[payload.teamId].team = state.teams[payload.teamId].team.filter((pokemon) => pokemon.id !== payload.pokemonId);
          return {...state};


        case actions.EDIT_POKEMON_IN_TEAM:
          const currentTeamDetails = state.teams[payload.teamId];
          currentTeamDetails.team = currentTeamDetails.team.map((pokemon) => pokemon.id === payload.pokemonId ? payload.pokemonDetails : pokemon)
          return {...state};


        default:
          return state
      }
};

export const usePokemonTeam = () => {
  
  const initialState = useMemo(() => getPokemonTeamDefaultValue(),[])
  const [state,dispatch] = useReducer(reducer, initialState);

  useEffect(function updateStateInLocalStorage() {
      // console.log(state,'updateStateInLocalStorage')
        //     // similar to debounce logic
          let timerId = null;
          const debounceStoringState = (updatedState) => {
          let shouldSetTimeout = true;

             timerId = setTimeout(() => {
              if(state){
              console.log('-----state',updatedState)
                setPokemonTeamDefaultValue(updatedState) 
              }
              shouldSetTimeout = true;
            },0);
            shouldSetTimeout = false;
            
            }
          
          debounceStoringState(state)

          return () => {
            clearTimeout(timerId)
          }
    },[state])


  const addPokemonToTeam = (pokemon, teamId = 'teamOne') => {
    console.log('addPokemonToTeam',state.teams[teamId].team.length  )
    if(state.teams[teamId].team.length >= 6) return false;
    dispatch({
      type: actions.ADD_POKEMON_TO_TEAM,
      payload: {
        teamId: teamId || 'teamOne',
        pokemonDetails: {
          id: generateUniqueId(),
          ...pokemon
        }
      }
    });
    return true;
  };

  const deletePokemonFromTeam = (pokemonId, teamId = 'teamOne') => {
     dispatch({
      type: actions.DELETE_POKEMON_IN_TEAM,
      payload: {
        teamId: teamId || 'teamOne',
        pokemonId
      }
    });
    return true;
  };

  const createTeam = (teamName) => {
    dispatch({
      type: actions.CREATE_TEAM,
      payload: {
        teamId: generateUniqueId(),
        teamName
      }
    });
    return true;
  }

  
  return { teams: state, addPokemonToTeam, deletePokemonFromTeam, createTeam }
}

