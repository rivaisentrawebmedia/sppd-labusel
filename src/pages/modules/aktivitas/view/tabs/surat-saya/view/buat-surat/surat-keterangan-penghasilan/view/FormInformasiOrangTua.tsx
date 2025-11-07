import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetReferensi } from "@/layouts/constroller";
import RadioInput from "@/components/common/form-input/RadioInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import TextRupiahInput from "@/components/common/form-input/TextRupiahInput";

export function FormInformasiOrtu({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingPekerjaan, referensi: pekerjaan } = useGetReferensi({
		jenis: "pekerjaan",
	});

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Ortu
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="nama_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>
					<SelectInput
						data={
							pekerjaan?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
						form={form}
						name="pekerjaan_ortu"
						isDisabled={disabled || loadingPekerjaan}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan pekerjaan"
					/>
					<TextRupiahInput
						form={form}
						name="penghasilan_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Penghasilan"
					/>
					<TextInput
						form={form}
						name="tanggungan_ortu"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggungan"
						placeholder="Masukkan jumlah tanggungan"
						isNumber
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_ortu"
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
