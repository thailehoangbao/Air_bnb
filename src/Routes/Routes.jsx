import { lazy } from "react";
import { Route } from "react-router-dom";


const Routes = [
    {
        path: '',
        element: lazy(() => import('./../Pages/HomeTemplates/HomeTemplates')),
        nested: [
            {
                path: '',
                element: lazy(() => import('./../Pages/HomeTemplates/HomePage/Homepage'))
            },
            {
                path: 'detail/:id',
                element: lazy(() => import('./../Pages/HomeTemplates/DetailPage/DetailPage'))
            },
            {
                path: `user`,
                element: lazy(() => import('./../Pages/HomeTemplates/User/User')),
            },
            {
                path: `search/:id`,
                element: lazy(() => import('./../Pages/HomeTemplates/SearchPage/SearchPage')),
            },
        ]
    },
    {
        path: `/admin`,
        element: lazy(() => import('../Pages/AdminTemplates')),
        nested: [
            {
                path: 'user',
                element: lazy(() => import('../Pages/AdminTemplates/User')),
            },
            {
                path: 'room',
                element: lazy(() => import('../Pages/AdminTemplates/Room')),
            },
            {
                path: 'location',
                element: lazy(() => import('../Pages/AdminTemplates/Location')),
            },
            {
                path: 'booking',
                element: lazy(() => import('../Pages/AdminTemplates/Booking')),
            },
            
        ]
    },
    {
        path: `/auth`,
        element: lazy(() => import('./../Pages/AdminTemplates/Auth')),
    },

    {
        path: `/login`,
        element: lazy(() => import('./../Pages/HomeTemplates/Login/LoginHome')),
    },
    {
        path: `/register`,
        element: lazy(() => import('./../Pages/HomeTemplates/Register/RegisterHome')),
    }
]



const renderRoutes = () => {
    return Routes.map((route, index) => {
        if (route.nested) {
            return <Route key={index} path={route.path} element={<route.element />}>
                {route.nested.map((item, i) => {
                    if (item.nested) {
                        return <Route key={i} path={item.path} element={<item.element />}>
                            {item.nested.map((child, ii) => {
                                return <Route key={ii} path={child.path} element={<child.element />}>

                                </Route>
                            })}
                        </Route>
                    } else {
                        return <Route key={i} path={item.path} element={<item.element />}>

                        </Route>
                    }
                })}
            </Route>
        } else {
            return <Route key={index} path={route.path} element={<route.element />}>

            </Route>
        }
    })
}

export default renderRoutes;