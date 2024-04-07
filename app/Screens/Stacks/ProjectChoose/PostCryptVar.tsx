// SingletonStatus.js
let postCrypt = "";

export const setPostCrypt = (value: string) => {
  postCrypt = value;
};

export const getPostCrypt = () => {
  return postCrypt;
};

  