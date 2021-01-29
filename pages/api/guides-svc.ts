import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../config';
import { getPage, getTable } from '@utils/api';

export default async function guides(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const guides = await getGuides();
  res.json({ ...guides });
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