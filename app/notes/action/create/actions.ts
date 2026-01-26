'use server';

import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';

export async function createNoteAction(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = String(formData.get('tag') ?? 'Todo') as NoteTag;

    if (!title) return;

    await createNote({ title, content, tag });
}
