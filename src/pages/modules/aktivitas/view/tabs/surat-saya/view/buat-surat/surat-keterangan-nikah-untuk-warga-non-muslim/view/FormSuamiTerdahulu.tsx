import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import { useGetReferensi } from "@/layouts/constroller";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiSuamiTerdahulu({
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
					Informasi Suami Terdahulu
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_suami_terdahulu"
						isDisabled={disabled}
						isRow
						isNumber
						label="NIK"
						placeholder="Masukkan NIK"
					/>
					<TextInput
						form={form}
						name="nama_suami_terdahulu"
						isRow
						isDisabled={disabled}
						label="Nama Lengkap"
						placeholder="Masukkan nama lengkap"
					/>
					<TextInput
						form={form}
						name="nama_ayah_suami_terdahulu"
						isRow
						isDisabled={disabled}
						label="Nama Ayah"
						placeholder="Masukkan nama lengkap"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_suami_terdahulu"
						isRow
						isDisabled={disabled}
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_suami_terdahulu"
						type="date"
						isRow
						isDisabled={disabled}
						label="Tanggal Lahir"
					/>
					<SelectInput
						form={form}
						name="kewarganegaraan_suami_terdahulu"
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
						name="agama_suami_terdahulu_id"
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
						name="pekerjaan_suami_terdahulu"
						isDisabled={disabled}
						label="Pekerjaan"
						isRow
						placeholder="Masukkan pekerjaan"
					/>

					<TextInput
						form={form}
						name="tempat_meninggal_suami_terdahulu"
						isDisabled={disabled}
						isRow
						label="Tempat meninggal"
						placeholder="Masukkan tempat meninggal"
					/>
					<TextInput
						form={form}
						name="tanggal_meninggal_suami_terdahulu"
						isDisabled={disabled}
						isRow
						label="Tanggal Meninggal"
						type="date"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_suami_terdahulu"
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
