'use client';

import { useRouter } from 'next/navigation';
import { createNoteAction } from '@/app/notes/action/create/actions';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = e => {
    const { name, value } = e.target;

    if (name === 'title') setDraft({ title: value });
    if (name === 'content') setDraft({ content: value });
    if (name === 'tag') setDraft({ tag: value as NoteTag });
  };

  const handleSubmit = async (formData: FormData) => {
    const res = await createNoteAction(formData);

    if (res.ok) {
      clearDraft();
      router.back();
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input name="title" defaultValue={draft.title} onChange={handleChange} />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea name="content" defaultValue={draft.content} onChange={handleChange} />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select name="tag" defaultValue={draft.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
