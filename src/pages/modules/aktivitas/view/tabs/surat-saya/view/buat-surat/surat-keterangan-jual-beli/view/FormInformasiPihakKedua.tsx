import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";

export function FormInformasiPihakKedua({
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
					Informasi Pihak Kedua
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<TextInput
						form={form}
						name="pekerjaan_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan Pekerjaan"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="alamat_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat"
						placeholder="Masukkan alamat"
					/>
				</div>
			</div>
		</>
	);
}
