import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiKelahiran({
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
					Informasi Kelahiran
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="tanggal_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Meninggal"
						type="date"
					/>
					<TextInput
						form={form}
						name="lama_dikandung"
						isDisabled={disabled}
						isRequired
						isRow
						label="Lama Dikandung (bulan)"
						placeholder="Masukkan lama dikandung"
						isNumber
					/>
					<TextInput
						form={form}
						name="tempat_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Meninggal"
						placeholder="Masukkan tempat meninggal"
					/>
				</div>
			</div>
		</>
	);
}
