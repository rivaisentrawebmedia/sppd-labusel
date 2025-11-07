import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import { useGetReferensi } from "@/layouts/constroller";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiIbuSuami({
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
					Informasi Ibu Suami
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_ibu_suami"
						isDisabled={disabled}
						isRow
						isRequired
						isNumber
						label="NIK"
						placeholder="Masukkan NIK"
					/>
					<TextInput
						form={form}
						name="nama_ibu_suami"
						isRow
						isDisabled={disabled}
						isRequired
						label="Nama Lengkap"
						placeholder="Masukkan nama lengkap"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_ibu_suami"
						isRow
						isDisabled={disabled}
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_ibu_suami"
						type="date"
						isRow
						isDisabled={disabled}
						label="Tanggal Lahir"
					/>
					<SelectInput
						form={form}
						name="kewarganegaraan_ibu_suami"
						isDisabled={disabled}
						isRequired
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
						name="agama_ibu_suami_id"
						isDisabled={disabled || loadingAgama}
						label="Agama"
						isRow
						isRequired
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
						name="pekerjaan_ibu_suami"
						isDisabled={disabled}
						label="Pekerjaan"
						isRow
						isRequired
						placeholder="Masukkan pekerjaan"
					/>

					<TextInput
						form={form}
						name="telepon_ibu_suami"
						isDisabled={disabled}
						isRow
						isNumber
						isRequired
						label="Nomor Telepon"
						placeholder="Masukkan nomor telepon"
					/>
					<TextInput
						form={form}
						name="nama_organisasi_ibu_suami"
						isDisabled={disabled}
						isRow
						label="Nama Organisasi"
						placeholder="Masukkan nama organisasi (jika ada)"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_ibu_suami"
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
