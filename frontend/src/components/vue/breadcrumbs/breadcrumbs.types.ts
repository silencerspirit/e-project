export interface IBreadcrumbItem {
  href?: string;
  label: string;
}

export interface IBreadcrumbsProps {
  category?: string;
  description?: string;
  items?: IBreadcrumbItem[];
  status?: string;
  title: string;
}
