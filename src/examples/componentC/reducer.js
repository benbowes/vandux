// Perform STATE manipulations in here
export default (state = {}, action) => {
  switch (action.type) {
    case 'MAKE_ASYNC_REQUEST':
      return {
        ...state,
        isLoading: true
      };

    case 'ASYNC_REQUEST_FAILED':
      return {
        ...state,
        results: [],
        isLoading: false,
        error: action.data.error
      };

    case 'RECIEVE_ASYNC_REQUEST':
      return {
        ...state,
        error: false,
        isLoading: false,
        results: [...action.data.results]
      };

    default:
      return { ...state };
  }
};
