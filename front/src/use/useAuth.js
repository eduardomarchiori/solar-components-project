import { reactive, computed } from 'vue';
import { hasCookie } from '../services/common/cookie';

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
    console.log(state.isLogged);
  }

  const user = computed(() => state.user);
  const isLogged = computed(() => state.isLogged);

  return {
    user,
    isLogged,
    setLoggin,
    setUser,
    clearState
  }
}