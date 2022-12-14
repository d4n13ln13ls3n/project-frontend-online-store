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

export async function getProductsByCategory(
  categoryId = '$CATEGORY_ID',
) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const request = await fetch(endpoint);
  return request.json();
}

export async function getProductDetails(
  productId = '$PRODUCT_ID',
) {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(endpoint);
  return request.json();
}
