import { root } from "./root";
import { homePage } from "./root/home";
import { blogPage } from "./root/blog";
import { mlCalculatorPage } from "./root/calculatorML";
import { priceListPage } from "./root/daftarHarga";
import { profilePage } from "./root/profile";
import { historyPage } from "./root/riwayat";
import { ewalletPage } from "./root/home/e-wallet"
import { voucherPage } from "./root/home/voucher"
import { tagihanPage } from "./root/home/tagihan"
import { socialMediaPage } from "./root/home/social-media"
import { pulsaPage } from "./root/home/pulsa"
import { paketDataPage } from "./root/home/paket-data"
import { gamesPage } from "./root/home/games"

export const routes = root.concat(
  homePage,
  blogPage,
  mlCalculatorPage,
  priceListPage,
  profilePage,
  historyPage,
  ewalletPage,
  voucherPage,
  tagihanPage,
  socialMediaPage,
  pulsaPage,
  paketDataPage,
  gamesPage
);
