export type TPost = {
  createdAt: string;
  id: string;
  status: 'published' | 'draft'
  tags: string[];
  title: string;
  description: string;
};