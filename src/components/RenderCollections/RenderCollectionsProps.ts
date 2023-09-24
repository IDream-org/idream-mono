interface Data {
  id: string;
  title: string;
  image: string;
  collectionsId?: string;
}

export interface RenderCollectionsProps {
  data: Data[];
  path: string;
}
