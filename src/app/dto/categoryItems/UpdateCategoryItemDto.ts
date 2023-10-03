import { Comments, Icons, Rating } from "@prisma/client";

export interface UpdateCategoryItemDto {
  categoryItemId: string;
  title: string;
  image: string;
  video: string;
  description: string;
  subtitle: string;
  rating: Rating;
  icons: Icons[];
  details: string;
  comments: Comments[];
}
