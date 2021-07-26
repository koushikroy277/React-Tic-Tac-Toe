export const conReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GetId':
      return { ...state, cellId: action.payload }
      
    return state;

    default:
      throw new Error()
  }
}
