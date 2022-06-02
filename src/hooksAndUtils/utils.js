export const getImageUrlForPokemon = (pokemonName, order) => {
  let name =
    pokemonName?.slice(0, 1)?.toUpperCase() +
    pokemonName?.slice(1, pokemonName?.length)?.toLowerCase()
  name = '/Pokemaniac/docs' + '/images/pokemons/' + name
  let number = order
  if (order < 10) {
    number = '00' + String(number)
  } else if (order < 100) {
    number = '0' + String(number)
  } else {
    return number + name
  }
}

export const setItemInCache = (key, value, replace = false) => {
  if (!localStorage.getItem(key) || replace) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getItemFromCache = key => {
  const item = localStorage.getItem(key)
  if (item) return JSON.parse(item)
  return null
}


export const debounce = (func, delay) => {
  let timeout;
  return function(...args){
    const caller = () => {
      clearTimeout(timeout);
      func(...args);
    }

    clearTimeout(timeout);
    setTimeout(caller, delay)
    
  }
};

// For tailwind to detect and update
export const PokemonTypesClasses = {
    "normal": {
        "bg": "bg-types-normal",
        "text": "text-types-normal"
    },
    "fighting": {
        "bg": "bg-types-fighting",
        "text": "text-types-fighting"
    },
    "flying": {
        "bg": "bg-types-flying",
        "text": "text-types-flying"
    },
    "poison": {
        "bg": "bg-types-poison",
        "text": "text-types-poison"
    },
    "ground": {
        "bg": "bg-types-ground",
        "text": "text-types-ground"
    },
    "rock": {
        "bg": "bg-types-rock",
        "text": "text-types-rock"
    },
    "bug": {
        "bg": "bg-types-bug",
        "text": "text-types-bug"
    },
    "ghost": {
        "bg": "bg-types-ghost",
        "text": "text-types-ghost"
    },
    "steel": {
        "bg": "bg-types-steel",
        "text": "text-types-steel"
    },
    "fire": {
        "bg": "bg-types-fire",
        "text": "text-types-fire"
    },
    "water": {
        "bg": "bg-types-water",
        "text": "text-types-water"
    },
    "grass": {
        "bg": "bg-types-grass",
        "text": "text-types-grass"
    },
    "electric": {
        "bg": "bg-types-electric",
        "text": "text-types-electric"
    },
    "psychic": {
        "bg": "bg-types-psychic",
        "text": "text-types-psychic"
    },
    "ice": {
        "bg": "bg-types-ice",
        "text": "text-types-ice"
    },
    "dragon": {
        "bg": "bg-types-dragon",
        "text": "text-types-dragon"
    },
    "dark": {
        "bg": "bg-types-dark",
        "text": "text-types-dark"
    },
    "fairy": {
        "bg": "bg-types-fairy",
        "text": "text-types-fairy"
    },
    "unknown": {
        "bg": "bg-types-unknown",
        "text": "text-types-unknown"
    },
    "shadow": {
        "bg": "bg-types-shadow",
        "text": "text-types-shadow"
    }
};

export const dynamicColors = {
  types: {
          normal:"#a8a878",
          fighting: '#c02038',
          flying: '#a890f0',
          poison: '#a040a0',
          ground:'#e0c068',
          rock: '#b8a038',
          bug: '#a8b820',
          ghost: '#705898',
          steel:'#b8b8d0',
          fire: '#f08030',
          water:'#6890f0',
          grass:'#78c850',
          electric: '#f8d030',
          psychic:'#f85888',
          ice:'#98d8d8',
          fairy:'#ee99ac',
          dragon:'#7038f8',
          dark: '#705848'
  }
};

const constructTypes = types => {
  const result = {};

  for(let type of types){
    result[type.name] = { bg: 'bg-types-' + type.name, text: 'text-types-' + type.name  }
  }
  console.log(result);
  window.copy(result)
}