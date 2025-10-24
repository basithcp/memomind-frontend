import React, { useState, useEffect } from 'react'
import ChatInterface from '../components/ChatInterface'

const GenerateNotesPage = () => {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    // Simulate generating notes
    const timer = setTimeout(() => {
      setIsGenerating(false)
      setGeneratedContent({
        title: "Generated Notes from Upload",
        content: "These are the generated notes from your uploaded document. You can modify them using the chat interface below.",
        subject: "Uploaded Document",
        date: new Date().toISOString().split('T')[0]
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleModify = (newContent) => {
    setGeneratedContent(newContent)
  }

  const handleSave = (content) => {
    // In a real app, this would save to backend
    console.log('Saving content for revision:', content)
    alert('Content saved for revision! You can now access it from the revision menu.')
  }

  if (isGenerating) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">Generating notes from your document...</h5>
                  <div className="progress">
                    <div className="progress-bar progress-bar-custom" style={{ width: '75%' }}></div>
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
            <h2 className="text-dark">Generated Notes</h2>
            <div>
              <button 
                className="btn btn-outline-primary me-2"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? 'Hide Chat' : 'Modify Content'}
              </button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="card card-custom mb-4">
            <div className="card-body">
              <h4 className="card-title">{generatedContent.title}</h4>
              <div className="mb-3">
                <span className="badge bg-primary me-2">{generatedContent.subject}</span>
                <small className="text-muted">{generatedContent.date}</small>
              </div>
              <div className="p-3 bg-light rounded">
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                  {generatedContent.content}
                </pre>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          {showChat && (
            <ChatInterface
              onModify={handleModify}
              onSave={handleSave}
              content={generatedContent}
              type="notes"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateNotesPage
