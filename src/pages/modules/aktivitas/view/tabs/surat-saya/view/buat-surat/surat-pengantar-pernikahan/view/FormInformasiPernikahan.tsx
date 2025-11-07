import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiPernikahan({
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
					Informasi Pernikahan
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="tanggal"
						isDisabled={disabled}
						isRow
						isRequired
						label="Tanggal Melapor"
						type="date"
					/>
					<TextInput
						form={form}
						name="jam"
						isDisabled={disabled}
						isRow
						isRequired
						label="Jam"
						type="time"
					/>

					<TextAreaInput
						form={form}
						name="tempat"
						isDisabled={disabled}
						isRow
						isRequired
						label="Tempat"
						placeholder="Masukkan tempat"
					/>
				</div>
			</div>
		</>
	);
}
