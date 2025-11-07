import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetReferensi } from "@/layouts/constroller";

export function FormInformasiGhaib({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading, referensi } = useGetReferensi({ jenis: "hubungan" });

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Orang yang Hilang
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_orang_hilang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Orang Hilang"
						placeholder="Masukkan nama orang hilang"
					/>

					<TextInput
						form={form}
						name="usia"
						isDisabled={disabled}
						isRequired
						isRow
						label="Usia (Tahun)"
						placeholder="Masukkan Usia"
						isNumber
					/>

					<SelectInput
						name="hubungan_id"
						isDisabled={disabled || loading}
						label="Hubungan"
						placeholder="Pilih Hubungan"
						isRequired
						isRow
						form={form}
						data={referensi?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>

					<TextInput
						form={form}
						name="hilang_sejak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Hilang Sejak"
						type="date"
					/>
				</div>
			</div>
		</>
	);
}
