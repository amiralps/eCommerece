export const shortenText = (text, scount) => {
  return text.split(" ").slice(0, scount || 3).join(" ");
};

export const searchProducts = (products, search) => {
  if (!search) {
    return products;
  }
  const searchedProducts = products.filter((p) =>
    shortenText(p.title.toLowerCase()).includes(search.toLowerCase())
  );
  return searchedProducts;
};

export const filterSearch = (products, category) => {
  if (!category) return products;
  const results = products.filter(
    (p) => p.category.toLowerCase() == category.toLowerCase()
  );
  return results;
};

export const createQueryObject = (currentQuery, newQuery) => {
  if (
    newQuery.category === "all" ||
    newQuery.category ===
      `all\nelectronics\njewelery\nmen's clothing\nwomen's clothing` ||
    newQuery.category ===
      `allelectronicsjewelerymen's clothingwomen's clothing`
  ) {
    const {category, ...result} = currentQuery;
    return result;
  }
  if (newQuery.search === "") {
    const {search, ...result} = currentQuery;
    return result;
  }
  return {...currentQuery, ...newQuery};
};

export const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;

  return query;
};

export const sumProducts = (products) => {
  const itemsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return {itemsCounter, total};
};

export const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) return 0;
  else return state.selectedItems[index].quantity;
};
