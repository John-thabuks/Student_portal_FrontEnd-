import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ContentBody from './Pages/ContentBody';
import Footer from './Pages/Footer';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './Pages/LoginPage';
import ContactUs from "./Pages/ContactUs"
import SignupPage from './Pages/SignupPage';
import ProfilePage from './Pages/ProfilePage';
import CoursesPage from './Pages/CoursesPage';
import CourseDetails from './Pages/CourseDetails';
import CheckoutPage from './Pages/CheckoutPage';
import About from './Pages/About';
import SuccessPage from './Pages/SuccessPage';
import MyCourses from './Pages/MyCourses';
import ModuleCoursePage from './Pages/ModuleCoursePage';
import Messages from './Pages/Messages';
import AdminProfilePage from './Pages/AdminProfilePage';
import AdminCoursesPage from './Pages/AdminCoursesPage';
import AdminMessages from "./Pages/AdminMessages"
import AdminCreateCoursePage from "./Pages/AdminCreateCoursePage"
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<ContentBody />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="Contact" element={<ContactUs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/checkout/:courseId" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/module-course/:courseId" element={<ModuleCoursePage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/admin-profile" element={<AdminProfilePage />} />
            <Route path="/admin-courses" element={<AdminCoursesPage />} />
            <Route path="/admin-create-course" element={<AdminCreateCoursePage />} />
            <Route path="/admin-messages" element={<AdminMessages />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
