import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiBatasTanah({
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
					Informasi Batas Tanah
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="batas_utara"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Utara"
						placeholder="Masukkan Batas Utara"
					/>
					<TextInput
						form={form}
						name="batas_timur"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Timur"
						placeholder="Masukkan Batas Timur"
					/>
					<TextInput
						form={form}
						name="batas_selatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Selatan"
						placeholder="Masukkan Batas Selatan"
					/>
					<TextInput
						form={form}
						name="batas_barat"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Barat"
						placeholder="Masukkan Batas Barat"
					/>
				</div>
			</div>
		</>
	);
}
