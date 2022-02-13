import { NewsItem } from "@/ts/Types";
const state = {
  news: [] as NewsItem[],
};

type RootState = typeof state;

export { state, RootState };
