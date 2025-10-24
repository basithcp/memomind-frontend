import { useEffect, useState } from 'react';
import mcqString from '../data/dummyGeneratedMCQs.json';

const LoadMCQPage = () => {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const mcqs = Array.isArray(mcqString?.questions) ? mcqString.questions : [];
  useEffect(() => {
    // Simulate generating MCQs
    const timer = setTimeout(() => {
      setIsGenerating(false)
      setGeneratedQuestions(mcqs)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const currentQuestion = generatedQuestions[currentQuestionIndex] || {
    question: '',
    options: [],
    answer: null,
  }

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
      setShowResult(true)
      if (answerIndex === currentQuestion.answer) {
        setScore((prev) => prev + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleModify = (newQuestions) => {
    setGeneratedQuestions(newQuestions)
  }

  const handleSave = (questions) => {
    console.log('Saving MCQs for revision:', questions)
    alert('MCQs saved for revision! You can now access them from the revision menu.')
  }

  if (isGenerating) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">Generating MCQs from your document...</h5>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-custom"
                      style={{ width: '75%' }}
                    ></div>
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
            <h2 className="text-dark">Generated MCQs</h2>
          </div>

          {/* MCQ Session */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Question Card */}
              <div className="question-card p-4 mb-4 rounded">
                <h4 className="fw-bold text-dark mb-0">Q. {currentQuestion.question}</h4>
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
                    <span className="fw-semibold me-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </div>
                ))}
              </div>

              {/* Navigation Controls — bookmark removed, controls right-aligned */}
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary me-3"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    ←
                  </button>
                  <span className="fw-semibold me-3">
                    {currentQuestionIndex + 1}/{generatedQuestions.length}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === generatedQuestions.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NOTE: per your request, no ChatInterface is added here */}
        </div>
      </div>

    </div>
  )
}

export default LoadMCQPage
