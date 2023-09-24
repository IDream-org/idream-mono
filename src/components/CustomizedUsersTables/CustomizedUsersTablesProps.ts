interface Rows {
  image: string;
  name: string;
  role: string;
  actions: React.JSX.Element;
}

export interface CustomizedTablesProps {
  columns: string[];
  rows: Rows[];
}
