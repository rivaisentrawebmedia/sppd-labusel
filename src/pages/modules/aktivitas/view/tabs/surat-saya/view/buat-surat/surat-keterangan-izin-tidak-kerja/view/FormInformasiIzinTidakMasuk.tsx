import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiIzinTidakMasuk({
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
					Informasi Izin Tidak Masuk Kerja
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_perusahaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Perusahaan"
						placeholder="Masukkan nama perusahaan"
					/>

					<TextInput
						form={form}
						name="jabatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jabatan"
						placeholder="Masukkan nama jabatan"
					/>

					<TextInput
						form={form}
						name="lama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Lama"
						placeholder="Masukkan lama"
						isNumber
					/>

					<TextInput
						form={form}
						name="terhitung_dari"
						isDisabled={disabled}
						isRequired
						isRow
						label="Terhitung Dari"
						type="date"
					/>

					<TextAreaInput
						form={form}
						name="alasan_izin"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alasan Izin"
						placeholder="Masukkan alasan"
					/>
				</div>
			</div>
		</>
	);
}
