import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

// Đọc giỏ hàng đã lưu
function loadCart() {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? { items: JSON.parse(saved) } : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: { cart: loadCart() ?? { items: [] } },
});

// Ghi giỏ hàng mỗi khi state thay đổi
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});