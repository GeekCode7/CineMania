// import axios from 'axios'
import type { Movie, MovieFilter } from '@/interfaces/Movie'
import type { Comment } from '@/interfaces/Comments'

// Datos de ejemplo para películas
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    releaseDate: "2020-07-16",
    posterPath: "/src/assets/images/inception.avif",
    overview: "Dom Cobb es un ladrón con una extraña habilidad para entrar en los sueños de la gente y robarles los secretos de sus subconscientes.",
    voteAverage: 8.8,
    genres: [{ id: 28, name: "Acción" }, { id: 878, name: "Ciencia ficción" }],
    runtime: 148,
    cast: [
      { id: 1, name: "Leonardo DiCaprio", character: "Dom Cobb", profilePath: "/src/assets/images/cast/LeonardoDicaprio.jpg" },
      { id: 2, name: "Joseph Gordon-Levitt", character: "Arthur", profilePath: "/src/assets/images/cast/JosepGordon.jpg" }
    ],
    director: "Christopher Nolan"
  },
  {
    id: 2,
    title: "The Matrix",
    releaseDate: "1999-03-31",
    posterPath: "/src/assets/images/TheMatrix.avif",
    overview: "Un hacker descubre que el mundo en el que vive es una simulación creada por máquinas.",
    voteAverage: 8.7,
    genres: [{ id: 28, name: "Acción" }, { id: 878, name: "Ciencia ficción" }],
    runtime: 136,
    cast: [
      { id: 3, name: "Keanu Reeves", character: "Neo", profilePath: "/src/assets/images/cast/KeanuReeves.jpg" },
      { id: 4, name: "Laurence Fishburne", character: "Morpheus", profilePath: "/src/assets/images/cast/LaurenceFishburne.jpg" }
    ],
    director: "Lana y Lilly Wachowski"
  },
  {
    id: 3,
    title: "Parasite",
    releaseDate: "2019-05-30",
    posterPath: "/src/assets/images/Parasite.avif",
    overview: "La familia Kim, todos desempleados, trama un plan para trabajar en la casa de la adinerada familia Park.",
    voteAverage: 8.6,
    genres: [{ id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
    runtime: 132,
    cast: [
      { id: 5, name: "Song Kang-ho", character: "Kim Ki-taek", profilePath: "/src/assets/images/cast/SongKangHo.jpg" },
      { id: 6, name: "Lee Sun-kyun", character: "Park Dong-ik", profilePath: "/src/assets/images/cast/LeeSunKyun.jpg" }
    ],
    director: "Bong Joon-ho"
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    releaseDate: "2019-04-26",
    posterPath: "/src/assets/images/AvengersEndgame.avif",
    overview: "Los Vengadores y sus aliados deben estar dispuestos a sacrificarlo todo para derrotar al poderoso Thanos.",
    voteAverage: 8.4,
    genres: [{ id: 28, name: "Acción" }, { id: 12, name: "Aventura" }, { id: 878, name: "Ciencia ficción" }],
    runtime: 181,
    cast: [
      { id: 7, name: "Robert Downey Jr.", character: "Tony Stark", profilePath: "/src/assets/images/cast/RobertDowney.jpg" },
      { id: 8, name: "Chris Evans", character: "Steve Rogers", profilePath: "/src/assets/images/cast/ChrisEvans.jpg" }
    ],
    director: "Anthony y Joe Russo"
  },
  {
    id: 5,
    title: "Joker",
    releaseDate: "2019-10-04",
    posterPath: "/src/assets/images/joker.avif",
    overview: "En Gotham, Arthur Fleck, un comediante con problemas mentales, es marginado y maltratado por la sociedad.",
    voteAverage: 8.2,
    genres: [{ id: 80, name: "Crimen" }, { id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
    runtime: 122,
    cast: [
      { id: 9, name: "Joaquin Phoenix", character: "Arthur Fleck", profilePath: "/src/assets/images/cast/joaquinPhoenix.jpg" },
      { id: 10, name: "Robert De Niro", character: "Murray Franklin", profilePath: "/src/assets/images/cast/RobertDeniro.jpg" }
    ],
    director: "Todd Phillips"
  },
  {
    id: 6,
    title: "The Dark Knight",
    releaseDate: "2008-07-18",
    posterPath: "/src/assets/images/TheDarkKnight.avif",
    overview: "Batman se enfrenta a su mayor enemigo, el Joker, quien siembra el caos en Gotham City.",
    voteAverage: 9.0,
    genres: [{ id: 28, name: "Acción" }, { id: 80, name: "Crimen" }, { id: 18, name: "Drama" }],
    runtime: 152,
    cast: [
      { id: 11, name: "Christian Bale", character: "Bruce Wayne", profilePath: "/src/assets/images/cast/ChristianBale.jpg" },
      { id: 12, name: "Heath Ledger", character: "Joker", profilePath: "/src/assets/images/cast/HeathLedger.jpg" }
    ],
    director: "Christopher Nolan"
  }
];

// Datos de ejemplo para comentarios
const mockComments: Comment[] = [
  { id: 1, movieId: 1, userName: "MovieFan1", text: "Una de las mejores películas que he visto. ¡Increíble!", rating: 5, date: "2022-05-10" },
  { id: 2, movieId: 1, userName: "CineLover", text: "El final me dejó pensando durante días.", rating: 4, date: "2022-06-15" },
  { id: 3, movieId: 2, userName: "SciFiGuy", text: "Un clásico que cambió el género de ciencia ficción para siempre.", rating: 5, date: "2022-04-20" },
  { id: 4, movieId: 3, userName: "FilmCritic", text: "Una obra maestra del cine coreano.", rating: 5, date: "2022-07-03" },
];

// Servicio para obtener películas
export const MovieService = {
  // Obtener todas las películas
  async getMovies(filter?: MovieFilter): Promise<Movie[]> {
    // Simular una llamada a API con un retraso
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredMovies = [...mockMovies];

    // Aplicar filtros si existen
    if (filter) {
      // Filtrar por término de búsqueda
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        filteredMovies = filteredMovies.filter(movie =>
          movie.title.toLowerCase().includes(term) ||
          movie.overview.toLowerCase().includes(term)
        );
      }

      // Filtrar por género
      if (filter.genre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genres.some(genre => genre.id === filter.genre)
        );
      }

      // Filtrar por año
      if (filter.year) {
        const year = filter.year.toString();
        filteredMovies = filteredMovies.filter(movie =>
          movie.releaseDate.startsWith(year)
        );
      }

      // Ordenar
      switch (filter.sortBy) {
        case 'date':
          filteredMovies.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
        case 'rating':
          filteredMovies.sort((a, b) => b.voteAverage - a.voteAverage);
          break;
        case 'title':
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    return filteredMovies;
  },

  // Obtener una película por su ID
  async getMovie(id: number): Promise<Movie | undefined> {
    // Simula una llamada a API con un retraso
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockMovies.find(movie => movie.id === id);
  },

  // Obtener géneros
  async getGenres(): Promise<{ id: number; name: string }[]> {
    // Extraer géneros únicos de las películas
    const genres = new Map<number, string>();

    mockMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        genres.set(genre.id, genre.name);
      });
    });

    return Array.from(genres.entries()).map(([id, name]) => ({ id, name }));
  }
};

// Servicio para comentarios
export const CommentService = {
  // Obtener comentarios de una película
  async getComments(movieId: number): Promise<Comment[]> {
    // Simula una llamada a API con un retraso
    await new Promise(resolve => setTimeout(resolve, 200));

    return mockComments.filter(comment => comment.movieId === movieId);
  },

  // Añadir un comentario
  async addComment(comment: Omit<Comment, 'id' | 'date'>): Promise<Comment> {
    // Simulamos una llamada a API con un retraso
    await new Promise(resolve => setTimeout(resolve, 300));

    const newComment: Comment = {
      id: mockComments.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...comment
    };

    mockComments.push(newComment);

    return newComment;
  }
};
