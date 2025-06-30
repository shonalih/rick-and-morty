import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { fetchCharacters, type Character } from './utils/api'
import {
    type ColumnDef,
    getCoreRowModel,
    useReactTable,
    flexRender,
} from '@tanstack/react-table'
import { indexRoute } from './router'

export default function ListPage() {
    const search = useSearch({ from: indexRoute.id });
    const navigate = useNavigate();
    const page = Number(search.page ?? 1);

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['characters', page],
        queryFn: () => fetchCharacters(page),
    })

    const columns = React.useMemo<ColumnDef<Character>[]>(
        () => [
            {
                header: 'id',
                accessor: 'ID',
                cell: info => info.getValue()
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            { header: 'Status', accessorKey: 'status' },
            { header: 'Species', accessorKey: 'species' },
        ],
        [navigate]
    )

    const table = useReactTable({
        data: data?.results || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const changePage = (delta: number) => {
        navigate({
            search: (prev) => ({
                page: Math.max((prev.page ?? 1) + delta, 1),
            }),
        });
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Characters — Page {page}</h1>
            <button onClick={() => refetch()} disabled={isFetching}>
                Refresh
            </button>
            {!isFetching && <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                <thead>
                    {table.getHeaderGroups().map((hg) => {
                        return (
                            <tr key={hg.id}>
                                {hg.headers.map((h) => {
                                    return (
                                        <th key={h.id} style={{ textAlign: 'left', padding: '4px 8px' }}>
                                            {(h.id).toUpperCase()}
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row._getAllVisibleCells().map((cell) => {
                                    if (cell.column.id === 'id') {
                                        return (
                                            <td key={cell.id} style={{ padding: '4px 8px', borderTop: '1px solid #ddd' }}>
                                                <Link to={`/characters/${row.original.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                                    {row.original.id}
                                                </Link>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={cell.id} style={{ padding: '4px 8px', borderTop: '1px solid #ddd' }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
            <div style={{ marginTop: 15 }}>
                <button
                    onClick={() => changePage(-1)}
                    disabled={!data?.info?.prev}
                >
                    Previous
                </button>
                <button
                    onClick={() => changePage(1)}
                    disabled={!data?.info?.next}
                    style={{ marginLeft: 10 }}
                >
                    Next
                </button>
                {isFetching && <span style={{ marginLeft: 10 }}>Loading...</span>}
            </div>
        </div>
    )
}
