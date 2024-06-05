import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "../store/modules/auth"; 

const router = createRouter({
    // eslint-disable-next-line no-unused-vars
  scrollBehavior(__to, __from, __savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); 
  const isLoggedIn = authStore.isAuthenticated; 

  if (!isLoggedIn) {
    if (to.name !== "Login" && to.name !== "Daftar") {
      next({ name: 'Daftar' }); 
    } else {
      next();
    }
  } else {
    if (to.name === 'Login' || to.name === 'Daftar') {
      next({ name: 'Home' });
    } else {
      next();
    }
  }
});



export default router;
