import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormPenerimaKuasa({
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
					Informasi Penerima Kuasa
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_penerima"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>

					<TextInput
						form={form}
						name="nama_penerima"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>

					<TextInput
						form={form}
						name="jabatan_penerima"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jabatan"
						placeholder="Masukkan jabatan"
					/>
				</div>
			</div>
		</>
	);
}
