import { createBrowserRouter } from 'react-router-dom'

import ProductPage from '../pages/ProductPage'
import ProfilePage from '../pages/ProfilePage'
import ErrorPage from '../pages/ErrorPage'
import Root from '../pages/Root'
import HomeProductsPage from '../pages/HomeProductsPage'
import CreateNewProductPage from '../pages/CreateNewProductPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomeProductsPage />,
            },
            {
                path: '/:id',
                element: <ProductPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/create-product',
                element: <CreateNewProductPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
        ]
    },
])

export default router

