<script setup>
import FlexBox from "../ui/FlexBox.vue";
import SideBarRoute from "../ui/SideBarRoute.vue";
import logoMadreload from "../../assets/images/madreloadIcon.png";
import logoMadreloadText from "../../assets/images/madreloadText.png";

import { useRoute } from "vue-router";

const inActiveButton = "bg-blue-100 hover:bg-white hover:text-black";
const activeButton = "text-black bg-slate-50 hover:text-red-600";
const route = useRoute();

// import { ref } from "vue"
// const sidebar = ref(null);
</script>

<template>
  <aside
    class="w-80 h-screen bg-[#2af0d5] hidden lg:flex lg:sticky top-0 z-50 overflow-hidden"
  >
    <FlexBox :flex-col="true" :full="true" gap="extra large">
      <div class="flex items-center justify-start w-full gap-0 px-4 mt-7">
        <img
          id="sideNavLogo"
          :src="logoMadreload"
          alt="LogoMadreload"
          width="50"
        />
        <img
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
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            route.name === 'Home' ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-home text-xl text-black"
          destination="/"
        />
        <div>Riwayat</div>
        <div>Daftar Harga</div>
        <div>Kalkulator ML</div>
        <div>Blog</div>
        <div>Profile</div>
        <div>Log In / LogOut</div>
      </div>
    </FlexBox>
  </aside>
</template>
