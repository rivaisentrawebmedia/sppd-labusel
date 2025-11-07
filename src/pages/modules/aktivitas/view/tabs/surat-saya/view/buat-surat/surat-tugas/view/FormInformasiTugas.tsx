import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiTugas({
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
					Informasi Tugas
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="ditugaskan_untuk"
						isDisabled={disabled}
						isRequired
						isRow
						label="Ditugaskan Untuk"
						placeholder="Ditugaskan untuk"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="deskripsi"
						isDisabled={disabled}
						isRequired
						isRow
						label="Deskripsi"
						placeholder="Masukkan deskripsi"
					/>
				</div>
			</div>
		</>
	);
}
