import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiAnak({
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
					Informasi Anak
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Anak"
						placeholder="Masukkan nama anak"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat lahir Anak"
						placeholder="Masukkan "
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir Anak"
						type="date"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat Anak"
						placeholder="Masukkan alamat anak"
					/>
				</div>
			</div>
		</>
	);
}
