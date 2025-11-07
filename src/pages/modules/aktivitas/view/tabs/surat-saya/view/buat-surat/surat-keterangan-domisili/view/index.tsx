import { DialogCustom } from "@/components/common/dialog";
import { usePostSurat } from "../controller";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashRestore } from "react-icons/fa";
import { toast } from "react-toastify";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import { FormIdentitasWarga } from "../../FormIdentitasWarga";
import SelectInput from "@/components/common/select/SelectBaseForm";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { FormInformasiTambahan } from "../../FormInformasiTambahan";

export function FormSuratKeteranganDomisili() {
	const navigate = useNavigate();
	const { form, handleSave, isShow, loading, setIsShow, data } = usePostSurat();

	const disabled = loading;

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	const isPendatang = form.watch("warga_desa") === false;

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4  border shadow  bg-white rounded-md p-4 md:gap-8">
						<RadioInput
							data={[
								{
									label: "Warga Desa",
									value: true,
								},
								{
									label: "Pendatang",
									value: false,
								},
							]}
							form={form}
							name="warga_desa"
							isDisabled={disabled}
							isRequired
							isRow
							label="Warga Desa"
						/>
					</div>
					{data && (
						<FormIdentitasWarga
							disabled={disabled}
							form={form}
							isNik
							isNama
							isTempatLahir
							isTanggalLahir
							isAlamat
							isJenisKelamin
							isPekerjaan
							isAgama
							data={data}
							isWarga={!isPendatang}
							isPekerjaanTextField
						/>
					)}
					{isPendatang && (
						<div className="flex flex-col gap-4">
							<p className="font-light uppercase">Informasi Pendatang</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
								<SelectInput
									data={[
										{
											label: "WNI",
											value: "wni",
										},
										{
											label: "WNA",
											value: "wna",
										},
										{
											label: "GANDA",
											value: "ganda",
										},
									]}
									form={form}
									name="kewarganegaraan"
									label="Kewarganegaraan"
									placeholder="Pilih Kewarganegaraan"
									isDisabled={disabled}
									isRequired
									isRow
								/>
								<TextInput
									form={form}
									name="jumlah_pengikut"
									label="Jumlah Pengikut"
									placeholder="Masukkan jumlah pengikut"
									isDisabled={disabled}
									isRequired
									isRow
									isNumber
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
								<TextAreaInput
									form={form}
									name="alamat_identitas"
									label="Alamat sekarang"
									placeholder="Masukkan Alamat sekarang"
									isDisabled={disabled}
									isRequired
									isRow
								/>
							</div>
						</div>
					)}
					<FormInformasiTambahan disabled={disabled} form={form} />

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
						Konfirmasi Buat Surat
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan surat ini? Pastikan seluruh data
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
								Simpan Surat
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
