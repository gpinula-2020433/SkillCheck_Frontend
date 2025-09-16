import React from 'react'
import { Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'
import { MainPage } from './pages/MainPage/MainPage'
import {AdminPage} from './pages/AdminPage/AdminPage'
import {AuthPage} from './pages/AuthPage/AuthPage'
import { HomePage } from './pages/MainPage/HomePage'
import {Login} from './components/Auth/Login'
import {Register} from './components/Auth/Register'
import CoursesAdminPage from './pages/AdminPage/CoursesAdminPage'
import CoursesPage from './pages/MainPage/CoursesPage'
import GradesPage from './pages/MainPage/GradesPage'
import CreateCourseAdmin from './pages/AdminPage/CreateCoursesAdmin'
import ActivityDetail from './components/AllQuestionnaireStudent/ActivityDetail'
import CreateQuestionnaireAdmin from './pages/AdminPage/CreateQuestionnaireAdmin'
import { ProtectedRoute, ProtectedRouteAdmin, RootRedirect } from './shared/utils/ProtectedRoute'
import Questionnaire from './components/AllQuestionnaireStudent/Questionnaire'
import { QuestionnaireDetails } from './components/AdminQuestionnaire/QuestionnaireDetails'
import QuestionnaireResults from './components/AdminQuestionnaire/QuestionnaireResults'
import { ViewQuestionnaire } from './components/AdminQuestionnaire/ViewQuestionnaire'
import CourseQuestionnairePage from './pages/MainPage/CourseQuestionnairePage'
import StudentCourses from './components/AllGradesStudent/StudentCourses'
import CourseGrades from './components/AllGradesStudent/CourseGrades'
import { RegisterTeacher } from './components/Auth/RegisterTeacher'

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
            { path: 'register', element: <Register /> },
            { path: 'registerTeacher', element: <RegisterTeacher /> }
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
                    { path: 'timeline', element: <HomePage />},
                    { path: 'courses', element: <CoursesPage/>},
                    { path: 'course/:id', element: <CourseQuestionnairePage/>},
                    { path: 'course-grades', element: <StudentCourses/>},
                    { path: 'course-grades-report/:id', element: <CourseGrades/>},
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