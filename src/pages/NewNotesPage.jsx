// NewNotesPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notesString from '../data/dummySavedNotes.json';
import styles from "./NewNotesPage.module.css";

const NewNotesPage = () => {
  const initialNotes = Array.isArray(notesString?.data) ? notesString.data : [];
  const [notes, setNotes] = useState(initialNotes);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleOpen = (note) => {
    navigate(`/load-notes/${note._id}`, { state: { note } });
  };

  return (
    <div className={styles.newNotesContainer}>
      <h1 className={styles.newNotesTitle}>Your Notes</h1>

      <div className={styles.newNotesList} role="list">
        {notes.length === 0 ? (
          <div className={styles.newNotesEmpty}>No saved notes found.</div>
        ) : (
          notes.map((note) => (
            <article key={note._id} className={styles.newNotesCard} role="listitem">
              <div className={styles.newNotesCardHeader}>
                <h2 className={styles.newNotesItemName}>{note.itemName}</h2>
                <button
                  className={styles.newNotesDeleteBtn}
                  onClick={() => handleDelete(note._id)}
                  aria-label={`Delete ${note.itemName}`}
                  title="Delete"
                >
                  ✕
                </button>
              </div>

              <div className={styles.newNotesCardBody}>
                <div className={styles.newNotesMetaRow}>
                  <span className={styles.newNotesMetaLabel}>Added:</span>
                  <time className={styles.newNotesMetaValue} dateTime={note.createdAt}>
                    {new Date(note.createdAt).toLocaleString()}
                  </time>
                </div>
              </div>

              <div className={styles.newNotesCardFooter}>
                <button
                  className={styles.newNotesPrimaryBtn}
                  onClick={() => handleOpen(note)}
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
};

export default NewNotesPage;
