import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { useGetReferensi } from "@/layouts/constroller";

export function FormInformasiPerusahaan({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingJenisUsaha, referensi: jenisUsaha } = useGetReferensi(
		{
			jenis: "jenis-usaha",
		}
	);
	const { loading: loadingBidangUsaha, referensi: bidangUsaha } =
		useGetReferensi({
			jenis: "bidang-usaha",
		});
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Perusahaan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_perusahaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Perusahaan"
						placeholder="Masukkan Nama Perusahaan"
					/>
					<TextInput
						form={form}
						name="nomor_akta_pendirian"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor Akta Pendirian"
						placeholder="Masukkan nomor akta pendirian"
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
					<SelectInput
						data={
							jenisUsaha?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
						form={form}
						name="jenis_usaha_id"
						isDisabled={disabled || loadingJenisUsaha}
						isRequired
						isRow
						label="Jenis Usaha"
						placeholder="Pilih Jenis Usaha"
					/>
					<SelectInput
						data={
							bidangUsaha?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
						form={form}
						name="bidang_usaha_id"
						isDisabled={disabled || loadingBidangUsaha}
						isRequired
						isRow
						label="Bidang Usaha"
						placeholder="Pilih bidang usaha"
					/>

					<TextInput
						form={form}
						name="status_kepemilikan_bangunan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Status Kepemilikan Bangunan"
						placeholder="Masukkan status kepemilikan bangunan"
					/>
					<TextInput
						form={form}
						name="jumlah_karyawan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jumlah Karyawan"
						placeholder="Masukkan jumlah karyawan"
						isNumber
					/>
					<TextAreaInput
						form={form}
						name="alamat_perusahaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat Perusahaan"
						placeholder="Masukkan alamat perusahaan"
					/>
				</div>
			</div>
		</>
	);
}
