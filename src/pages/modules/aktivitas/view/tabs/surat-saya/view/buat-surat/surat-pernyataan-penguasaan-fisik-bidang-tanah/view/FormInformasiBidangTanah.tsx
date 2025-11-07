import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiBidangTanah({
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
					Informasi Bidang Tanah
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="jalan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jalan"
						placeholder="Masukkan jalan"
					/>
					<TextInput
						form={form}
						name="rt_rw"
						isDisabled={disabled}
						isRequired
						isRow
						label="RT/RW"
						placeholder="Masukkan RT/RW"
					/>
					<TextInput
						form={form}
						name="desa"
						isDisabled={disabled}
						isRequired
						isRow
						label="Desa/Kelurahan"
						placeholder="Masukkan desa/kelurahan"
					/>
					<TextInput
						form={form}
						name="kecamatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kecamatan"
						placeholder="Masukkan kecamatan"
					/>
					<TextInput
						form={form}
						name="kabupaten"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kabupaten/Kota"
						placeholder="Masukkan kabupaten/kota"
					/>
					<TextInput
						form={form}
						name="nib"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIB"
						placeholder="Masukkan NIB"
					/>
					<TextInput
						form={form}
						name="luas_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Luas Tanah (m2)"
						placeholder="Masukkan luas tanah"
						isNumber
					/>
					<TextInput
						form={form}
						name="status_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Status Tanah"
						placeholder="Masukkan status tanah"
					/>
					<TextInput
						form={form}
						name="dipergunakan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Dipergunakan"
						placeholder="Masukkan dipergunakan"
					/>
					<TextInput
						form={form}
						name="diperoleh_dari"
						isDisabled={disabled}
						isRequired
						isRow
						label="Diperoleh dari"
						placeholder="Masukkan diperoleh dari"
					/>
					<TextInput
						form={form}
						name="diperoleh_sejak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Diperoleh sejak tahun"
						placeholder="Masukkan diperoleh sejak tahun"
					/>
					<TextInput
						form={form}
						name="diperoleh_dengan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Diperoleh dengan jalan"
						placeholder="Masukkan diperoleh dengan jalan"
					/>
				</div>
			</div>
		</>
	);
}
