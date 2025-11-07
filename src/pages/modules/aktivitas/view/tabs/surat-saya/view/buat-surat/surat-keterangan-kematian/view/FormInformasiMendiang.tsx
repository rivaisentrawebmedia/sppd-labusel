import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { useGetReferensi } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";

export function FormInformasiMendiang({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading, referensi: hubungan } = useGetReferensi({
		jenis: "hubungan",
	});
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Mendiang
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_mendiang"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
					/>
					<TextInput
						form={form}
						name="nama_mendiang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_mendiang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_mendiang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<SelectInput
						form={form}
						name="hubungan_id"
						isDisabled={disabled || loading}
						isRequired
						isRow
						label="Hubungan"
						placeholder="Pilih hubungan"
						data={
							hubungan?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_mendiang"
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
						name="tanggal_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Meninggal"
						type="date"
					/>
					<TextInput
						form={form}
						name="jam_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jam Meninggal"
						type="time"
					/>
					<TextInput
						form={form}
						name="tempat_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Meninggal"
						placeholder="Masukkan tempat meninggal"
					/>
					<TextInput
						form={form}
						name="sebab_meninggal"
						isDisabled={disabled}
						isRequired
						isRow
						label="Sebab Meninggal"
						placeholder="Masukkan sebab meninggal"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_mendiang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat Mendiang"
						placeholder="Masukkan alamat mendiang"
					/>
				</div>
			</div>
		</>
	);
}
