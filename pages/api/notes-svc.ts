import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../config';
import { getPage, getTable } from '@utils/api';

export default async function notes(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const notes = await getNotes();
  res.json({ ...notes });
}

export const getNotes = async (): Promise<any> => {
  const { notesTable } = config;
  const notes = await getTable(notesTable);
  return notes;  
}

export const getNote = async (noteId: string): Promise<any> => {
  const note = await getPage(noteId);
  return note;
}