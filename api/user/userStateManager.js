const initialState = {};

const stateManager = (state = initialState, action) => {
  const { type, user = {}, error = {} } = action;
  switch (type) {
    case "login":
      return { ...user, isLogin: true };
    case "register":
      return { ...user, isLogin: true };
    case "getUsers":
      return { ...state, clients: user, isLogin: false };
    case "editUserDetails":
      const newState = state.clients.filter(
        (userObj) => userObj.email !== user.user.email
      );
      newState.push(user.user);
      state.clients = newState;
      return state;
    case "error":
      return { error: true, ...error };
    default:
      return state;
  }
};

export default stateManager;
