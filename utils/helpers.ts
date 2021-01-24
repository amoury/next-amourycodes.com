import slugify from 'slugify';

export const getFormattedId = id => id.split('-').join('');

export const slugifyTitle = title => slugify(title).toLowerCase();

export const formatUrl = (title: string, id: string) => {
  const formattedId = id.split('-').join('');
  return `${slugifyTitle(title)}/${getFormattedId(id)}`;
}