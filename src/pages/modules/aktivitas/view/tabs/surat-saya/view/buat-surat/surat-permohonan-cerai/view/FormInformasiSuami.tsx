import type { UseFormReturn } from "react-hook-form";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { useGetAnggotaKK } from "../../../../controller";
import { useGetAgama } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import dayjs from "dayjs";
import type { SuratPayload } from "../model";

export function FormInformasiSuami({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();
	const { agama, loading: loadingAgama } = useGetAgama();

	const nik = form.watch("nik_suami");

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Suami
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<SelectInput
						form={form}
						name="nik_suami"
						isDisabled={disabled || loadingKK}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						data={anggotaKK?.map((item) => {
							return {
								label: `${item?.nik} - ${item?.nama_warga}`,
								value: item?.nik,
							};
						})}
						onChange={(e) => {
							const selected = anggotaKK?.find((item) => item?.nik === e);

							form.setValue("nama_suami", selected?.nama_warga || "");
							form.setValue("nik_suami", selected?.nik || "");
							form.setValue("tempat_lahir_suami", selected?.tempat_lahir || "");
							form.setValue(
								"tanggal_lahir_suami",
								selected?.tanggal_lahir
									? dayjs(selected?.tanggal_lahir)
											.locale("id")
											.format("YYYY-MM-DD")
									: ""
							);
							form.setValue("agama_id_suami", selected?.agama_id || "");
							form.setValue("pekerjaan_suami", selected?.pekerjaan || "");
							form.setValue("alamat_suami", selected?.alamat || "");
						}}
					/>

					<TextInput
						key={`nama_suami-${nik}`}
						form={form}
						name="nama_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>
					<TextInput
						key={`tempat_lahir_suami-${nik}`}
						form={form}
						name="tempat_lahir_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						key={`tanggal_lahir_suami-${nik}`}
						form={form}
						name="tanggal_lahir_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<SelectInput
						key={`agama_id_suami-${nik}`}
						form={form}
						name="agama_id_suami"
						isDisabled={disabled || loadingAgama}
						isRequired
						isRow
						label="Agama"
						placeholder="Pilih Agama "
						data={
							agama?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
					/>
					<TextInput
						key={`pekerjaan_suami-${nik}`}
						form={form}
						name="pekerjaan_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan Suami"
						placeholder="Pilih Pekerjaan"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						key={`alamat_suami-${nik}`}
						name="alamat_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat"
						placeholder="Masukkan Alamat"
					/>
				</div>
			</div>
		</>
	);
}
