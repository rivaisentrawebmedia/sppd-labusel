import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

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
						name="nama_pasangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Pasangan"
						placeholder="Masukkan nama pasangan"
					/>
					<TextInput
						form={form}
						name="tanggal_nikah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Nikah"
						type="date"
					/>
					<TextInput
						form={form}
						name="kecamatan_kua"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kecamatan KUA"
						placeholder="Masukkan kecamatan kua"
					/>
				</div>
			</div>
		</>
	);
}
