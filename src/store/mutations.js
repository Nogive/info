import * as types from "./types";
const mutations = {
  [types.SET_LOADING](state, flag) {
    state.isLoading = flag;
  },
  //清空错误信息
  [types.SET_CLEAR_ERROR](state, flag) {
    state.errorMessage = flag;
  },

  //错误处理
  [types.SET_REQUEST_ERROR](state, error) {
    if (typeof error.error == "string") {
      state.errorMessage = error.error;
    } else {
      state.errorMessage = error.error.message;
    }
  }
};
export default mutations;
