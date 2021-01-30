import axios from 'axios';
import { BlockMapType } from 'react-notion';
import config from 'config';

const BASE_URL = `https://notion-api.splitbee.io/v1`


export const getPage = (pageId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/page/${pageId}`).then(response => response.data);
}

export const getTable = (tableId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/table/${tableId}`).then(response => response.data);
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

export const getNotesPage = async (): Promise<any> => {
  const notesPage = await getPage(config.notesPageId);
  const notes = await getNotes();
  return { notesPage, notes }
};

export const getGuidesPage = async (): Promise<any> => {
  const guidesPage = await getPage(config.guidesPageId);
  const guides = await getGuides();
  return { guidesPage, guides }
};

export const getHomePage = async (): Promise<any> => {
  const { introId, guidesTable, notesTable } = config;
  const introBlocks = await getPage(introId);
  const guidesTableBlocks = await getTable(guidesTable);
  const notesTableBlocks = await getTable(notesTable)
  return { intro: introBlocks, guides: guidesTableBlocks, notes: notesTableBlocks }
}

export const getGuides = async (): Promise<any> => {
  const { guidesTable } = config;
  const guides = await getTable(guidesTable);
  return guides;  
}

export const getGuide = async (guideId: string): Promise<any> => {
  const guide = await getPage(guideId);
  return guide;
}

export const getAboutPage = async (): Promise<any> => {
  const aboutPage = await getPage(config.aboutPageId);
  return aboutPage;
}