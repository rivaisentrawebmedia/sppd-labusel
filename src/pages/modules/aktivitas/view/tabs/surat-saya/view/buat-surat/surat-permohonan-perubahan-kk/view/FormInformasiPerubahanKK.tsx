import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiPerubahanKK({
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
					Informasi Kartu Keluarga
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextInput
						form={form}
						name="no_kk"
						isDisabled={disabled}
						isRow
						isRequired
						label="Nomor Kartu Keluarga"
						placeholder="Masukkan nomor kk"
						isNumber
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextAreaInput
						form={form}
						name="alasan_permohonan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Alasan Permohonan"
						placeholder="Masukkan alasan permohonan"
					/>
				</div>
			</div>
		</>
	);
}
