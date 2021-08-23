const initialState = {
  msg: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'setMsg':
      return {...state, msg: action.payload};
    default:
      return state;
  }
}

export default reducer;
