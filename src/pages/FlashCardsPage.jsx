import React, { useState, useEffect } from 'react'
import flashcardsData from '../data/flashcardsData.json'

const FlashCardsPage = () => {
  const [flashcards, setFlashcards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setFlashcards(flashcardsData.flashcards)
  }, [])

  const currentCard = flashcards[currentCardIndex]

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
      setShowAnswer(false)
    }
  }

  // No generation UI; render saved flashcards immediately

  if (flashcards.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">No flashcards available</h5>
                  <p className="text-muted">Upload a document to create flashcards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Flashcard */}
          <div className="flashcard mb-4">
            <div className="text-center p-4">
              <h4 className="fw-bold text-dark mb-4">
                {showAnswer ? currentCard.back : currentCard.front}
              </h4>
              <button 
                className="btn btn-primary-custom px-4 py-2"
                onClick={handleShowAnswer}
              >
                {showAnswer ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-outline-secondary">
              <span>🔖</span>
            </button>
            
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-primary me-3"
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
              >
                ←
              </button>
              <span className="fw-semibold me-3">
                {currentCardIndex + 1}/{flashcards.length}
              </span>
              <button 
                className="btn btn-outline-primary"
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcards.length - 1}
              >
                →
              </button>
            </div>
          </div>

          {/* Follow-up removed: revision is reference-only */}
        </div>
      </div>
    </div>
  )
}

export default FlashCardsPage
