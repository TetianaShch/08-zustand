'use client';

import { useRouter } from 'next/navigation';
import { createNoteAction } from '@/app/notes/action/create/actions';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} className={css.textarea} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue="Todo">
          {TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} formAction={createNoteAction}>
          Create note
        </button>

        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
