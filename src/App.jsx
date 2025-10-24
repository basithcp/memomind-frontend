// App.jsx
// eslint-disable-next-line no-unused-vars
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import LoadFlashCardsPage from './pages/LoadFlashCardsPage';
import LoadMCQPage from './pages/LoadMCQPage';
import LoadNotesPage from './pages/LoadNotesPage';
import FlashCardsPage from './pages/NewFlashCardsPage';
import GenerateFlashcardsPage from './pages/NewGenerateFlashcardsPage';
import GenerateMCQPage from './pages/NewGenerateMCQPage';
import GenerateNotesPage from './pages/NewGenerateNotesPage';
import MCQSessionPage from './pages/NewMCQsPage';
import NotesPage from './pages/NewNotesPage';
import RevisionPage from './pages/RevisionPage';
import UploadPage from './pages/UploadPage';

// auth pages
import Login from './pages/Login';
import Signup from './pages/Signup';

/**
 * RequireAuth - guards protected routes.
 * If not authenticated, redirects to /login.
 */
function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * PublicOnly - prevents authenticated users from accessing public routes
 * like /login and /signup. If authenticated, redirect to root (/).
 */
function PublicOnly({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes: rendered WITHOUT Layout (no header/sidebar) */}
        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnly>
              <Signup />
            </PublicOnly>
          }
        />

        {/* Protected routes: wrap each page inside Layout and RequireAuth so Layout appears only after login */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout>
                <HomePage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/upload"
          element={
            <RequireAuth>
              <Layout>
                <UploadPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/mcq-session"
          element={
            <RequireAuth>
              <Layout>
                <MCQSessionPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/notes"
          element={
            <RequireAuth>
              <Layout>
                <NotesPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/flashcards"
          element={
            <RequireAuth>
              <Layout>
                <FlashCardsPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/revision"
          element={
            <RequireAuth>
              <Layout>
                <RevisionPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/generate-notes"
          element={
            <RequireAuth>
              <Layout>
                <GenerateNotesPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/generate-mcq"
          element={
            <RequireAuth>
              <Layout>
                <GenerateMCQPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/generate-flashcards"
          element={
            <RequireAuth>
              <Layout>
                <GenerateFlashcardsPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/load-notes/*"
          element={
            <RequireAuth>
              <Layout>
                <LoadNotesPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/load-mcq/*"
          element={
            <RequireAuth>
              <Layout>
                <LoadMCQPage />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/load-flashcards/*"
          element={
            <RequireAuth>
              <Layout>
                <LoadFlashCardsPage />
              </Layout>
            </RequireAuth>
          }
        />

        {/* Catch-all: if user is authenticated send to '/', otherwise send to '/login' */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
