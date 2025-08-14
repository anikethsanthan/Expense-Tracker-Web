import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize = "50ml" } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product._id && item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        state.items.push({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          rating: product.rating,
          quantity: quantity,
          size: selectedSize,
          selected: true, // Default to selected
        });
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );

      // Recalculate totals
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(
            (item) => !(item.id === id && item.size === size)
          );
        } else {
          existingItem.quantity = quantity;
        }

        // Recalculate totals
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    toggleItemSelection: (state, action) => {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (existingItem) {
        existingItem.selected = !existingItem.selected;
      }
    },

    selectAllItems: (state, action) => {
      const { selected } = action.payload;
      state.items.forEach((item) => {
        item.selected = selected;
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleItemSelection,
  selectAllItems,
} = cartSlice.actions;
export default cartSlice.reducer;
