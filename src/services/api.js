import { mockProducts } from '../data/mockProducts';

// Simulate network latency (e.g., 500ms) for learning purposes in an internship report
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay(500);
  return mockProducts;
};

export const getProductById = async (id) => {
  await delay(300);
  const product = mockProducts.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};
