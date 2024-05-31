<script setup>
import FlexBox from "../ui/FlexBox.vue";
import SideBarRoute from "../ui/SideBarRoute.vue";
import logoMadreload from "../../assets/images/madreloadIcon.png";
import logoMadreloadText from "../../assets/images/madreloadText.png";
import { useRoute } from "vue-router";

const inActiveButton = "bg-slate-300 hover:bg-white hover:text-black";
const activeButton = "text-black bg-white hover:text-red-600";
const route = useRoute();

</script>

<template>
  <aside
    class="w-96 h-screen bg-[#00d2d3] hidden lg:flex lg:sticky top-0 z-50 overflow-hidden"
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
            /home/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-home text-xl text-black"
          destination="/"
        />
        <SideBarRoute
          routeName="History"
          :routerClass="[
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            /history/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-history text-xl text-black"
          destination="/history"
        />
        <SideBarRoute
          routeName="Daftar Harga"
          :routerClass="[
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            /price-list/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-book text-xl text-black"
          destination="/price-list"
        />
        <SideBarRoute
          routeName="Kalkulator ML"
          :routerClass="[
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            /calculator/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-calculator text-xl text-black"
          destination="/calculator"
        />
        <SideBarRoute
          routeName="Blog"
          :routerClass="[
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            /blog/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-blogger text-xl text-black"
          destination="/blog"
        />
        <SideBarRoute
          routeName="Profile"
          :routerClass="[
            `w-full h-12 flex justify-start pl-6 items-center rounded-md
                              cursor-pointer duration-200 ease-in-out`,
            /profile/gi.test(route.path) ? activeButton : inActiveButton,
          ]"
          iconClass="mdi mdi-account text-xl text-black"
          destination="/profile"
        />
      </div>
      <div class="flex flex-col gap-10 p-5">
        
      </div>
    </FlexBox>
  </aside>
</template>
