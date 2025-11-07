import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";

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
						name="nik_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>

					<TextInput
						form={form}
						name="nama_sekolah_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Sekolah"
						placeholder="Masukkan nama sekolah"
					/>
					<TextInput
						form={form}
						name="kelas_anak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kelas"
						placeholder="Masukkan Kelas"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
