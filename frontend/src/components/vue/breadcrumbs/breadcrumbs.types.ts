export interface IBreadcrumbItem {
  label: string;
  href?: string;
}

export interface IBreadcrumbsProps {
  items?: IBreadcrumbItem[];
  status?: string;
  category?: string;
  description?: string;
  title: string;
}
