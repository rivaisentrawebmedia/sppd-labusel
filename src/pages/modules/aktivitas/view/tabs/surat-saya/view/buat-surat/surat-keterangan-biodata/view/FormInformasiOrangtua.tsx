import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiOrangTua({
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
					Informasi Orang Tua
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK Ayah"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Ayah"
						placeholder="Masukkan nama ayah"
					/>
					<TextInput
						form={form}
						name="nik_ibu"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK Ibu"
						placeholder="Masukkan nik ibu"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ibu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Ibu"
						placeholder="Masukkan nama ibu"
					/>
				</div>
			</div>
		</>
	);
}
