import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import { useGetReferensi } from "@/layouts/constroller";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import RadioInput from "@/components/common/form-input/RadioInput";

export function FormInformasiSaksi1({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingAgama, referensi: agama } = useGetReferensi({
		jenis: "agama",
	});

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Saksi 1
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
						name="is_saksi1_warga_desa"
						isDisabled={disabled}
						isRequired
						isRow
						label="Warga Desa"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_saksi1"
						isDisabled={disabled}
						isRow
						label="NIK"
						isNumber
						placeholder="Masukkan NIK"
					/>
					<TextInput
						form={form}
						name="nama_saksi1"
						isRow
						isDisabled={disabled}
						label="Nama Lengkap"
						placeholder="Masukkan nama lengkap"
					/>
					<TextInput
						form={form}
						name="nama_ayah_saksi1"
						isRow
						isDisabled={disabled}
						label="Nama Ayah"
						placeholder="Masukkan nama lengkap"
					/>

					<TextInput
						form={form}
						name="tempat_lahir_saksi1"
						isRow
						isDisabled={disabled}
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_saksi1"
						type="date"
						isRow
						isDisabled={disabled}
						label="Tanggal Lahir"
					/>
					<SelectInput
						form={form}
						name="kewarganegaraan_saksi1"
						isDisabled={disabled}
						isRow
						label="Kewarganegaraan"
						placeholder="Pilih Kewarganegaraan"
						data={
							["WNI", "WNA", "Ganda"]?.map((item) => ({
								label: item,
								value: convertToSnakeCase(item),
							})) || []
						}
					/>
					<SelectInput
						form={form}
						name="agama_saksi1_id"
						isDisabled={disabled || loadingAgama}
						label="Agama"
						isRow
						placeholder="Pilih agama"
						data={agama?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
					<TextInput
						form={form}
						name="pekerjaan_saksi1"
						isDisabled={disabled}
						label="Pekerjaan"
						isRow
						placeholder="Masukkan pekerjaan"
					/>

					<TextInput
						form={form}
						name="nama_organisasi_saksi1"
						isDisabled={disabled}
						isRow
						label="Nama Organisasi"
						placeholder="Masukkan nama organisasi"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_saksi1"
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
