const countTotalComments = obj => {
  let count = 0;

  if (Array.isArray(obj)) {
    obj.forEach((child, idx) => {
      count++;
      for (const key in child) {
        if (key === "replies") {
          count += countTotalComments(child[key]);
        }
      }
    });
  }
  return count;
};

export { countTotalComments };
