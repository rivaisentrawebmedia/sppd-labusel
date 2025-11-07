import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import { useGetAgama } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiAnak({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { agama, loading } = useGetAgama();
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Anak
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan nik"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>
					<SelectInput
						form={form}
						name="agama_id_anak"
						isDisabled={disabled || loading}
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
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_anak"
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
