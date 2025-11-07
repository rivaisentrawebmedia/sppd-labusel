import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiBepergian({
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
					Informasi Bepergian
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="tempat_tujuan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat tujuan"
						placeholder="Masukkan tempat tujuan"
					/>
					<TextInput
						form={form}
						name="maksud_tujuan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Maksud tujuan"
						placeholder="Masukkan maksud tujuan"
					/>
					<TextInput
						form={form}
						name="lama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Lama"
						placeholder="Masukkan lama bepergian"
						isNumber
					/>
					<TextInput
						form={form}
						name="satuan_lama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Satuan Lama"
						placeholder="Masukkan satuan lama"
					/>
					<TextInput
						form={form}
						name="tanggal_keberangkatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Keberangkatan"
						type="date"
					/>
					<TextInput
						form={form}
						name="jumlah_pengikut"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jumlah Pengikut"
						placeholder="Masukkan jumlah pengikut"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
