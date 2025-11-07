import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetAnggotaKK } from "../../../../controller";
import RadioInput from "@/components/common/form-input/RadioInput";
import { useGetReferensi } from "@/layouts/constroller";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import dayjs from "dayjs";

export function FormInformasiPelapor({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const isWarga = form.watch("is_warga_desa") === true;
	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();
	const { loading: loadingAgama, referensi: agama } = useGetReferensi({
		jenis: "agama",
	});

	const { loading: loadingDisabilitas, referensi: disabilitas } =
		useGetReferensi({
			jenis: "disabilitas",
		});
	const { loading: loadingStatusKawin, referensi: statusKawin } =
		useGetReferensi({
			jenis: "status-kawin",
		});
	const { loading: loadingHubungan, referensi: hubungan } = useGetReferensi({
		jenis: "hubungan",
	});
	const { loading: loadingPendidikan, referensi: pendidikan } = useGetReferensi(
		{
			jenis: "pendidikan",
		}
	);

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pelapor
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					{isWarga ? (
						<SelectInput
							form={form}
							name="nik"
							isDisabled={disabled || loadingKK}
							isRequired
							isRow
							label="NIK"
							placeholder="Masukkan NIK"
							data={
								anggotaKK?.map((item) => {
									return {
										label: `${item?.nik} - ${item?.nama_warga}`,
										value: item?.nik,
									};
								}) || []
							}
							onChange={(e) => {
								const selected = anggotaKK?.find((item) => item?.nik === e);
								form.setValue("nama", selected?.nama_warga || "");
								form.setValue("tempat_lahir", selected?.tempat_lahir || "");
								form.setValue(
									"tanggal_lahir",
									selected?.tanggal_lahir
										? dayjs(selected?.tanggal_lahir)
												.locale("id")
												.format("YYYY-MM-DD")
										: ""
								);
								form.setValue("no_kk", selected?.no_kk || "");
								form.setValue("jenis_kelamin", selected?.jenis_kelamin || "");
								form.setValue("golongan_darah", selected?.golongan_darah || "");
								form.setValue("agama_id", selected?.agama_id || "");
								form.setValue(
									"kepala_keluarga",
									selected?.kepala_keluarga || ""
								);
								form.setValue("disabilitas_id", selected?.disabilitas_id || "");
								form.setValue(
									"status_kawin_id",
									selected?.status_kawin_id || ""
								);
								form.setValue("hubungan", selected?.status_hubungan || "");
								form.setValue("pendidikan_id", selected?.pendidikan_id || "");
								form.setValue("pekerjaan", selected?.pekerjaan || "");
								form.setValue("alamat", selected?.alamat || "");
							}}
						/>
					) : (
						<TextInput
							form={form}
							name="nik"
							isDisabled={disabled}
							isRequired
							isRow
							label="NIK"
							placeholder="Masukkan NIK"
							isNumber
						/>
					)}
					<TextInput
						form={form}
						name="nama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>
					<TextInput
						form={form}
						name="tempat_lahir"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
					<TextInput
						form={form}
						name="tanggal_lahir"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
					<TextInput
						form={form}
						name="no_kk"
						isDisabled={disabled}
						isRequired
						isRow
						label="No KK"
						placeholder="Masukkan No KK"
					/>
					<TextInput
						form={form}
						name="kepala_keluarga"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kepala Keluarga"
						placeholder="Masukkan kepala keluarga"
					/>
					<RadioInput
						key={`jenis_kelamin`}
						form={form}
						name="jenis_kelamin"
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
						name="golongan_darah"
						isDisabled={disabled}
						label="Golongan Darah"
						placeholder="Pilih Golongan Darah"
						isRequired
						isRow
						form={form}
						data={[
							"A",
							"B",
							"AB",
							"O",
							"A-",
							"A+",
							"B-",
							"B+",
							"AB-",
							"AB+",
							"O-",
							"O+",
							"Tidak Tahu",
						]?.map((item) => {
							return {
								label: item,
								value: item,
							};
						})}
					/>
					<SelectInput
						data={agama?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
						form={form}
						name="agama_id"
						isDisabled={disabled || loadingAgama}
						isRequired
						isRow
						label="Agama"
						placeholder="Pilih Agama"
					/>
					<SelectInput
						data={disabilitas?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
						form={form}
						name="disabilitas_id"
						isDisabled={disabled || loadingDisabilitas}
						isRow
						label="Disabilitas"
						placeholder="Pilih Disabilitas"
					/>
					<SelectInput
						data={statusKawin?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
						form={form}
						name="status_kawin_id"
						isDisabled={disabled || loadingStatusKawin}
						isRequired
						isRow
						label="Status Kawin"
						placeholder="Pilih Status Kawin"
					/>
					<SelectInput
						data={hubungan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
						form={form}
						name="hubungan"
						isDisabled={disabled || loadingHubungan}
						isRequired
						isRow
						label="Hubungan"
						placeholder="Pilih Hubungan"
					/>
					<SelectInput
						data={pendidikan?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
						form={form}
						name="pendidikan_id"
						isDisabled={disabled || loadingPendidikan}
						isRequired
						isRow
						label="Pendidikan"
						placeholder="Pilih pendidikan"
					/>
					<TextInput
						form={form}
						name="pekerjaan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan Pekerjaan"
					/>
					<TextInput
						form={form}
						name="akta_kawin"
						isDisabled={disabled}
						isRow
						label="Akta Kawin"
						placeholder="Masukkan Akta Kawin"
					/>
					<TextInput
						form={form}
						name="tanggal_kawin"
						isDisabled={disabled}
						isRow
						label="Tanggal Kawin"
						type="date"
					/>
					<TextInput
						form={form}
						name="akta_cerai"
						isDisabled={disabled}
						isRow
						label="Akta Cerai"
						placeholder="Masukkan Akta Cerai"
					/>
					<TextInput
						form={form}
						name="tanggal_cerai"
						isDisabled={disabled}
						isRow
						label="Tanggal Cerai"
						type="date"
					/>
					<TextInput
						form={form}
						name="akta_lahir"
						isDisabled={disabled}
						isRow
						label="Akta Lahir"
						placeholder="Masukkan akta lahir"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="alamat"
						isDisabled={disabled}
						isRow
						label="Alamat"
						placeholder="Masukkan alamat"
					/>
				</div>
			</div>
		</>
	);
}
