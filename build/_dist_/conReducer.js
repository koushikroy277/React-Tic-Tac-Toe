export const conReducer = (state, action) => {
  switch (action.type) {
    case "GetId":
      return {...state, cellId: action.payload};
      return state;
    default:
      throw new Error();
  }
};
