import { reactive, computed } from 'vue';
import { hasCookie, getCookie } from '../services/common/cookie';
import * as userService from '../services/user/userService';

const state = reactive({
  user: {
    id: '',
    name: '',
    email: '',
  },
  isLogged: false,
  loading: {
  }
});

export default function useAuth() {

  const getUser = async () => {
    const response = await userService.getUser();
    setUser(response.user);
  }

  const setUser = (params) => {
    state.user = { ...params };
  }

  const clearState = (userProp) => {
    let { user } = state;

    if(userProp){
      state.user[userProp] = '';
      return;
    }

    user.id = user.name = user.email = ''; 
  }

  const setLoggin = () => {
    state.isLogged = hasCookie('accessToken');
  }

  const user = computed(() => state.user);
  const isLogged = computed(() => state.isLogged);

  return {
    user,
    isLogged,
    setLoggin,
    setUser,
    getUser,
    clearState
  }
}