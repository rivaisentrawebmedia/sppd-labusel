import { Form } from "@/components/ui/form";
import { usePostBukuTamu } from "../../../controller";
import { AmbilPhoto, DataKunjungan, InformasiPengunjung } from "./components";
import { DialogCustom } from "@/components/common/dialog";
import { FaSave, FaTrashRestore } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IsiBukuTamuPage() {
	const navigate = useNavigate();

	const { form, handleSave, isShow, loading, setIsShow, bowo } =
		usePostBukuTamu();
	const disabled = loading;

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};
	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-6 bg-white rounded-md p-4 shadow"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<InformasiPengunjung form={form} disabled={disabled} bowo={bowo} />
					<DataKunjungan form={form} disabled={disabled} bowo={bowo} />
					<AmbilPhoto form={form} disabled={disabled} />

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
									return toast.error(invalidFields?.[0]?.error?.toString());
								}
							}}
							className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
						>
							<FaSave /> Simpan Perubahan
						</button>
					</div>
				</form>
			</Form>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Buat Buku Tamu
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan buku tamu ini? Pastikan seluruh
						data sudah benar sebelum melanjutkan.
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
								Simpan
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
