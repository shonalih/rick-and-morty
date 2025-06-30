import {
    Outlet,
    createRouter,
    createRoute,
    createRootRoute,
    Link
} from '@tanstack/react-router'
import detail from './characters/detail'
import ListPage from './ListPage'

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <Outlet />
        </div>
    ),
})

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/characters',
    component: ListPage,
    validateSearch: (search) => ({
        page: Number(search.page) || 1,
    }),
})

export const detailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'characters/$charactersId',
    component: detail,
})

const routeTree = rootRoute.addChildren([indexRoute, detailRoute])

export const router = createRouter({ routeTree })