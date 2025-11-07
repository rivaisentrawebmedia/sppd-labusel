import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import type { UseFormReturn } from "react-hook-form";

export function FormInformasiTambahan({
	disabled,
	form,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	return (
		<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
			<p className="font-light uppercase text-primary underline underline-offset-4">
				Informasi Pelengkap
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
				<TextAreaInput
					form={form}
					name="keperluan"
					label="Keperluan"
					placeholder="Masukkan keperluan"
					isDisabled={disabled}
					isRequired
					isRow
				/>
			</div>
		</div>
	);
}
