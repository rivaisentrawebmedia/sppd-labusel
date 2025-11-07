import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiUsaha({
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
					Informasi Usaha
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="peruntukan_bangunan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Peruntukan bangunan"
						placeholder="Masukkan peruntukan bangunan"
					/>
					<TextInput
						form={form}
						name="luas_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Luas Tanah (m2)"
						placeholder="Masukkan luas tanah"
						isNumber
					/>
					<TextInput
						form={form}
						name="luas_bangunan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Luas Bangunan (m2)"
						placeholder="Masukkan luas bangunan"
						isNumber
					/>
					<TextInput
						form={form}
						name="npwp"
						isDisabled={disabled}
						isRequired
						isRow
						label="NPWP"
						placeholder="Masukkan NPWP"
					/>
				</div>
			</div>
		</>
	);
}
