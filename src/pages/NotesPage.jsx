import React, { useState, useEffect } from 'react'
import notesData from '../data/notesData.json'

const NotesPage = () => {
  const [notes, setNotes] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setNotes(notesData.notes)
  }, [])

  const handleViewDetails = (note) => {
    setSelectedNote(note)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedNote(null)
  }

  // Render saved notes immediately without generation UI

  if (notes.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">No notes available</h5>
                  <p className="text-muted">Upload a document to create notes.</p>
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
          <h2 className="mb-4 text-dark">Your Notes</h2>
          
          {/* Notes List */}
          <div className="row g-4">
            {notes.map((note) => (
              <div key={note.id} className="col-md-6 col-lg-4">
                <div className="card card-custom h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title text-dark">{note.title}</h5>
                      <small className="text-muted">{note.date}</small>
                    </div>
                    <p className="card-text text-muted mb-3">
                      {note.content.substring(0, 150)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary">{note.subject}</span>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleViewDetails(note)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow-up removed: revision is reference-only */}
        </div>
      </div>

      {/* Modal for viewing note details */}
      {showModal && selectedNote && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedNote.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <span className="badge bg-primary me-2">{selectedNote.subject}</span>
                  <small className="text-muted">{selectedNote.date}</small>
                </div>
                <div className="mb-3">
                  <strong>Tags:</strong>
                  {selectedNote.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1 ms-1">{tag}</span>
                  ))}
                </div>
                <div>
                  <strong>Content:</strong>
                  <div className="mt-2 p-3 bg-light rounded">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {selectedNote.content}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotesPage
