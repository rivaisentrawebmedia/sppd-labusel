import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiPerkawinan({
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
					Informasi Perkawinan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="berlaku_mulai"
						isDisabled={disabled}
						isRequired
						isRow
						label="Berlaku mulai"
						type="date"
					/>
					<TextInput
						form={form}
						name="berlaku_sampai"
						isDisabled={disabled}
						isRequired
						isRow
						label="Berlaku Sampai"
						type="date"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="tujuan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tujuan"
						placeholder="Masukkan tujuan"
					/>
				</div>
			</div>
		</>
	);
}
