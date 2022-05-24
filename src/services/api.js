export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(endpoint);
  return request.json();
}

export async function getProductsFromCategoryAndQuery(
  categoryId = '$CATEGORY_ID', query = '$QUERY ',
) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const request = await fetch(endpoint);
  return request.json();
}
