import React from 'react'
import sessionData from '../data/sessionData.json'

const RevisionPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-dark">Revision Dashboard</h2>
          
          {/* Current Session */}
          <div className="card card-custom mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Current Session</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-muted">Session Type</h6>
                  <p className="fw-semibold">{sessionData.currentSession.type}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-muted">Subject</h6>
                  <p className="fw-semibold">{sessionData.currentSession.subject}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-muted">Progress</h6>
                  <div className="progress">
                    <div 
                      className="progress-bar progress-bar-custom" 
                      style={{ width: `${sessionData.currentSession.progress}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    {sessionData.currentSession.currentQuestion}/{sessionData.currentSession.totalQuestions} questions
                  </small>
                </div>
                <div className="col-md-6">
                  <h6 className="text-muted">Status</h6>
                  <span className={`badge ${
                    sessionData.currentSession.status === 'active' ? 'bg-success' : 'bg-secondary'
                  }`}>
                    {sessionData.currentSession.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="card card-custom">
            <div className="card-header">
              <h5 className="mb-0">Recent Sessions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {sessionData.recentSessions.map((session, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card border h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title text-dark">{session.type}</h6>
                          <span className={`badge ${
                            session.status === 'completed' ? 'bg-success' : 'bg-warning'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <p className="text-muted mb-2">{session.subject}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">{session.date}</small>
                          <small className="text-muted">{session.duration}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevisionPage
