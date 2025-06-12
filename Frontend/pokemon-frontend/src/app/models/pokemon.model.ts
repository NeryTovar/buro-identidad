export interface Pokemon {
    name: string;
    species: string;
    types: string[];
    abilities: string[];
    moves: string[];
    stats: { name: string; value: number }[];
    imageBase64: string;
}