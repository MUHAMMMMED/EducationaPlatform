import "@stripe/stripe-js";
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './desing-system/Authentication/Login';
import PasswordResetRequest from './desing-system/Authentication/PasswordResetRequest';
import ResetPassword from './desing-system/Authentication/ResetPassword';
import Signup from './desing-system/Authentication/Signup';
import VerifyEmail from './desing-system/Authentication/VerifyEmail';
import Layout from './hocs/Layout';
import Home from './pages/home/Home';
import Quiz from './pages/quiz/Quiz';

import NotFound from './desing-system/components/NotFound/NotFound';
import CourseInfo from './pages/CourseInfo';
import Lesson from './pages/Lesson';
import Courses from './pages/courses';
import WrongAnswers from './pages/quiz/components/WrongAnswers';
import QuizInfo from './pages/quizInfo';
import Quizzes from './pages/quizzes';

import LiveCourses from './pages/LandingPageLiveCourses/LiveCourses';
import LiveCoursesList from './pages/LiveCoursesList/LiveCoursesList';

import SidebarFilter from './desing-system/components/SidebarFilter/SidebarFilter';
import LiveCourseRoom from './pages/LiveCourseRoom/LiveCourseRoom';
import MyLearning from './pages/MyLearning';
import Room from './pages/Room';

import ErrorPage from './desing-system/components/Loading/ErrorPage';
import Category from './pages/Category/Category';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Dashboard/pages/Categories/Categories';
import CourseCategories from './pages/Dashboard/pages/Categories/components/CourseCategories/CourseCategories';
import QuizCategories from './pages/Dashboard/pages/Categories/components/QuizCategories/QuizCategories';
import DashboardCourse from './pages/Dashboard/pages/DashboardCourse/DashboardCourse';
import DashboardCourseDetails from './pages/Dashboard/pages/DashboardCourseDetails/DashboardCourseDetails';
import CourseUpdate from './pages/Dashboard/pages/DashboardCourseDetails/components/CourseUpdate/CourseUpdate';
import CourseQuestionBank from './pages/Dashboard/pages/DashboardCourseDetails/components/CourseUpdate/components/QuestionBank/CourseQuestionBank';
import DashboardEventDetails from './pages/Dashboard/pages/DashboardEventDetails/DashboardEventDetails';
import DashboardLiveCourse from './pages/Dashboard/pages/DashboardLiveCourse/DashboardLiveCourse';
import DashboardLiveCoursDetailse from './pages/Dashboard/pages/DashboardLiveCourseDetails/DashboardLiveCoursDetailse';
import LiveCourseUpdate from './pages/Dashboard/pages/DashboardLiveCourseDetails/components/LiveCourseUpdate/LiveCourseUpdate';
import DashboardQuiz from './pages/Dashboard/pages/DashboardQuiz/DashboardQuiz';
import DashboardQuizDetails from './pages/Dashboard/pages/DashboardQuizDetails/DashboardQuizDetails';
import QuestionBank from './pages/Dashboard/pages/DashboardQuizDetails/components/QuestionBank/QuestionBank';
import QuizUpdate from './pages/Dashboard/pages/DashboardQuizDetails/components/QuizUpdate/QuizUpdate';
import EventsList from './pages/Dashboard/pages/EventsList/EventsList';
import Manager from './pages/Dashboard/pages/Manager/Manager';
import Settings from './pages/Dashboard/pages/Settings/Settings';
import Students from './pages/Dashboard/pages/Students/Students';
import Teacher from './pages/Dashboard/pages/Teacher/Teacher';
import TricksList from './pages/Dashboard/pages/TricksList/TricksList';
import EventDetails from './pages/EventDetails';
import Event_Room from './pages/EventDetails/components/Event_Room/Event_Room';
import EventList from './pages/EventList/EventList';
import LiveCourseRate from './pages/LiveCourseRate';
import LiveCourseWaiting from './pages/LiveCourseWaiting/LiveCourseWaiting';
import Tricks from './pages/Tricks/Tricks';
import Cancel from './pages/checkout/components/Cancel';
import Success from './pages/checkout/components/Success';
// import SignupLiveCourse from './desing-system/Authentication/SignInUp/pages/SignInCourse/SignInCourse';
import LoginLiveCourse from './desing-system/Authentication/SignInUp/pages/SignInUpLiveCourse/LoginLiveCourse';
import PayLiveCourse from './desing-system/Authentication/SignInUp/pages/SignInUpLiveCourse/PayLiveCourse';
import SignInUpLiveCourse from './desing-system/Authentication/SignInUp/pages/SignInUpLiveCourse/SignInUpLiveCourse';

import LoginCourse from './desing-system/Authentication/SignInUp/pages/SignInUpCourse/LoginCourse';
import PayCourse from './desing-system/Authentication/SignInUp/pages/SignInUpCourse/PayCourse';
import SignInUpCourse from './desing-system/Authentication/SignInUp/pages/SignInUpCourse/SignInUpCourse';
import SignupCourse from './desing-system/Authentication/SignInUp/pages/SignInUpCourse/SignupCourse';
import SignupLiveCourse from './desing-system/Authentication/SignInUp/pages/SignInUpLiveCourse/SignupLiveCourse';

import LoginQuiz from './desing-system/Authentication/SignInUp/pages/SignInUpQuiz/LoginQuiz';
import PayQuiz from './desing-system/Authentication/SignInUp/pages/SignInUpQuiz/PayQuiz';
import SignInUpQuiz from './desing-system/Authentication/SignInUp/pages/SignInUpQuiz/SignInUpQuiz';
import SignupQuiz from './desing-system/Authentication/SignInUp/pages/SignInUpQuiz/SignupQuiz';
import EmailMarketing from './pages/Dashboard/pages/EmailMarketing/EmailMarketing';

import Campaign from './pages/Dashboard/pages/EmailMarketing/components/Campaign/Campaign';
import Customer from './pages/Dashboard/pages/EmailMarketing/components/Customer/Customer';
import Redirection from './pages/Redirection/Redirection';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
// import StudentsBlockList from './pages/Dashboard/pages/EventsList/components/StudentsBlock/StudentsBlockList';



const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignInUp_LiveCourse/:id" element={<SignInUpLiveCourse />} />
          <Route path="/Signup_LiveCourse/:id" element={<SignupLiveCourse />} />
          <Route path="/Login_LiveCourse/:id" element={<LoginLiveCourse />} />
          <Route path="/Pay_LiveCourse/:id" element={<PayLiveCourse />} />

          <Route path="/SignInUp_Course/:course_uuid" element={<SignInUpCourse />} />
          <Route path="/Signup_Course/:course_uuid" element={<SignupCourse />} />
          <Route path="/Login_Course/:course_uuid" element={<LoginCourse />} />
          <Route path="/Pay_Course/:course_uuid" element={<PayCourse />} />

          <Route path="/SignInUp_Quiz/:id" element={<SignInUpQuiz />} />
          <Route path="/Signup_Quiz/:id" element={<SignupQuiz />} />
          <Route path="/Login_Quiz/:id" element={<LoginQuiz />} />
          <Route path="/Pay_Quiz/:id" element={<PayQuiz />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/otp/verify' element={<VerifyEmail />} />
          <Route path='/forget-password' element={<PasswordResetRequest />} />
          <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />

          <Route path="/Quiz/:id" element={<Quiz />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/Courses" element={<Courses />} />

          <Route path="/AllCourses" element={<SidebarFilter />} />

          <Route path="/course/:slug/:id" element={<CourseInfo />} />
          <Route path="/Lesson/:course_uuid/:episode_uuid/" element={<Lesson />} />
          <Route path="/MyQuizzes/:slug/:id" element={<QuizInfo />} />
          <Route path="/WrongAnswers/:id" element={<WrongAnswers />} />

          <Route path="/LiveCourses" element={<LiveCoursesList />} />
          <Route path="/LiveCourse/:slug/:id" element={<LiveCourses />} />
          <Route path="/LiveCourseRoom/:id" element={<LiveCourseRoom />} />
          <Route path="/LiveCourseRate/:id" element={<LiveCourseRate />} />

          <Route path="/LiveCourseWaiting/:id" element={<LiveCourseWaiting />} />

          <Route path="/Tricks" element={<Tricks />} />
          {/* <Route path="/VideoConferencing" element={<VideoConferencing />} /> */}
          <Route path="/room/:course_id/:roomId" element={<Room />} />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="/Category/:id" element={<Category />} />
          <Route path="/Redirection" element={<Redirection />} />
          <Route path="/MyLearning" element={<MyLearning />} />
          <Route path="/Teacher_Dashboard" element={<TeacherDashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard_LiveCourse" element={<DashboardLiveCourse />} />
          <Route path="/dashboard_Course" element={<DashboardCourse />} />
          <Route path="/dashboard_Quiz" element={<DashboardQuiz />} />

          <Route path="/dashboard_LiveCourse/:id" element={<DashboardLiveCoursDetailse />} />
          <Route path="/Live_Course_Update/:id" element={<LiveCourseUpdate />} />

          <Route path="/dashboard_Course/:id" element={<DashboardCourseDetails />} />
          <Route path="/Course_Update/:id" element={<CourseUpdate />} />

          <Route path="/dashboard_Quiz/:id" element={<DashboardQuizDetails />} />
          <Route path="/Quiz_Update/:id" element={<QuizUpdate />} />
          <Route path="/QuestionBank/:id" element={<QuestionBank />} />


          <Route path="/CourseQuestionBank/:id" element={<CourseQuestionBank />} />
          <Route path="/email_marketing" element={<EmailMarketing />} />
          <Route path="/Campaign" element={<Campaign />} />
          <Route path="/Customer" element={<Customer />} />

          <Route path="/Events" element={<EventList />} />
          <Route path="/Event/:slug/:id" element={<EventDetails />} />
          <Route path="/Event_Room/:id" element={<Event_Room />} />

          <Route path="/teacher" element={<Teacher />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/students" element={<Students />} />

          <Route path="/tricks_list" element={<TricksList />} />

          <Route path="/events_list" element={<EventsList />} />
          <Route path="/event_Update/:id" element={<DashboardEventDetails />} />
          {/* <Route path="/students_block" element={<StudentsBlockList/>} /> */}

          <Route path="/categories" element={<Categories />} />
          <Route path="/setting" element={<Settings />} />

          <Route path="/Course_Categories" element={<CourseCategories />} />
          <Route path="/Quiz_Categories" element={<QuizCategories />} />

          <Route path="/errorPage" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
