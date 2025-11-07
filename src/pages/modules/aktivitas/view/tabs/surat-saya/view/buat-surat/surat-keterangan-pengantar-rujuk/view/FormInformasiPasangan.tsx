import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetAgama } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiPasangan({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { agama, loading: loadingAgama } = useGetAgama();
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pasangan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan Tempat Lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<TextInput
						form={form}
						name="pekerjaan_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Pilih Pekerjaan"
					/>
					<SelectInput
						form={form}
						name="agama_id_pasangan"
						isDisabled={disabled || loadingAgama}
						isRequired
						isRow
						label="Agama"
						placeholder="Pilih Agama"
						data={
							agama?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
					/>

					<SelectInput
						form={form}
						name="kewarganegaraan_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kewarganegaraan"
						placeholder="Pilih kewarganegaraan"
						data={["WNI", "WNA", "Ganda"]?.map((item) => {
							return {
								label: item,
								value: convertToSnakeCase(item),
							};
						})}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat"
						placeholder="Masukkan alamat"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_ayah_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK Ayah"
						placeholder="Masukkan nik ayah"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ayah_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Ayah"
						placeholder="Masukkan nama ayah"
					/>
				</div>
			</div>
		</>
	);
}
