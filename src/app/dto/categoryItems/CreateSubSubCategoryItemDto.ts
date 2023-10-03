import { Comments, Icons, ItemDesign, Rating } from "@prisma/client";

export interface CreateSubSubCategoryItemDto {
  categoryId: string;
  subCategoryId: string;
  subSubCategoryId: string;
  title: string;
  image: string;
  video: string;
  description: string;
  subtitle: string;
  rating: Rating;
  icons: Icons[];
  details: string;
  comments: Comments[];
  itemDesign: ItemDesign;
}
