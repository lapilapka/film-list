export interface Film {
  title: string;
  year: number;
  description: string;
  genres: string[];
  rating: number;
  duration?: number;
  director?: string;
  cast?: string[];
  poster?: string;
}
