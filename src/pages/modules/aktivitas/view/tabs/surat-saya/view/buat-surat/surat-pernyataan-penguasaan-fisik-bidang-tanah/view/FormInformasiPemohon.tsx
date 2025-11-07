import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetAnggotaKK } from "../../../../controller";
import dayjs from "dayjs";

export function FormInformasiPemohon({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const isWarga = form.watch("is_pemohon_warga_desa") === true;

	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pemohon
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<RadioInput
						form={form}
						name="is_pemohon_warga_desa"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pemohon warga desa"
						data={[
							{ label: "Warga Desa", value: true },
							{ label: "Pendatang", value: false },
						]}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					{isWarga ? (
						<SelectInput
							form={form}
							name="nik_pemohon"
							isDisabled={disabled || loadingKK}
							isRequired
							isRow
							label="NIK"
							placeholder="Masukkan NIK"
							data={
								anggotaKK?.map((item) => {
									return {
										label: `${item?.nik} - ${item?.nama_warga}`,
										value: item?.nik,
									};
								}) || []
							}
							onChange={(e) => {
								const selected = anggotaKK?.find((item) => item?.nik === e);
								form.setValue("nama_pemohon", selected?.nama_warga || "");
								form.setValue(
									"tempat_lahir_pemohon",
									selected?.tempat_lahir || ""
								);
								form.setValue(
									"tanggal_lahir_pemohon",
									selected?.tanggal_lahir
										? dayjs(selected?.tanggal_lahir)
												.locale("id")
												.format("YYYY-MM-DD")
										: ""
								);
								form.setValue("pekerjaan", selected?.pekerjaan || "");
								form.setValue("alamat", selected?.alamat || "");
							}}
						/>
					) : (
						<TextInput
							form={form}
							name="nik_pemohon"
							isDisabled={disabled}
							isRequired
							isRow
							label="NIK"
							placeholder="Masukkan NIK"
							isNumber
						/>
					)}
					<TextInput
						form={form}
						name="nama_pemohon"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>

					<TextInput
						form={form}
						name="tempat_lahir_pemohon"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan Tempat Lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_pemohon"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<TextInput
						form={form}
						name="pekerjaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan pekerjaan"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat"
						placeholder="Masukkan alamat"
					/>
				</div>
			</div>
		</>
	);
}
