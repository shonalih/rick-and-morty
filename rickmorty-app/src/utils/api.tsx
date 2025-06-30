import axios from 'axios'

export interface Character {
    id: number
    name: string
    status: string
    species: string
    image: string
}

export interface PaginatedCharacters {
    info: {
        count: number
        pages: number
        next: string | null
        prev: string | null
    }
    results: Character[]
}

const baseURL = 'https://rickandmortyapi.com/api/character'

export const fetchCharacters = async (page: number) => {
    const { data } = await axios.get<PaginatedCharacters>(
        `${baseURL}?page=${page}`
    )
    return data
}

export const fetchCharacter = async (id: number) => {
    const { data } = await axios.get<Character>(
        `${baseURL}/${id}`
    )
    return data
}
