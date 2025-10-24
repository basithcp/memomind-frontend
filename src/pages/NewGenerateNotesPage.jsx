// NewGenerateNotesPage.jsx
import { useEffect, useState } from "react";
import ChatPromptBar from "../components/NewChatPromptBar";

const NewGenerateNotesPage = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showPreparing, setShowPreparing] = useState(true);

  useEffect(() => {
    let prepTimer = null;
    const genTimer = setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent({
        title: "Generated Notes from Upload",
        content:
          "These are the generated notes from your uploaded document. You can modify them using the chat interface below.",
        subject: "Uploaded Document",
        date: new Date().toISOString().split("T")[0],
      });

      prepTimer = setTimeout(() => {
        setShowPreparing(false);
      }, 500);
    }, 1200);

    return () => {
      clearTimeout(genTimer);
      if (prepTimer) clearTimeout(prepTimer);
    };
  }, []);

  const handleSave = (content) => {
    console.log("Saving content for revision:", content);
    alert("Content saved for revision! You can now access it from the revision menu.");
  };

  const dummyPdfBase64 = "";
  const downloadDummyPdf = (fileName = "memo-dummy.pdf") => {
    try {
      const byteChars = atob(dummyPdfBase64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      const dataUrl = "data:application/pdf;base64," + dummyPdfBase64;
      window.open(dataUrl, "_blank");
    }
  };

  if (isGenerating || !generatedContent) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center">
              <div className="card card-custom p-4">
                <div className="card-body">
                  <h5 className="mb-3">Generating notes from your document...</h5>
                  <div className="progress" style={{ height: 10, borderRadius: 8 }}>
                    <div
                      className="progress-bar progress-bar-custom"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ paddingBottom: 96 }}>
      <style>{`
        .gen-wrapper { padding: 20px 28px; }
        .gen-head { display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; }
        .gen-title { font-size:28px; color:#0f172a; margin:0; }
        .placeholder-card {
          width: 560px;
          max-width: calc(100% - 40px);
          background: linear-gradient(180deg, rgba(255,255,255,0.98), #ffffff);
          border-radius: 14px;
          box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
          padding: 28px;
          display:flex;
          flex-direction:column;
          gap:14px;
          align-items:center;
          border: 1px solid rgba(124,58,237,0.08);
          margin: 12px auto;
        }
        .prep-spinner {
          width:72px;
          height:72px;
          border-radius:50%;
          border:8px solid rgba(124,58,237,0.12);
          border-top-color: rgba(124,58,237,0.95);
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .prep-text { font-size:18px; color:#374151; font-weight:600; }
        .ready-title { font-size:20px; color:#0f172a; font-weight:700; text-align:center; }
        .ready-sub { color:#6b7280; font-size:14px; }
        .download-btn {
          margin-top:6px;
          padding:10px 20px;
          border-radius:10px;
          border:none;
          cursor:pointer;
          font-weight:700;
          font-size:15px;
          background: linear-gradient(180deg,#7c3aed,#6d28d9);
          color:#fff;
          box-shadow:0 8px 22px rgba(109,40,217,0.16);
        }
        .download-btn:hover { transform: translateY(-2px); }
        @media (max-width:640px) {
          .placeholder-card { width: calc(100% - 32px); padding:20px; border-radius:10px; }
          .prep-spinner { width:56px; height:56px; border-width:6px; }
        }
      `}</style>

      <div className="row">
        <div className="col-12 gen-wrapper">
          <div className="gen-head">
            <h2 className="gen-title">Generated Notes</h2>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => handleSave(generatedContent)}
              >
                Save for Revision
              </button>
            </div>
          </div>

          <div className="placeholder-card" style={{ marginTop: "150px" }} role="region" aria-live="polite">
            {showPreparing ? (
              <>
                <div className="prep-spinner" aria-hidden="true" />
                <div className="prep-text">Preparing your notes…</div>
                <div className="ready-sub">We are extracting and formatting your content.</div>
              </>
            ) : (
              <>
                <div className="ready-title">{generatedContent.title}</div>
                <div style={{ textAlign: "center" }}>
                  <div className="ready-sub">
                    {generatedContent.subject} • {generatedContent.date}
                  </div>
                </div>

                <button
                  className="download-btn"
                  onClick={() => downloadDummyPdf("generated-notes-sample.pdf")}
                >
                  Click here to download file
                </button>
                <div className="ready-sub">File type: PDF (sample)</div>
              </>
            )}
          </div>
        </div>
      </div>

      <ChatPromptBar
        onSend={(prompt, onAssistantReply) => {
          onAssistantReply &&
            onAssistantReply((assistantText) => {
              /* optional: setGeneratedContent((prev) => ({ ...prev, content: assistantText })) */
            });
        }}
      />
    </div>
  );
};

export default NewGenerateNotesPage;
