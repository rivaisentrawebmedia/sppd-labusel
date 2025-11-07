import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiPerizinan({
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
					Informasi Perizinan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="negara_tujuan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Negara Tujuan"
						placeholder="Masukkan negara tujuan"
					/>
					<TextInput
						form={form}
						name="nama_perusahaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama PPTKIS"
						placeholder="Masukkan nama"
					/>
					<TextInput
						form={form}
						name="status_pekerjaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Status Pekerjaan"
						placeholder="Masukkan status pekerjaan"
					/>
					<TextInput
						form={form}
						name="masa_kontrak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Masa Kontrak"
						placeholder="Masukkan masa kontrak (tahun)"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
