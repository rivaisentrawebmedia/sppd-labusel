import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormPindahDomisili({
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
					Informasi Kepindahan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="jumlah_anggota"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jumlah Anggota"
						placeholder="Masukkan jumlah anggota"
						isNumber
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_pindah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat Pindah"
						placeholder="Masukkan alamat pindah"
					/>
					<TextAreaInput
						form={form}
						name="alasan_pindah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alasan Pindah"
						placeholder="Masukkan alasan pindah"
					/>
				</div>
			</div>
		</>
	);
}
