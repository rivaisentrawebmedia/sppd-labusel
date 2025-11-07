import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";

export function FormKepemilikanTanah({
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
					Informasi Tanah / Lahan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<SelectInput
						form={form}
						name="jenis_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Tanah"
						placeholder="Pilih Jenis Tanah"
						data={["Sawah Tanah", "Tanah Darat", "Tanah Bangunan"]?.map(
							(item) => {
								return {
									label: item,
									value: convertToSnakeCase(item),
								};
							}
						)}
					/>
					<TextInput
						form={form}
						name="luas_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Luas Tanah"
						placeholder="Masukkan luas tanag (m2)"
						isNumber
					/>
					<SelectInput
						form={form}
						name="bukti_kepemilikan_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Bukti Kepemilikan"
						placeholder="Pilih bukti kepemilikan"
						data={[
							"Petok Lama",
							"Petok Baru",
							"Sit Segel",
							"Akta",
							"Copy",
							"Buku Krawangan Desa",
							"Lainnya",
						]?.map((item) => {
							return {
								label: item,
								value: convertToSnakeCase(item),
							};
						})}
					/>
					<TextInput
						form={form}
						name="nomor_bukti_kepemilikan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor Buktu Kepemilikan"
						placeholder="Masukkan nomor bukti kepemilikan"
					/>
					<TextInput
						form={form}
						name="atas_nama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Atas Nama"
						placeholder="Masukkan atas nama"
					/>
					<SelectInput
						form={form}
						name="asal_kepemilikan_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Asal Kepemilikan Tanah"
						placeholder="Masukkan asal kepemilikan tanah"
						data={["Yayasan", "Warisan", "Hibah", "Jual Beli", "Lainnya"]?.map(
							(item) => {
								return {
									label: item,
									value: convertToSnakeCase(item),
								};
							}
						)}
					/>
					<TextInput
						form={form}
						name="bukti_kepemilikan_tanah_tanah"
						isDisabled={disabled}
						isRequired
						isRow
						label="Bukti Pendukung Kepemilikan"
						placeholder="Masukkan bukti pendukung kepemilikan"
					/>
				</div>
			</div>
		</>
	);
}
