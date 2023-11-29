export const paginate = (items, page, pageSize) => {
  if ((items.hasData, page, pageSize)) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    return items.resultSet.slice(startIndex, endIndex);
  }
  return items;
};
