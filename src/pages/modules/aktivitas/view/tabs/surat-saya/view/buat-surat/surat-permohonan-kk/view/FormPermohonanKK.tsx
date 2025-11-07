import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormPermohonanKK({
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
					Informasi Kartu Keluarga
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="no_kk"
						isDisabled={disabled}
						isRequired
						isRow
						label="No KK"
						placeholder="Masukkan No KK"
						isNumber
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alasan_permohonan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alasan Permohonan"
						placeholder="Masukkan Alasan Permohonan"
					/>
				</div>
			</div>
		</>
	);
}
