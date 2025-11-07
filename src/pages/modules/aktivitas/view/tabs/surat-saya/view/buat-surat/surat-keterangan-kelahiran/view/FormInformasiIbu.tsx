import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiIbu({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<SuratPayload>;
}) {
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Ibu
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextInput
						form={form}
						name="nik_ibu"
						label="NIK"
						placeholder="Masukkan NIK"
						isDisabled={disabled}
						isRequired
						isRow
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ibu"
						label="Nama"
						placeholder="Masukkan Nama"
						isDisabled={disabled}
						isRequired
						isRow
					/>
					<TextInput
						form={form}
						name="tempat_lahir_ibu"
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
						isDisabled={disabled}
						isRequired
						isRow
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_ibu"
						label="Tanggal Lahir"
						isDisabled={disabled}
						isRequired
						isRow
						type="date"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextAreaInput
						form={form}
						name="alamat_ibu"
						label="Alamat"
						placeholder="Masukkan Alamat"
						isDisabled={disabled}
						isRequired
						isRow
					/>
				</div>
			</div>
		</>
	);
}
