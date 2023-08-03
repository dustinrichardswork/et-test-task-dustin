import { JSDOM } from "jsdom";

export type Page = {
  dom: JSDOM;
  content: string;
  url: string;
};
