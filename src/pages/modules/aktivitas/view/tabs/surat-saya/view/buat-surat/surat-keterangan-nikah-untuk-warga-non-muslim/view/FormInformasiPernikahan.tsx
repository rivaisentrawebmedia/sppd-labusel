import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetReferensi } from "@/layouts/constroller";

export function FormInformasiPernikahan({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingAgama, referensi: agama } = useGetReferensi({
		jenis: "agama",
	});

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pernikahan
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="tanggal_melapor_pernikahan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Tanggal Melapor"
						type="date"
					/>
					<TextInput
						form={form}
						name="tanggal_pemberkatan_pernikahan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Tanggal Pemberkatan"
						type="date"
					/>

					<SelectInput
						form={form}
						name="agama_pernikahan_id"
						isDisabled={disabled || loadingAgama}
						isRow
						isRequired
						label="Agama Pernikahan"
						placeholder="Pilih agama"
						data={agama?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
					<TextInput
						form={form}
						name="badan_peradilan_pernikahan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Badan Peradilan"
						placeholder="Masukkan Badan Peradilan"
					/>
					<TextInput
						form={form}
						name="nama_organisasi_pernikahan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Nama organisasi"
						placeholder="Masukkan nama organisasi"
					/>
					<TextInput
						form={form}
						name="nomor_putusan_pengadilan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Nomor putusan"
						placeholder="Masukkan nomor putusan"
					/>
					<TextInput
						form={form}
						name="tanggal_putusan_pengadilan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Tanggal Putusan"
						type="date"
					/>
					<TextInput
						form={form}
						name="nama_pemuka_agama"
						isDisabled={disabled}
						isRow
						isRequired
						label="Nama Pemukan Agama"
						placeholder="Masukkan nama pemuka agama"
					/>
					<TextInput
						form={form}
						name="nomor_izin_perwakilan"
						isDisabled={disabled}
						isRow
						isRequired
						label="Nomor Izin Perwakilan"
						placeholder="Masukkan nomor izin perwakilan"
					/>
					<TextInput
						form={form}
						name="jumlah_anak_yang_diakui"
						isDisabled={disabled}
						isRow
						isRequired
						label="Jumlah Anak yang Diakui"
						placeholder="Masukkan Jumlah"
						isNumber
					/>
				</div>
			</div>
		</>
	);
}
