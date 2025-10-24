import { useEffect, useState } from 'react';
import ChatPromptBar from '../components/NewChatPromptBar';
import fcString from '../data/dummyGeneratedFCs.json';
const NewGenerateFlashcardsPage = () => {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedFlashcards, setGeneratedFlashcards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const fcs = Array.isArray(fcString?.questions) ? fcString.questions : [];
  useEffect(() => {
    // Simulate generating flashcards
    const timer = setTimeout(() => {
      setIsGenerating(false)
      setGeneratedFlashcards(fcs)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const currentCard = generatedFlashcards[currentCardIndex] || {
    question: '',
    answer: '',
  }

  const handleShowAnswer = () => {
    setShowAnswer((s) => !s)
  }

  const handleNextCard = () => {
    if (currentCardIndex < generatedFlashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setShowAnswer(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1)
      setShowAnswer(false)
    }
  }

  const handleModify = (newFlashcards) => {
    setGeneratedFlashcards(newFlashcards)
  }

  const handleSave = (flashcards) => {
    console.log('Saving flashcards for revision:', flashcards)
    alert('Flashcards saved for revision! You can now access them from the revision menu.')
  }

  if (isGenerating) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">Generating flashcards from your document...</h5>
                  <div className="progress">
                    <div className="progress-bar progress-bar-custom" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid" style={{ paddingBottom: 96 /* room for prompt bar */ }}>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark">Generated Flashcards</h2>
            <div>
              {/* Replaced Modify Content with Save for Revision */}
              <button className="btn btn-outline-success" onClick={() => handleSave(generatedFlashcards)}>
                Save for Revision
              </button>
            </div>
          </div>

          {/* Flashcard Session */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Flashcard */}
              <div className="flashcard mb-4">
                <div className="text-center p-4">
                  <h4 className="fw-bold text-dark mb-4">{showAnswer ? currentCard.answer : currentCard.question}</h4>
                  <button className="btn btn-primary-custom px-4 py-2" onClick={handleShowAnswer}>
                    {showAnswer ? 'Hide' : 'Show'} Answer
                  </button>
                </div>
              </div>

              {/* Navigation Controls — BOOKMARK BUTTON REMOVED and controls aligned to the right */}
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary me-3"
                    onClick={handlePreviousCard}
                    disabled={currentCardIndex === 0}
                  >
                    ←
                  </button>
                  <span className="fw-semibold me-3">
                    {currentCardIndex + 1}/{generatedFlashcards.length}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNextCard}
                    disabled={currentCardIndex === generatedFlashcards.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NOTE: per request, no ChatInterface is added here */}
        </div>
      </div>

      {/* Reused chat bar (ChatPromptBar) with send and dropdown menu */}
      <ChatPromptBar
        onSend={(prompt) => {
          // Minimal placeholder handling like before
          console.log('Prompt sent from Flashcards page:', prompt)
        }}
      />
    </div>
  )
}

export default NewGenerateFlashcardsPage
