import { TPost } from 'types/post';
import slugify from 'slugify';
import { BlockMapType } from 'react-notion';
import _get from 'lodash/get';

export const getFormattedId = (id: string): string => id.split('-').join('');

export const slugifyTitle = (title: string): string => slugify(title).toLowerCase();

export const formatUrl = (title: string, id: string): string => (`${slugifyTitle(title)}/${getFormattedId(id)}`);



const hexToRgb = (hex) => {
  // http://stackoverflow.com/a/5624139
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const rgba = (hex: string, alpha: string): string => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export const getFormattedMetaData = (note: BlockMapType, noteId: string): TPost | null => {
  const blockWithCollection = Object.values(note).filter(block => block.hasOwnProperty('collection'));
  if (!blockWithCollection.length) return;
  let collectionData: Array<TPost> =  _get(blockWithCollection[0],'collection.data');
  collectionData = collectionData.filter(coll => getFormattedId(coll.id) === noteId);
  const { id, status, tags, title: newTitle, createdAt, tagline } = collectionData[0];
  const tagsList = _get(tags, '0.0', '');
  const title = _get(newTitle, '0.0');

  return ({ 
    tags: tagsList?.split(','), 
    title, 
    status: _get(status, '0.0', 'draft'), 
    description: _get(tagline, '0.0', `Short article about ${title.toLowerCase()}`),
    id, 
    createdAt: _get(createdAt, '0.1.0.1.start_date', new Date()) 
  });
};