// NewFlashCardsPage.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import fcString from '../data/dummySavedFCs.json';
import styles from "./NewNotesPage.module.css";

const NewFlashCardsPage = () => {
  const initialFCs = Array.isArray(fcString?.data) ? fcString.data : [];
  const [fcs, setFCs] = useState(initialFCs);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this flashcard?")) return;
    setFCs((prev) => prev.filter((n) => n._id !== id));
  };

  const handleOpen = (fc) => {
    // navigate to the load-flashcards route and pass the note via location.state
    navigate(`/load-flashcards/${fc._id}`, { state: { fc } });
  };

  return (
    <div className={styles.newNotesContainer}>
      <h1 className={styles.newNotesTitle}>Your Flashcards</h1>

      <div className={styles.newNotesList} role="list">
        {fcs.length === 0 ? (
          <div className={styles.newNotesEmpty}>No saved Flashcards found.</div>
        ) : (
          fcs.map((fc) => (
            <article key={fc._id} className={styles.newNotesCard} role="listitem">
              <div className={styles.newNotesCardHeader}>
                <h2 className={styles.newNotesItemName}>{fc.itemName}</h2>
                <button
                  className={styles.newNotesDeleteBtn}
                  onClick={() => handleDelete(fc._id)}
                  aria-label={`Delete ${fc.itemName}`}
                  title="Delete"
                >
                  ✕
                </button>
              </div>

              <div className={styles.newNotesCardBody}>
                <div className={styles.newNotesMetaRow}>
                  <span className={styles.newNotesMetaLabel}>Added:</span>
                  <time className={styles.newNotesMetaValue} dateTime={fc.createdAt}>
                    {new Date(fc.createdAt).toLocaleString()}
                  </time>
                </div>
              </div>

              <div className={styles.newNotesCardFooter}>
                <button
                  className={styles.newNotesPrimaryBtn}
                  onClick={() => handleOpen(fc)}
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

export default NewFlashCardsPage;
