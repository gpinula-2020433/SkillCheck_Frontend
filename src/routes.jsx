import React from 'react'
import { Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import { MainPage } from './pages/MainPage/MainPage'
import {AdminPage} from './pages/AdminPage/AdminPage'
import {AuthPage} from './pages/AuthPage/AuthPage'
import { HomePage } from './pages/MainPage/HomePage'
import {Login} from './components/Auth/Login'
import {Register} from './components/Auth/Register'
import Timeline from './pages/MainPage/Timeline'
import CoursesAdminPage from './pages/AdminPage/CoursesAdminPage'
import CoursesPage from './pages/MainPage/CoursesPage'
import GradesPage from './pages/MainPage/GradesPage'
import CreateCourseAdmin from './pages/AdminPage/CreateCoursesAdmin'
import ActivityDetail from './components/ActivityDetail/ActivityDetail'
import CreateQuestionnaireAdmin from './pages/AdminPage/CreateQuestionnaireAdmin'
import { ProtectedRoute, ProtectedRouteAdmin, RootRedirect } from './shared/utils/ProtectedRoute'
import Questionnaire from './components/AllQuestionnaire/Questionnaire'
import { QuestionnaireDetails } from './components/AdminQuestionnaire/QuestionnaireDetails'
import QuestionnaireResults from './components/AdminQuestionnaire/QuestionnaireResults'
import { ViewQuestionnaire } from './components/AdminQuestionnaire/ViewQuestionnaire'

export const routes = [
    {
        path: '/',
        element: <RootRedirect />
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
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/main',
                element: <MainPage/>,
                children: [
                    { path: '', element: <Navigate to="timeline" />},
                    { path: 'timeline', element: <Timeline />},
                    { path: 'courses', element: <CoursesPage/>},
                    { path: 'grades', element: <GradesPage/>},
                    { path: 'activity/:id', element: <ActivityDetail />},
                    { path: 'questionnaire/:id', element: <Questionnaire /> }
                ]
            },
        ]
    },
    {
        element: <ProtectedRouteAdmin/>,
        children: [
            {
                path: '/admin',
                element: <AdminPage />,
                children: [
                    { path: '', element: <Navigate to="courses" /> },
                    { path: 'courses', element: <CoursesAdminPage /> },
                    { path: 'questionnaire/create/:courseId', element: <CreateQuestionnaireAdmin/> },
                    { path: 'courses/create', element: <CreateCourseAdmin/>},
                    { path: 'questionnaire/details/:courseId', element: <QuestionnaireDetails /> },
                    { path: 'questionnaire/results/:questionnaireId', element: <QuestionnaireResults /> },
                    { path: 'questionnaire/view/:questionnaireId', element: <ViewQuestionnaire /> }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
]