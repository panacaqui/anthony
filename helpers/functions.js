module.exports = {
  sort: (list, column = 'id', order = 'asc') => {
    return list.sort((a, b) => {
      if (a[column] && b[column]) {
        if (order === 'asc') {
          return a[column] > b[column] ? 1 : -1;
        } else {
          return a[column] < b[column] ? 1 : -1;
        }
      } else {
        return 1;
      }
    });
  }
};
