export interface Film {
  title: string;
  description: string;
  director: string;
  releaseDate: string; // Format: YYYY-MM-DD
  photoUrl?: string;   // Facultatif si la photo est ajoutée plus tard
}
