import { StaticImageData } from "next/image";

export type MenuItemWithFields = {
  label: string;
  icon: StaticImageData;
  fields: { label: string }[];
};

export type MenuItem = {
  label: string;
  icon: StaticImageData;
};
