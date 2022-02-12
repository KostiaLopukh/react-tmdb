export const detailsGenresFinder = (stateGenres, currentGenres, currentGenresArr) => {
    for (const stateGenre of stateGenres) {
        for (const currentGenre of currentGenres) {
            if (stateGenre.id === currentGenre.id) {
                currentGenresArr.push(currentGenre.name);
            }
        }
    }
    return currentGenresArr;
};