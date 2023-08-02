import { JSDOM } from "jsdom";

export type Page = {
  dom: JSDOM;
  url: string;
};
