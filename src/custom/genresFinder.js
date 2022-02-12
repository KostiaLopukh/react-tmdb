export const genresFinder = (genres, genre_ids, currentGenresArr) => {
    for (let genreId of genre_ids) {
        for (let genre of genres) {
            if (genreId === genre.id) {
                currentGenresArr.push(genre.name);
            }
        }
    }
};