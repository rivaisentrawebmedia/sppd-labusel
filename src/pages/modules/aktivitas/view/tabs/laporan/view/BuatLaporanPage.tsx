import BackLabel from "@/components/common/label/BackLabel";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { DetailPelapor, FormLaporan } from "./components";
import { useGetProfil } from "@/pages/modules/profil/controller";
import { LoadingMona } from "@/components/ui/loading";
import { usePostLaporan } from "../controller";
import { DialogCustom } from "@/components/common/dialog";
import { Form } from "@/components/ui/form";
import { FaSave, FaTrashRestore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePathname } from "@/utils/usePathname";

export function BuatLaporanPage() {
	const navigate = useNavigate();

	const { thirdPathname } = usePathname();
	const isLaporPemdes = thirdPathname === "lapor-pemdes";

	const { data, loading } = useGetProfil();
	const {
		form,
		handleSave,
		isShow,
		loading: disabled,
		setIsShow,
	} = usePostLaporan();

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};
	return (
		<>
			<div className="flex flex-col gap-4">
				{isLaporPemdes ? (
					<Breadcrumbs
						items={[
							{
								label: "Beranda",
								to: "/modules/dashboard",
							},
							{
								label: "Lapor Pemdes",
								to: "/modules/layanan/lapor-pemdes",
							},

							{
								label: "Buat Laporan",
								to: "",
							},
						]}
					/>
				) : (
					<Breadcrumbs
						items={[
							{
								label: "Beranda",
								to: "/modules/dashboard",
							},
							{
								label: "Aktivitas",
								to: "/modules/aktivitas",
							},
							{
								label: "Laporan",
								to: `/modules/aktivitas/laporan`,
							},
							{
								label: "Buat Laporan",
								to: "",
							},
						]}
					/>
				)}
				<div className="flex flex-col gap-4">
					<BackLabel label="Buat Laporan" />
					{loading ? (
						<LoadingMona />
					) : (
						<>
							<DetailPelapor
								alamat={data?.alamat || "-"}
								nama={data?.nama_warga || "-"}
								no_telp={data?.no_telp || "-"}
								photo={data?.photo || "-"}
								isBuat
							/>
							<Form {...form}>
								<form
									className="flex flex-col gap-4  bg-white rounded-md p-4"
									style={{
										boxShadow: "0px 4px 4px 0px #0000000A",
									}}
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormLaporan disabled={disabled} form={form} />
									<div className="flex items-center justify-end gap-3">
										<button
											type="button"
											onClick={() => {
												navigate(-1);
											}}
											className="flex items-center gap-2 justify-center w-full md:w-fit cursor-pointer py-1.5 px-4 rounded-md bg-[#d2000c] hover:bg-[#d2000c]/80 duration-300 transition-colors text-white"
										>
											<FaTrashRestore /> Batal
										</button>
										<button
											type="submit"
											onClick={async () => {
												const isValid = await form.trigger();
												if (!isValid) {
													const invalidFields = Object.entries(
														form.formState.errors
													).map(([field, error]) => ({
														field,
														error: error?.message,
													}));
													return toast.error(
														invalidFields?.[0]?.error?.toString()
													);
												}
											}}
											className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
										>
											<FaSave /> Simpan Perubahan
										</button>
									</div>
								</form>
							</Form>
						</>
					)}
				</div>
			</div>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Penyimpanan Laporan
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan laporan ini? Pastikan seluruh data
						sudah benar sebelum melanjutkan.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						<div className="flex items-center justify-end gap-3">
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
								Simpan Laporan
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
