<script setup>
import router from "@/router";
import axios from "axios";
import { ref, onMounted } from "vue";

const margin = ref(null);
const pulsa = ref(0);
const game = ref(0);
const ewallet = ref(0);
const voucher = ref(0);
const pln = ref(0);
const paket_data = ref(0);
const social_media = ref(0);

async function getMargin() {
  try {
    const response = await axios.get("http://localhost:5000/margin/get-margin");
    margin.value = response;
    pulsa.value = margin?.value.data[0].pulsa;
    game.value = margin?.value.data[0].game;
    ewallet.value = margin?.value.data[0].ewallet;
    voucher.value = margin?.value.data[0].voucher;
    pln.value = margin?.value.data[0].pln;
    paket_data.value = margin?.value.data[0].paket_data;
    social_media.value = margin?.value.data[0].social_media;
  } catch (e) {
    console.error("Error Fetching data margin:", e);
  }
}

async function updateMargin() {
  try {
    // eslint-disable-next-line
    const response = await axios.post(
      "http://localhost:5000/margin/update-margin",
      {
        pulsa: pulsa.value,
        game: game.value,
        social_media: social_media.value,
        ewallet: ewallet.value,
        voucher: voucher.value,
        pln: pln.value,
        paket_data: paket_data.value,
      }
    );
    router.go(-1);
  } catch (error) {
    console.error("Error updating margin:", error);
  }
}

function cancel() {
  router.go(-1);
}

onMounted(() => {
  getMargin();
});
</script>
<template>
  <div class="flex flex-col items-center w-full gap-2 p-5">
    <table class="w-1/2 rounded-lg bg-slate-300">
      <tr>
        <th class="p-1">No.</th>
        <th>Category</th>
        <th>Margin</th>
        <th>Type</th>
      </tr>
      <tr>
        <td class="text-center">1</td>
        <td class="text-center">Pulsa</td>
        <td class="p-1">
          <input
            v-model="pulsa"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <!-- <option value="1">percent(%)</option> -->
            <option value="2">rupiah(Rp)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">2</td>
        <td class="text-center">Game</td>
        <td class="p-1">
          <input
            v-model="game"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <option value="1">percent(%)</option>
            <!-- <option value="2">rupiah(Rp)</option> -->
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">3</td>
        <td class="text-center">E-Wallet</td>
        <td class="p-1">
          <input
            v-model="ewallet"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <!-- <option value="1">percent(%)</option> -->
            <option value="2">rupiah(Rp)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">4</td>
        <td class="text-center">Voucher</td>
        <td class="p-1">
          <input
            v-model="voucher"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <!-- <option value="1">percent(%)</option> -->
            <option value="2">rupiah(Rp)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">5</td>
        <td class="text-center">PLN</td>
        <td class="p-1">
          <input
            v-model="pln"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <!-- <option value="1">percent(%)</option> -->
            <option value="2">rupiah(Rp)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">6</td>
        <td class="text-center">Paket Data</td>
        <td class="p-1">
          <input
            v-model="paket_data"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <!-- <option value="1">percent(%)</option> -->
            <option value="2">rupiah(Rp)</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="text-center">7</td>
        <td class="text-center">Social Media</td>
        <td class="p-1">
          <input
            v-model="social_media"
            class="w-full p-1 my-1 rounded-md"
            type="number"
            placeholder="Masukkan Nilai..."
          />
        </td>
        <td class="mr-1">
          <select class="w-[95%] p-1 rounded-md" name="type" id="type">
            <option value="1">percent(%)</option>
            <!-- <option value="2">rupiah(Rp)</option> -->
          </select>
        </td>
      </tr>
    </table>
    <div>
      <input
        class="p-3 mr-2 font-bold text-white bg-red-500 rounded-lg"
        type="button"
        id="cancel"
        value="Batal"
        @click="cancel"
      />
      <input
        class="p-3 font-bold text-white bg-blue-500 rounded-lg"
        type="button"
        id="submit"
        value="Simpan"
        @click="updateMargin"
      />
    </div>
  </div>
</template>
