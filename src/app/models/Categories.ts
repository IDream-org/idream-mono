export enum WhereToWwatch {
  Netflix = "Netflix",
  Amazon = "Amazon",
  Hulu = "Hulu",
  Youtube = "Youtube",
}

interface SubCategoryData {
  id: number;
  image: string;
  title: string;
  description: string;
  subTitle: string;
  place?: string;
  where?: string;
  genre?: string;
  runtime?: string;
}

interface SubCategory {
  id: number;
  img: string;
  title: string;
  subCategoryData: SubCategoryData[];
}

interface CategoryData {
  id: number;
  image: string;
  title: string;
  description: string;
  genres?: string;
  runtime?: string;
  place?: string;
  whereToWatch?: WhereToWwatch[];
  subTitle?: string | number;
  subCategory?: SubCategory[];
}

export interface Categories {
  id: number;
  image: string;
  title: string;
  data: CategoryData[];
}
