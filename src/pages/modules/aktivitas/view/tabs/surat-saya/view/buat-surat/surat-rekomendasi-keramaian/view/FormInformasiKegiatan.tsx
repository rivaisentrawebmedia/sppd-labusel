import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiKegiatan({
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
					Informasi Kegiatan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_acara"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Acara"
						placeholder="Masukkan nama acara"
					/>
					<TextInput
						form={form}
						name="tempat_acara"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Acara"
						placeholder="Masukkan tempat acara"
					/>
					<TextInput
						form={form}
						name="penanggung_jawab"
						isDisabled={disabled}
						isRequired
						isRow
						label="Penanggung Jawab"
						placeholder="Masukkan penanggung jawab"
					/>

					<TextInput
						form={form}
						name="tanggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Acara"
						type="date"
					/>
					<TextInput
						form={form}
						name="dimulai"
						isDisabled={disabled}
						isRequired
						isRow
						label="Dimulai"
						type="time"
					/>
					<TextInput
						form={form}
						name="selesai"
						isDisabled={disabled}
						isRequired
						isRow
						label="Selesai"
						type="time"
					/>
					<TextInput
						form={form}
						name="kontak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kontak"
						placeholder="Masukkan kontak"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
