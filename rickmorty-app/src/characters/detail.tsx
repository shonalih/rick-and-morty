import { useNavigate, useParams } from "@tanstack/react-router"
import { detailRoute } from "../router"
import { useQuery } from "@tanstack/react-query"
import { fetchCharacter } from "../utils/api"

const detail = () => {

    const params = useParams({ from: detailRoute.id })
    const id = Number(params.charactersId)

    const navigate = useNavigate()
    const { data, isLoading, error } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id),
    }
    )
    if (isLoading) return <p>Loading...</p>
    if (error || !data) return <p>Character not found.</p>
    return (
        <div>
            <button onClick={() => navigate({ to: '/characters', search: {} })}>
                ← Back
            </button>
            <h2>{data.name}</h2>
            <img
                src={data.image}
                alt={data.name}
                style={{ width: 240, borderRadius: 8, marginTop: 10 }}
            />
            <ul style={{ marginTop: 10 }}>
                <li><strong>Status:</strong> {data.status}</li>
                <li><strong>Species:</strong> {data.species}</li>
            </ul>
        </div>
    )
}

export default detail;