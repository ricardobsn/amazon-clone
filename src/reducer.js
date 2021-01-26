export const initialState = {
  basket: [],
  user: null,
};

export const getTotal = (total, item) => {
  return total + item.price;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };

    //   return {
    //     ...state,
    //     basket: state.basket.filter((item) => item.id !== action.id),
    //   };

    default:
      return state;
  }
};

export default reducer;
