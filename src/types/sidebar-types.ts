export interface SubMenuItem {
  label: string;
  path: string;
  key: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  key: string;
  path?: string;
  submenu?: SubMenuItem[];
}