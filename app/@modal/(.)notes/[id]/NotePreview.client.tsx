'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../../lib/api/clientApi';
import Modal from '../../../../components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal onClose={() => router.back()}><div>Loading...</div></Modal>;
  if (!note) return <Modal onClose={() => router.back()}><div>Note not found</div></Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.previewContainer}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button onClick={() => router.back()} className={css.closeButton}>
          Close
        </button>
      </div>
    </Modal>
  );
}