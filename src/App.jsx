// eslint-disable-next-line no-unused-vars
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/mcq-session" element={<MCQSessionPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/flashcards" element={<FlashCardsPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/generate-notes" element={<GenerateNotesPage />} />
          <Route path="/generate-mcq" element={<GenerateMCQPage />} />
          <Route path="/generate-flashcards" element={<GenerateFlashcardsPage />} />
          <Route path="/load-notes/*" element={<LoadNotesPage />} />
          <Route path="/load-mcq/*" element={<LoadMCQPage />} />
          <Route path="/load-flashcards/*" element={<LoadFlashCardsPage />} />          
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
