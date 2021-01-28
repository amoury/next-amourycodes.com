import slugify from 'slugify';

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