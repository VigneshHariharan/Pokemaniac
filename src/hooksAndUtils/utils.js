export const getImageUrlForPokemon = (pokemonName, order) => {
    let name = pokemonName?.slice(0, 1).toUpperCase() + pokemonName?.slice(1, pokemonName?.length).toLowerCase()
    name = "/Pokemaniac/docs" + "/images/pokemons/" + name;
    let number = order;
    if (order < 10) {
        number = "00" + String(number)
    } else if (order < 100) {
        number = "0" + String(number)
    } else {
        return number + name;
    }
}