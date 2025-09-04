import React from 'react'
import { Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import { MainPage } from './pages/MainPage/MainPage'
import {AdminPage} from './pages/AdminPage/AdminPage'
import {AuthPage} from './pages/AuthPage/AuthPage'
import { HomePage } from './pages/MainPage/HomePage'
import {Login} from './components/Auth/Login'
import {Register} from './components/Auth/Register'
import Timeline from './components/AllQuestionnaire/Timeline'
import CoursesAdminPage from './pages/AdminPage/CoursesAdminPage'
import CoursesPage from './pages/MainPage/CoursesPage'
import GradesPage from './pages/MainPage/GradesPage'
import CreateCourseAdmin from './pages/AdminPage/CreateCoursesAdmin'
import ActivityDetail from './components/ActivityDetail/ActivityDetail'
import CreateQuestionnaireAdmin from './pages/AdminPage/CreateQuestionnaireAdmin'

const isAuthenticated= true
export const routes = [
    {
        path: '/',
        element: isAuthenticated? <Navigate to="main"/> : <Navigate to="auth"/>
    },
    {
        path: '/main',
        element: <MainPage/>,
        children: [
            { path: '', element: <Navigate to="timeline" />},
            { path: 'timeline', element: <HomePage />},
            { path: 'courses', element: <CoursesPage/>},
            { path: 'grades', element: <GradesPage/>},
            { path: 'activity/:id', element: <ActivityDetail />}
        ]
    },
    {
        path: '/auth',
        element: <AuthPage />,
        children: [
            { path: '', element: <Navigate to="login" /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }
        ]
    },
    {
        path: '/admin',
        element: <AdminPage />,
        children: [
            { path: '', element: <Navigate to="courses" /> },
            { path: 'courses', element: <CoursesAdminPage /> },
            { path: 'questionnaire/create', element: <CreateQuestionnaireAdmin/> },
            { path: 'courses/create', element: <CreateCourseAdmin/>},
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
]