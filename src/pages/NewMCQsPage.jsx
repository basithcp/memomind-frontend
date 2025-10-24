// NewMCQsPage.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import mcqString from '../data/dummySavedMCQs.json';
import styles from "./NewNotesPage.module.css";

const NewMCQsPage = () => {
  const initialMCQs = Array.isArray(mcqString?.data) ? mcqString.data : [];
  const [mcqs, setMCQs] = useState(initialMCQs);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this mcq?")) return;
    setMCQs((prev) => prev.filter((n) => n._id !== id));
  };

  const handleOpen = (mcq) => {
    // navigate to the load-notes route. we include the note id in the path
    // and also pass the note via location.state for convenience.
    // If you prefer just '/load-notes' without the id, change the path accordingly.
    navigate(`/load-mcq/${mcq._id}`, { state: { mcq } });
  };

  return (
    <div className={styles.newNotesContainer}>
      <h1 className={styles.newNotesTitle}>Your MCQs</h1>

      <div className={styles.newNotesList} role="list">
        {mcqs.length === 0 ? (
          <div className={styles.newNotesEmpty}>No saved MCQs found.</div>
        ) : (
          mcqs.map((mcq) => (
            <article key={mcq._id} className={styles.newNotesCard} role="listitem">
              <div className={styles.newNotesCardHeader}>
                <h2 className={styles.newNotesItemName}>{mcq.itemName}</h2>
                <button
                  className={styles.newNotesDeleteBtn}
                  onClick={() => handleDelete(mcq._id)}
                  aria-label={`Delete ${mcq.itemName}`}
                  title="Delete"
                >
                  ✕
                </button>
              </div>

              <div className={styles.newNotesCardBody}>
                <div className={styles.newNotesMetaRow}>
                  <span className={styles.newNotesMetaLabel}>Added:</span>
                  <time className={styles.newNotesMetaValue} dateTime={mcq.createdAt}>
                    {new Date(mcq.createdAt).toLocaleString()}
                  </time>
                </div>
              </div>

              <div className={styles.newNotesCardFooter}>
                <button
                  className={styles.newNotesPrimaryBtn}
                  onClick={() => handleOpen(mcq)}
                >
                  Open
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default NewMCQsPage;
