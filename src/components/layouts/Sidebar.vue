<script setup>
import FlexBox from "../ui/FlexBox.vue";
import SideBarRoute from "../ui/SideBarRoute.vue";
import logoMadreload from "../../assets/images/madreloadIcon.png";
import logoMadreloadText from "../../assets/images/madreloadText.png";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { formatPrice } from "@/lib/utils";

const inActiveButton = "text-black";
const activeButton = "text-white";
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const auth = useAuthStore();
const currentTime = ref(new Date().toLocaleTimeString());
let intervalId;

const formattedSaldo = computed(() => {
  return auth.user && auth.user.saldo
    ? formatPrice(auth.user.saldo)
    : formatPrice(0);
});

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
};

onMounted(() => {
  if (!auth.user) {
    auth.fetchUserByToken();
  }
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const getIconClass = (baseClass, isActive) => {
  return `${baseClass} ${isActive ? activeButton : inActiveButton}`;
};

const logout = () => {
  authStore.logout();
  router.push({ name: "Login" });
};
</script>

<template>
  <aside
    class="lg:w-screen h-16 bg-[#00d2d3] lg:flex sticky top-0 z-50 overflow-hidden md:w-screen sm:w-screen"
  >
    <FlexBox :full="true" gap="extra large" itCenter jusCenter>
      <div
        class="flex justify-start gap-0 px-4 pl-16 items-left md:justify-left hover:cursor-pointer"
        @click="router.push('/')"
      >
        <img
          id="sideNavLogo"
          :src="logoMadreload"
          alt="LogoMadreload"
          width="50"
        />
        <img
          class="hidden md:block lg:w-36"
          id="sideNavLogoText"
          :src="logoMadreloadText"
          alt="LogoMadreloadText"
          width="170"
        />
      </div>
      <div
        class="flex flex-row items-start justify-start gap-3 px-4 font-medium"
      >
        <SideBarRoute
          routeName="Home"
          :routerClass="[
            `w-36 h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /home/gi.test(route.path) ? 'text-white' : 'text-black',
          ]"
          :iconClass="
            getIconClass('mdi mdi-home text-xl', /home/gi.test(route.path))
          "
          destination="/"
        />
        <SideBarRoute
          routeName="History"
          :routerClass="[
            `w-36 h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /history/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          :iconClass="
            getIconClass(
              'mdi mdi-history text-xl',
              /history/gi.test(route.path)
            )
          "
          destination="/history"
        />
        <SideBarRoute
          routeName="Produk"
          :routerClass="[
            `w-36 h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /price-list/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          :iconClass="
            getIconClass(
              'mdi mdi-book text-xl',
              /price-list/gi.test(route.path)
            )
          "
          destination="/price-list"
        />
        <SideBarRoute
          routeName="Profile"
          :routerClass="[
            `w-36 h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /profile/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          :iconClass="
            getIconClass(
              'mdi mdi-account text-xl',
              /profile/gi.test(route.path)
            )
          "
          destination="/profile"
        />

        <SideBarRoute
          v-if="authStore.user.role == 1"
          routeName="Admin"
          :routerClass="[
            `w-36 h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /admin/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          :iconClass="
            getIconClass('mdi mdi-shield text-xl', /admin/gi.test(route.path))
          "
          destination="/admin"
        />
        <div
          @click="logout"
          class="flex items-center justify-start h-12 font-bold text-red-600 duration-200 ease-in-out rounded-md cursor-pointer w-36 lg:p-6 sm:pl-2"
        >
          <i class="text-xl mdi mdi-logout"></i>
          <span class="ml-4 md:hidden sm:hidden lg:inline">Logout</span>
        </div>
        <div
          class="flex items-center justify-start h-12 font-bold text-white duration-200 ease-in-out rounded-md cursor-pointer w-36 lg:p-6 sm:pl-2"
        >
          {{ formattedSaldo }}
        </div>
      </div>
      <div class="flex flex-col gap-10 p-5"></div>
    </FlexBox>
  </aside>
</template>
