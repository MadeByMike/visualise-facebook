export const titleCase = string => {
  return string
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};
