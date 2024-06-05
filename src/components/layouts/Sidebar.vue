<script setup>
import FlexBox from "../ui/FlexBox.vue";
import SideBarRoute from "../ui/SideBarRoute.vue";
import logoMadreload from "../../assets/images/madreloadIcon.png";
import logoMadreloadText from "../../assets/images/madreloadText.png";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";

const inActiveButton = "bg-slate-300 hover:bg-white hover:text-black";
const activeButton = "text-black bg-white hover:text-red-600";
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push({ name: "Login" });
};
</script>

<template>
  <aside
    class="lg:w-96 h-screen bg-[#00d2d3] lg:flex sticky top-0 z-50 overflow-hidden md:w-28 sm:w-20"
  >
    <FlexBox :flex-col="true" :full="true" gap="extra large">
      <div
        class="flex items-center justify-start w-full gap-0 px-4 mt-7 md:justify-center"
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
        class="flex flex-col items-start justify-start w-full gap-3 px-4 mt-6 font-medium"
      >
        <SideBarRoute
          routeName="Home"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /home/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-home text-xl text-black"
          destination="/"
        />
        <SideBarRoute
          routeName="History"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /history/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-history text-xl text-black"
          destination="/history"
        />
        <SideBarRoute
          routeName="Daftar Harga"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /price-list/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-book text-xl text-black"
          destination="/price-list"
        />
        <SideBarRoute
          routeName="Kalkulator ML"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /calculator/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-calculator text-xl text-black"
          destination="/calculator"
        />
        <SideBarRoute
          routeName="Blog"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /blog/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-blogger text-xl text-black"
          destination="/blog"
        />
        <SideBarRoute
          routeName="Profile"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /profile/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-account text-xl text-black"
          destination="/profile"
        />
        <SideBarRoute
          v-if="authStore.user.role == 1"
          routeName="Admin"
          :routerClass="[
            `w-full h-12 flex justify-start lg:pl-6 items-center rounded-md sm:pl-2
                              cursor-pointer duration-200 ease-in-out`,
            /admin/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-shield text-xl text-black"
          destination="/admin"
        />
        <div
          @click="logout"
          class="flex items-center justify-start w-full h-12 mt-6 text-white duration-200 ease-in-out bg-red-500 rounded-md cursor-pointer lg:pl-6 sm:pl-2 hover:bg-red-600"
        >
          <i class="text-xl mdi mdi-logout"></i>
          <span class="ml-4 md:hidden sm:hidden lg:inline">Logout</span>
        </div>
      </div>
      <div class="flex flex-col gap-10 p-5"></div>
    </FlexBox>
  </aside>
</template>
