import { useState } from 'react'
import { Link } from 'react-router-dom'

const UploadPage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPostUploadOptions, setShowPostUploadOptions] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            setShowPostUploadOptions(true)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center">
            <h2 className="mb-4 text-dark">Upload your file to start a session :)</h2>
            
            {isUploading && (
              <div className="card card-custom p-4">
                <div className="card-body text-center">
                  <h5 className="mb-3">Uploading...</h5>
                  <div className="progress mb-3" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar progress-bar-custom" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-muted">{uploadProgress}% complete</p>
                </div>
              </div>
            )}

            {!isUploading && !showPostUploadOptions && (
              <div className="upload-area p-5 mb-4">
                <input
                  type="file"
                  id="file-upload"
                  className="d-none"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label htmlFor="file-upload" className="btn btn-primary-custom btn-lg px-5 py-3">
                  <span className="me-2">☁️</span>
                  Upload
                </label>
                <p className="text-muted mt-3">
                  Supported format  : PDF
                </p>
              </div>
            )}

            {!isUploading && showPostUploadOptions && (
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">Choose what you want to create from your upload</h5>
                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                    <Link to="/generate-notes" className="btn btn-outline-primary px-4 py-2">📄 Generate Notes</Link>
                    <Link to="/generate-mcq" className="btn btn-outline-primary px-4 py-2">❓ Generate MCQs</Link>
                    <Link to="/generate-flashcards" className="btn btn-outline-primary px-4 py-2">🃏 Generate Flashcards</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
