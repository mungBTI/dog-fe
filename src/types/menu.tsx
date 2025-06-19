import { StaticImageData } from "next/image";

export type MenuItemWithFields = {
  label: string;
  icon: string | StaticImageData;
  fields: { label: string }[];
};

export type MenuItem = {
  label: string;
  icon: string | StaticImageData;
};
