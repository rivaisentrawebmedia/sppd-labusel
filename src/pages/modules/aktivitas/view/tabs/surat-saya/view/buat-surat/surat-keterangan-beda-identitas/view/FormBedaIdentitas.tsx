import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetReferensi } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiBedaIdentitas({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingTercantum, referensi: tercantum } = useGetReferensi({
		jenis: "tercantum-identitas",
	});
	const { loading: loadingPerbedaan, referensi: perbedaan } = useGetReferensi({
		jenis: "perbedaan-identitas",
	});
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pelapor
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<SelectInput
						form={form}
						name="perbedaan_id"
						isDisabled={disabled || loadingPerbedaan}
						isRequired
						label="Perbedaan yang Akan Dilaporkan"
						placeholder="Pilih Perbedaan"
						data={perbedaan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<div className="col-span-1 flex flex-col gap-2">
						<p>Identitas 1</p>
						<hr className="w-full border-t" />
						<SelectInput
							form={form}
							name="tercantum_id"
							isDisabled={disabled || loadingTercantum}
							isRequired
							isRow
							label="Tercantum Dalam"
							placeholder="Pilih Opsi"
							data={tercantum?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
						/>
						<TextInput
							form={form}
							name="nomor_1"
							isDisabled={disabled}
							isRequired
							isRow
							label="Nomor"
							placeholder="Masukkan Nomor"
						/>
						<TextInput
							form={form}
							name="nama_1"
							isDisabled={disabled}
							isRequired
							isRow
							label="Nama"
							placeholder="Masukkan nama"
						/>
						<TextInput
							form={form}
							name="tempat_lahir_1"
							isDisabled={disabled}
							isRequired
							isRow
							label="Tempat Lahir"
							placeholder="Masukkan tempat lahir"
						/>
						<TextInput
							form={form}
							name="tanggal_lahir_1"
							isDisabled={disabled}
							isRequired
							isRow
							label="Tanggal Lahir"
							type="date"
						/>

						<TextAreaInput
							form={form}
							name="alamat_1"
							isDisabled={disabled}
							isRequired
							isRow
							label="Alamat"
							placeholder="Masukkan alamat"
						/>
					</div>
					<div className="col-span-1 flex flex-col gap-2">
						<p>Identitas 2</p>
						<hr className="w-full border-t" />
						<SelectInput
							form={form}
							name="tercantum_id_2"
							isDisabled={disabled || loadingTercantum}
							isRequired
							isRow
							label="Tercantum Dalam"
							placeholder="Pilih Opsi"
							data={tercantum?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
						/>
						<TextInput
							form={form}
							name="nomor_2"
							isDisabled={disabled}
							isRequired
							isRow
							label="Nomor"
							placeholder="Masukkan Nomor"
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

						<TextAreaInput
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
			</div>
		</>
	);
}
