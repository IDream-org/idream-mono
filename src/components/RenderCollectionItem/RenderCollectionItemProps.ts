import { CategoryItems } from "@prisma/client";

export interface RenderCollectionItemProps {
  categoryItems: CategoryItems[];
  isLoading: boolean;
  path?: string;
}
