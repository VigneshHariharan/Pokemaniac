export const getImageUrlForPokemon = (pokemonName, order) => {
  let name =
    pokemonName?.slice(0, 1).toUpperCase() +
    pokemonName?.slice(1, pokemonName?.length).toLowerCase()
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
    console.log('setItemInCache',value)
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getItemFromCache = key => {
  const item = localStorage.getItem(key)
  if (item) return JSON.parse(item)
  return null
}
