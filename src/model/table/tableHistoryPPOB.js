import { createColumnHelper } from "@tanstack/vue-table";
// import { h } from "vue";

const columnHelper = createColumnHelper();

export const tableHistoryPPOB = () => {
  return [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => info.getValue(),
      header: "ID Pesanan",
    }),
    columnHelper.accessor((row) => row.customer_no, {
      id: "customer_no",
      cell: (info) => info.getValue(),
      header: "Tujuan",
    }),
    columnHelper.accessor((row) => row.price, {
      id: "price",
      cell: (info) => info.getValue(),
      header: "Harga",
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => info.getValue(),
      header: "Status",
    }),
    columnHelper.accessor((row) => row.sn, {
      id: "sn",
      cell: (info) => info.getValue(),
      header: "SN",
    }),
    columnHelper.accessor((row) => row.tanggal_order, {
      id: "tanggal_order",
      cell: (info) => info.getValue(),
      header: "Tanggal Order",
    }),
    columnHelper.accessor((row) => row.ref_id, {
      id: "ref_id",
      cell: (info) => info.getValue(),
      header: "Ref",
    }),
  ];
};
