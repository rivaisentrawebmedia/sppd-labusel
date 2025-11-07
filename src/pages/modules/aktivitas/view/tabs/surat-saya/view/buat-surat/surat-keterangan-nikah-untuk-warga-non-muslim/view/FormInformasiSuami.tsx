import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import { useGetReferensi } from "@/layouts/constroller";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiSuami({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingAgama, referensi: agama } = useGetReferensi({
		jenis: "agama",
	});
	const { loading: loadingPendidikan, referensi: pendidikan } = useGetReferensi(
		{
			jenis: "pendidikan",
		}
	);
	const { loading: loadingStatus, referensi: status } = useGetReferensi({
		jenis: "status-kawin",
	});
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Suami
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<RadioInput
						data={[
							{
								label: "Warga Desa",
								value: true,
							},
							{
								label: "Pendatang",
								value: false,
							},
						]}
						form={form}
						name="is_suami_warga_desa"
						isDisabled={disabled}
						isRequired
						isRow
						label="Warga Desa"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nik_suami"
						isDisabled={disabled}
						isRow
						isRequired
						label="NIK"
						placeholder="Masukkan NIK"
						isNumber
					/>
					<TextInput
						form={form}
						name="no_kk_suami"
						isDisabled={disabled}
						label="Nomor KK"
						placeholder="Masukkan No KK"
						isRow
					/>
					<TextInput
						form={form}
						name="nama_suami"
						isRow
						isDisabled={disabled}
						isRequired
						label="Nama Lengkap"
						placeholder="Masukkan nama lengkap"
					/>
					<TextInput
						form={form}
						name="tempat_lahir_suami"
						isRow
						isDisabled={disabled}
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir_suami"
						type="date"
						isRow
						isDisabled={disabled}
						label="Tanggal Lahir"
					/>
					<SelectInput
						form={form}
						name="kewarganegaraan_suami"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kewarganegaraan"
						placeholder="Pilih Kewarganegaraan"
						data={
							["WNI", "WNA", "Ganda"]?.map((item) => ({
								label: item,
								value: convertToSnakeCase(item),
							})) || []
						}
					/>
					<SelectInput
						form={form}
						name="agama_suami_id"
						isDisabled={disabled || loadingAgama}
						label="Agama"
						isRow
						isRequired
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
						name="pekerjaan_suami"
						isDisabled={disabled}
						label="Pekerjaan"
						isRow
						isRequired
						placeholder="Masukkan pekerjaan"
					/>
					<SelectInput
						form={form}
						name="pendidikan_id_suami"
						isDisabled={disabled || loadingPendidikan}
						isRow
						isRequired
						label="Pendidikan Terakhir"
						placeholder="Pilih pendidikan"
						data={pendidikan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>

					<SelectInput
						form={form}
						name="status_kawin_suami"
						isDisabled={disabled || loadingStatus}
						isRow
						isRequired
						label="Status Perkawinan"
						placeholder="Pilih status kawin"
						data={status?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
					<TextInput
						form={form}
						name="istri_ke"
						isDisabled={disabled}
						label="Istri ke-"
						isRow
						isRequired
						placeholder="Masukkan urutan istri"
						isNumber
					/>
					<TextInput
						form={form}
						name="anak_ke_suami"
						isDisabled={disabled}
						label="Anak ke-"
						isNumber
						isRow
						isRequired
						placeholder="Masukkan urutan anak"
					/>
					<TextInput
						form={form}
						name="perkawinan_ke_suami"
						isDisabled={disabled}
						label="Perkawinan ke-"
						isNumber
						isRow
						isRequired
						placeholder="Masukkan perkawinan ke-"
					/>
					<TextInput
						form={form}
						name="paspor_suami"
						isDisabled={disabled}
						label="Nomor Paspor"
						isRow
						placeholder="Masukkan nomor paspor (jika ada)"
					/>
					<TextInput
						form={form}
						name="telepon_suami"
						isDisabled={disabled}
						isRow
						isNumber
						isRequired
						label="Nomor Telepon"
						placeholder="Masukkan nomor telepon"
					/>
					<TextInput
						form={form}
						name="nama_organisasi_suami"
						isDisabled={disabled}
						isRow
						label="Nama Organisasi"
						placeholder="Masukkan nama organisasi (jika ada)"
					/>
					<TextInput
						form={form}
						name="warga_negara_suami"
						isDisabled={disabled}
						isRow
						label="Warga Negara"
						placeholder="Masukkan warga negara"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat_suami"
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
