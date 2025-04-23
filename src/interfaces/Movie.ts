export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  overview: string;
  voteAverage: number;
  genres: Genre[];
  runtime: number;
  cast: Cast[];
  director: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export interface MovieFilter {
  searchTerm: string;
  genre: number | null;
  sortBy: 'date' | 'rating' | 'title';
  year: number | null;
}
