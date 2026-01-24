'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(String(id)),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button type="button" onClick={() => router.back()}>
              Close
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
