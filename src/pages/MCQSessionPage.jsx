import { useState } from 'react'
import mcqData from '../data/mcqData.json'

const MCQSessionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isGenerating] = useState(false)

  const currentQuestion = mcqData.questions[currentQuestionIndex]

  // Directly use saved MCQs from data without generation

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
      setShowResult(true)
      if (answerIndex === currentQuestion.answer) {
        setScore(prev => prev + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  // No generating state; render saved content immediately

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Question Card */}
          <div className="question-card p-4 mb-4 rounded">
            <h4 className="fw-bold text-dark mb-0">
              Q. {currentQuestion.question}
            </h4>
          </div>

          {/* Answer Options */}
          <div className="mb-4">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`answer-option p-3 mb-3 rounded ${
                  showResult
                    ? index === currentQuestion.answer
                      ? 'correct'
                      : index === selectedAnswer && index !== currentQuestion.answer
                      ? 'incorrect'
                      : ''
                    : selectedAnswer === index
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                style={{ cursor: showResult ? 'default' : 'pointer' }}
              >
                <span className="fw-semibold me-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-outline-secondary">
              <span>🔖</span>
            </button>
            
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-primary me-3"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                ←
              </button>
              <span className="fw-semibold me-3">
                {currentQuestionIndex + 1}/{mcqData.questions.length}
              </span>
              <button 
                className="btn btn-outline-primary"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === mcqData.questions.length - 1}
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

export default MCQSessionPage
