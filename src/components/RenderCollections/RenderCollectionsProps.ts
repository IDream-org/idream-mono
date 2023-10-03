interface Data {
  id: string;
  title: string;
  image: string;
  collectionsId?: string;
  categoryId?: string;
  subCategoryId?: string | null;
}

export interface RenderCollectionsProps {
  data: Data[];
  path: string;
}
