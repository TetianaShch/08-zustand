'use client';

import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from './NotesPage.module.css';

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const perPage = 10;

  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryKey = useMemo(
    () => ['notes', { page, perPage, search: debouncedSearch, tag }],
    [page, perPage, debouncedSearch, tag]
  );

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debouncedSearch,
        ...(tag === 'all' ? {} : { tag }),
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <button type="button" className={css.button} onClick={openModal}>
          Add note
        </button>
        {data.totalPages > 1 && (
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        )}
        <SearchBox value={search} onChange={handleSearchChange} />
      </div>

      {isFetching && <p>Updating...</p>}

      {data.notes.length === 0 ? <p>No notes found.</p> : <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </main>
  );
}
