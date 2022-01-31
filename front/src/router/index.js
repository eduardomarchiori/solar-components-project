import { createWebHistory, createRouter } from "vue-router";
import useAuth from "../use/useAuth";
import { getCookie } from "../services/common/cookie";
import Home from "../components/home/Home.vue";
import Signin from "../components/signin/Signin.vue";
import Signup from "../components/signup/Signup.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const PUBLIC_ROUTES_NAME = [
  'Signin',
  'Signup',
];

const isWhiteListedRoute = routeName => {
  return PUBLIC_ROUTES_NAME.includes(routeName);
}

router.beforeEach(async (to, from, next) => {
  const { setLoggin, isLogged } = useAuth();
  setLoggin();

  const { name } = to;
  console.log(to);

  if (!isWhiteListedRoute(name) && !isLogged.value) next({ name: 'Signin' })
  if (isWhiteListedRoute(name) && isLogged.value) next({ name: 'Home' })
  next();
});

export default router;