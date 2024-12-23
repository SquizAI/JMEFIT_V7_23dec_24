export interface NavItem {
  label: string;
  path?: string;
  children?: {
    label: string;
    path: string;
  }[];
}

export interface NavItemProps {
  item: NavItem;
  currentPath: string;
}