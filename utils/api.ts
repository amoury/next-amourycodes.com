import axios from 'axios';
import { BlockMapType } from 'react-notion';

const NOTES_TABLE_ID = `94d205d7b352445fb05bd42179a90b3d`;
const BASE_URL = `https://notion-api.splitbee.io/v1`

export const getNotes = async (): Promise<any> => {
  const response = await axios.get(`https://notion-api.splitbee.io/v1/table/${NOTES_TABLE_ID}`)
  return response.data; 
}

export const getNote = (noteId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/page/${noteId}`).then(response => response.data);
}

export const getPage = (pageId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/page/${pageId}`).then(response => response.data);
}

export const getTable = (tableId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/table/${tableId}`).then(response => response.data);
}