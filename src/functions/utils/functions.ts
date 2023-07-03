export const slugifyTitle = (title: string) => {
  if (!title) return;
  const slug = title
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-")
    .toLowerCase();
  return slug;
};

export const getPublishedDate = (date?: number) =>
  date != null ? new Date(date).getTime().toString() : new Date().getTime().toString();

export const getMatching = (str: string, regex: RegExp) => {
  if (!str) return;
  const match = str.match(regex);
  if (!match) return;
  return match[1].trim();
};
