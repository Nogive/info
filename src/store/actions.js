import * as types from "./types";
const actions = {
  setLoading: function({ commit }, flag) {
    commit(types.SET_LOADING, flag);
  },
  setClearError: function({ commit }, flag) {
    commit(types.SET_CLEARERROR, flag);
  },

  setError: function({ commit }, error) {
    commit({
      type: types.SET_REQUEST_ERROR,
      error: error
    });
  }
};
export default actions;
