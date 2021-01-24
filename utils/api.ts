import axios from 'axios';
import { BlockMapType } from 'react-notion';

const NOTES_TABLE_ID = `6f138a7874ed43f8a8fd80756aca1198`
const BASE_URL = `https://notion-api.splitbee.io/v1`

export const getNotes = async (): Promise<any> => {
  const response = await axios.get(`https://notion-api.splitbee.io/v1/table/${NOTES_TABLE_ID}`)
  return response.data; 
}

export const getNote = (noteId: string): Promise<any> => {
  return axios.get<BlockMapType>(`${BASE_URL}/page/${noteId}`).then(response => response.data);
}