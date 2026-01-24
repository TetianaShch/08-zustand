import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 10, search: '', tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: '',
        ...(tag === 'all' ? {} : { tag }),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
