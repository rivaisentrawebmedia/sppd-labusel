import { Form } from "@/components/ui/form";
import { usePostKuesioner } from "../../../controller";
import { DialogCustom } from "@/components/common/dialog";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { convertFromSnakeCase } from "@/utils/helpers";
import { FormKuantitatif } from "./FormKuantitatif";
import { FormKualitatif } from "./FormKualitatif";
import { LoadingMona } from "@/components/ui/loading";

export default function IsiKuesionerPage() {
	const navigate = useNavigate();

	const {
		data,
		form,
		handleSave,
		isShow,
		loading,
		setIsShow,
		buku_tamu_id,
		loadingKueioner,
		idx,
		setIdx,
	} = usePostKuesioner();
	const disabled = loading;

	const isData0 = idx === 0;

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const isPilihanGanda = data?.jenis_kuisioner?.toLowerCase() === "kuantitatif";
	return (
		<>
			{loadingKueioner ? (
				<LoadingMona />
			) : (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1 bg-white rounded-md p-4 shadow">
						<p className="text-[#888]">
							{convertFromSnakeCase(data?.jenis_kuisioner)}
						</p>
						<p className="font-medium text-[#272CCD] text-xl">{data?.judul}</p>
					</div>
					<Form {...form}>
						<form
							className="flex flex-col gap-4 bg-white rounded-md p-4 shadow"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							{isPilihanGanda ? (
								<FormKuantitatif
									form={form}
									isDisabled={disabled}
									data={data}
								/>
							) : (
								<FormKualitatif form={form} isDisabled={disabled} data={data} />
							)}
							<div className="flex md:items-center flex-col md:flex-row justify-end gap-3">
								{isData0 ? (
									<button
										type="button"
										onClick={() => {
											navigate(
												`/modules/layanan/buku-tamu/tambah?buku_tamu_id=${buku_tamu_id}`
											);
										}}
										className="flex items-center gap-2 justify-center w-full md:w-fit cursor-pointer py-1.5 px-4 rounded-md border border-[#272CCD] hover:bg-[#272CCD] hover:text-white text-[#272CCD] duration-300 transition-colors"
									>
										<FaArrowLeft /> Keperluan Kunjungan
									</button>
								) : (
									<button
										type="button"
										onClick={() => {
											setIdx(idx - 1);
										}}
										className="flex items-center gap-2 justify-center w-full md:w-fit cursor-pointer py-1.5 px-4 rounded-md border border-[#272CCD] hover:bg-[#272CCD] hover:text-white text-[#272CCD] duration-300 transition-colors"
									>
										<FaArrowLeft /> Sebelumnya
									</button>
								)}
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
									className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-[#272CCD] hover:bg-[#272CCD]/80 text-nowrap duration-300 transition-colors text-white"
								>
									<FaSave /> Simpan
								</button>
							</div>
						</form>
					</Form>
				</div>
			)}

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Isi Kuesioner
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan kuesioner ini? Pastikan seluruh
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
