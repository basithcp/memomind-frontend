import React, { useState, useEffect } from 'react'
import ChatInterface from '../components/ChatInterface'

const GenerateFlashcardsPage = () => {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedFlashcards, setGeneratedFlashcards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    // Simulate generating flashcards
    const timer = setTimeout(() => {
      setIsGenerating(false)
      setGeneratedFlashcards([
        {
          id: 1,
          front: "What is React?",
          back: "A JavaScript library for building user interfaces",
          category: "React",
          difficulty: "Easy"
        },
        {
          id: 2,
          front: "What is JSX?",
          back: "A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript",
          category: "React",
          difficulty: "Medium"
        }
      ])
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const currentCard = generatedFlashcards[currentCardIndex]

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNextCard = () => {
    if (currentCardIndex < generatedFlashcards.length - 1) {
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark">Generated Flashcards</h2>
            <div>
              <button 
                className="btn btn-outline-primary me-2"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? 'Hide Chat' : 'Modify Content'}
              </button>
            </div>
          </div>

          {/* Flashcard Session */}
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
                    {showAnswer ? 'Hide' : 'Show'} Answer
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

          {/* Chat Interface */}
          {showChat && (
            <ChatInterface
              onModify={handleModify}
              onSave={handleSave}
              content={generatedFlashcards}
              type="flashcards"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateFlashcardsPage
