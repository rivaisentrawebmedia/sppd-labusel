import BackLabel from "@/components/common/label/BackLabel";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useSearchParams } from "react-router-dom";
import {
	DetailPembayaran,
	DetailPembayaranBelanja,
	DetailPengiriman,
	DetailProduk,
	DetailTransaksi,
	DetailTransaksiBelanja,
} from "./components";
import { useGetPesananByID, usePostPesanan } from "../controller";
import { LoadingMona } from "@/components/ui/loading";
import clsx from "clsx";
import { DialogCustom } from "@/components/common/dialog";
import { convertFromSnakeCase } from "@/utils/helpers";
import { Form } from "@/components/ui/form";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function DetailPesananSayaPage() {
	const [searchParams] = useSearchParams();
	const { detail, loading } = useGetPesananByID();
	const isBelanja = detail?.jenis === "Belanja";
	const isTopup = detail?.jenis === "Topup dan Tagihan";
	const status = detail?.status;

	const {
		form,
		handleSave,
		isShow,
		loading: loadingPesanan,
		setIsShow,
	} = usePostPesanan();

	const disabled = loadingPesanan;
	const values = form.watch();
	const isBatal = values?.jenis === "batal";
	const isPesanUlang = values?.jenis === "pesan-ulang";
	const isUlasan = values?.jenis === "ulasan";
	const isLacak = values?.jenis === "lacak";

	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{ label: "Beranda", to: "/modules/dashboard" },
						{ label: "Aktivitas", to: "/modules/aktivitas" },
						{
							label: "Pesanan Saya",
							to: `/modules/aktivitas/pesanan-saya?${searchParams?.toString()}`,
						},
						{ label: "Detail", to: "" },
					]}
				/>

				{loading ? (
					<LoadingMona />
				) : (
					<>
						{isBelanja ? (
							<>
								<div className="flex items-center justify-between gap-4">
									<BackLabel label="Detail Pesanan" />
									<button
										type="button"
										disabled={loadingPesanan}
										onClick={() => {
											const isBatalkan =
												status === "Diproses" ||
												status === "Menunggu Konfirmasi";
											const isLacak = status === "Dikirim";
											const isUlasan = status === "Selesai";
											const isPesanUlang = status === "Ditolak";

											if (isBatalkan) form.setValue("jenis", "batal");
											if (isLacak) form.setValue("jenis", "lacak");
											if (isUlasan) form.setValue("jenis", "ulasan");
											if (isPesanUlang) form.setValue("jenis", "pesan-ulang");
											setIsShow(true);
										}}
										className={clsx(
											"py-1.5 px-4 border rounded-md text-sm bg-white",
											{
												"text-[#CD2738] border-[#CD2738]":
													status === "Menunggu Konfirmasi" ||
													status === "Diproses",
												"text-[#272CCD] border-[#272CCD]": !(
													status === "Menunggu Konfirmasi" ||
													status === "Diproses"
												),
											}
										)}
									>
										{status === "Diproses" || status === "Menunggu Konfirmasi"
											? "Batalkan Pesanan"
											: status === "Dikirim"
											? "Lacak Pesanan"
											: status === "Selesai"
											? "Beri Ulasan"
											: status === "Ditolak"
											? "Pesan Ulang"
											: ""}
									</button>
								</div>
								<DetailTransaksiBelanja data={detail} />
								<DetailProduk data={detail} />
								<DetailPengiriman data={detail} />
								<DetailPembayaranBelanja data={detail} />
							</>
						) : isTopup ? (
							<>
								<div className="flex items-center justify-between gap-4">
									<BackLabel label="Detail Pesanan" />
								</div>
								<DetailTransaksi data={detail} />
								<DetailProduk data={detail} />
								<DetailPembayaran data={detail} />
							</>
						) : (
							<p className="text-[#888] italic">
								Jenis produk belum didefinisikan
							</p>
						)}
					</>
				)}
			</div>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						{convertFromSnakeCase(form.watch("jenis") || "")}
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						{isBatal
							? "Apakah Anda yakin ingin membatalkan pesanan ini? Proses tidak dapat dibatalkan setelah dikonfirmasi."
							: isPesanUlang
							? "Anda akan memesan ulang produk ini. Pastikan stok masih tersedia."
							: isLacak
							? "Lacak status pengiriman pesanan Anda secara real-time."
							: isUlasan
							? "Beri ulasan jujur Anda terhadap produk yang telah diterima."
							: "Apakah Anda yakin ingin menyimpan pesanan ini? Pastikan seluruh data sudah benar sebelum melanjutkan."}
					</p>
				}
			>
				<div className="flex flex-col gap-4 w-full mt-2">
					<Form {...form}>
						<form className="flex flex-col gap-3">
							{isUlasan && (
								<TextAreaInput
									form={form}
									name="ulasan"
									label="Ulasan Anda"
									isDisabled={disabled}
									placeholder="Tulis ulasan Anda di sini..."
								/>
							)}
							<div className="flex items-center justify-end">
								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={() => setIsShow(false)}
										disabled={disabled}
										className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
									>
										Batal
									</button>
									<button
										type="button"
										onClick={() => handleSave()}
										disabled={disabled}
										className="py-1.5 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium transition disabled:opacity-50"
									>
										Simpan
									</button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</DialogCustom>
		</>
	);
}
