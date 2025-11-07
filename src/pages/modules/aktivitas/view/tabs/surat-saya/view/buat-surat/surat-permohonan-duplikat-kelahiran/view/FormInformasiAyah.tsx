import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiAyah({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Ayah
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>
					<TextInput
						form={form}
						name="pekerjaan_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan Pekerjaan"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_ayah"
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
