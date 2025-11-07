import RadioInput from "@/components/common/form-input/RadioInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import {
	useGetAgama,
	useGetPekerjaan,
	useGetPendidikan,
	useGetReferensi,
	useGetStatusKawin,
} from "@/layouts/constroller";
import type { Profil } from "@/pages/modules/profil/model";
import { convertToSnakeCase } from "@/utils/helpers";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useGetAnggotaKK } from "../../controller";
import dayjs from "dayjs";

export function FormIdentitasWarga({
	disabled,
	form,
	isAgama,
	isAlamat,
	isJenisKelamin,
	isNama,
	isNik,
	isPekerjaan,
	isTanggalLahir,
	isTempatLahir,
	isStatusKawin,
	isKewarganegaraan,
	data,
	isPendidikan,
	isPekerjaanTextField,
	isWarga,
	isNoKK,
	isKepalaKeluarga,
	isNamaAyah,
	isNikAyah,
	isHubungan,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
	isNik?: boolean;
	isNama?: boolean;
	isTempatLahir?: boolean;
	isTanggalLahir?: boolean;
	isAlamat?: boolean;
	isJenisKelamin?: boolean;
	isPekerjaan?: boolean;
	isAgama?: boolean;
	isPendidikan?: boolean;
	isStatusKawin?: boolean;
	isKewarganegaraan?: boolean;
	isPekerjaanTextField?: boolean;
	data?: Profil;
	isWarga?: boolean;
	isNoKK?: boolean;
	isNikAyah?: boolean;
	isNamaAyah?: boolean;
	isHubungan?: boolean;
	isKepalaKeluarga?: boolean;
}) {
	const { loading: loadingPekerjaan, pekerjaan } = useGetPekerjaan();
	const { agama, loading: loadingAgama } = useGetAgama();
	const { loading: loadingPendidikan, pendidikan } = useGetPendidikan();
	const { loading: loadingStatusKawin, statusKawin } = useGetStatusKawin();
	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();
	const { loading: loadingReferensi, referensi } = useGetReferensi({
		jenis: "hubungan",
	});
	useEffect(() => {
		if (data && pekerjaan && pekerjaan.length > 0) {
			const found = pekerjaan.find((p) => p.id === data.pekerjaan_id);
			if (found && isPekerjaanTextField) {
				form.setValue("pekerjaan", found.nama);
			}
			if (found && !isPekerjaanTextField) {
				form.setValue("pekerjaan", found.id);
			}
		}
	}, [data?.pekerjaan_id, pekerjaan]);

	useEffect(() => {
		if (data && agama && agama.length > 0) {
			const found = agama.find((a) => a.id === data.agama_id);
			if (found) form.setValue("agama_id", found.id);
		}
	}, [data?.agama_id, agama]);

	useEffect(() => {
		if (data && pendidikan && pendidikan.length > 0) {
			const found = pendidikan.find((a) => a.id === data.pendidikan_id);
			if (found) form.setValue("pendidikan_id", found.id);
		}
	}, [data?.pendidikan_id, pendidikan]);

	useEffect(() => {
		if (data && statusKawin && statusKawin.length > 0) {
			const found = statusKawin.find((a) => a?.id === data?.status_kawin_id);
			if (found) form.setValue("status_kawin_id", found?.id);
		}
	}, [data?.status_kawin_id, statusKawin]);

	const kewarganegaraan = ["WNI", "WNA", "Ganda"];

	useEffect(() => {
		if (data && kewarganegaraan && kewarganegaraan.length > 0) {
			const found = kewarganegaraan.find(
				(a) => convertToSnakeCase(a) === data?.kewarganegaraan
			);
			if (found) form.setValue("kewarganegaraan", convertToSnakeCase(found));
		}
	}, [data?.kewarganegaraan, kewarganegaraan]);

	useEffect(() => {
		const found = anggotaKK?.find((a) => a?.nik === data?.nik);
		if (found) {
			form.setValue("nik", found?.nik);
			form.setValue("nama", found?.nama_warga);
			form.setValue("tempat_lahir", found?.tempat_lahir);
			form.setValue(
				"tanggal_lahir",
				found?.tanggal_lahir
					? dayjs(found?.tanggal_lahir).locale("id").format("YYYY-MM-DD")
					: ""
			);
			form.setValue("alamat", found?.alamat);
			form.setValue("jenis_kelamin", found?.jenis_kelamin);
			form.setValue("pendidikan_id", found?.pendidikan_id);
			if (isPekerjaanTextField) {
				form.setValue("pekerjaan", found?.pekerjaan);
			} else {
				form.setValue("pekerjaan", found?.pekerjaan_id);
			}
			form.setValue("status_hubungan_id", found?.status_hubungan);
			form.setValue("agama_id", found?.agama_id);
		}
	}, [data?.nik, anggotaKK]);

	const nik = form.watch("nik");
	return (
		<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
			<p className="font-light uppercase text-primary underline underline-offset-4">
				Informasi Warga
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
				{isNik && (
					<>
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
									form.setValue("nama", selected?.nama_warga);
									form.setValue("tempat_lahir", selected?.tempat_lahir);
									form.setValue(
										"tanggal_lahir",
										selected?.tanggal_lahir
											? dayjs(selected?.tanggal_lahir)
													.locale("id")
													.format("YYYY-MM-DD")
											: ""
									);
									form.setValue("jenis_kalamin", selected?.jenis_kelamin);
									form.setValue("pendidikan_id", selected?.pendidikan_id);
									if (isPekerjaanTextField) {
										form.setValue("pekerjaan", selected?.pekerjaan);
									} else {
										form.setValue("pekerjaan", selected?.pekerjaan_id);
									}
									form.setValue("agama_id", selected?.agama_id);
									form.setValue("status_kawin_id", selected?.status_kawin_id);
									form.setValue("kewarganegaraan", selected?.kewarganegaraan);
									form.setValue("alamat", selected?.alamat);
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
					</>
				)}

				{isNama && (
					<TextInput
						key={`nama-${nik}`}
						form={form}
						name="nama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan nama"
					/>
				)}

				{isTempatLahir && (
					<TextInput
						key={`tempat_lahir-${nik}`}
						form={form}
						name="tempat_lahir"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Lahir"
						placeholder="Masukkan tempat lahir"
					/>
				)}

				{isTanggalLahir && (
					<TextInput
						key={`tanggal_lahir-${nik}`}
						form={form}
						name="tanggal_lahir"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tanggal Lahir"
						type="date"
					/>
				)}

				{isJenisKelamin && (
					<RadioInput
						key={`jenis_kelamin-${nik}`}
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
				)}

				{isPendidikan && pendidikan && (
					<SelectInput
						key={`pendidikan_id-${nik}`}
						form={form}
						name="pendidikan_id"
						isDisabled={disabled || loadingPendidikan}
						isRequired
						isRow
						label="Pendidikan"
						placeholder="Pilih Pendidikan"
						data={
							pendidikan?.map((item) => ({
								label: item?.nama,
								value: item?.id,
							})) || []
						}
					/>
				)}

				{isPekerjaan && pekerjaan && (
					<>
						{isPekerjaanTextField ? (
							<TextInput
								key={`pekerjaan-${nik}`}
								form={form}
								name="pekerjaan"
								isDisabled={disabled || loadingPekerjaan}
								isRequired
								isRow
								label="Pekerjaan"
								placeholder="Pilih Pekerjaan"
							/>
						) : (
							<SelectInput
								form={form}
								key={`pekerjaan-${nik}`}
								name="pekerjaan"
								isDisabled={disabled || loadingPekerjaan}
								isRequired
								isRow
								label="Pekerjaan"
								placeholder="Pilih Pekerjaan"
								data={
									pekerjaan?.map((item) => ({
										label: item?.nama,
										value: item?.id,
									})) || []
								}
							/>
						)}
					</>
				)}

				{isAgama && agama && (
					<SelectInput
						key={`agama_id-${nik}`}
						form={form}
						name="agama_id"
						isDisabled={disabled || loadingAgama}
						isRequired
						isRow
						label="Agama"
						placeholder="Pilih Agama"
						data={
							agama?.map((item) => ({
								label: item?.nama,
								value: item?.id,
							})) || []
						}
					/>
				)}

				{isStatusKawin && statusKawin && (
					<SelectInput
						form={form}
						key={`status_kawin_id-${nik}`}
						name="status_kawin_id"
						isDisabled={disabled || loadingStatusKawin}
						isRequired
						isRow
						label="Status Kawin"
						placeholder="Pilih Status Kawin"
						data={
							statusKawin?.map((item) => ({
								label: item?.nama,
								value: item?.id,
							})) || []
						}
					/>
				)}

				{isKewarganegaraan && (
					<SelectInput
						form={form}
						key={`kewarganegaraan-${nik}`}
						name="kewarganegaraan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kewarganegaraan"
						placeholder="Pilih Kewarganegaraan"
						data={
							kewarganegaraan?.map((item) => ({
								label: item,
								value: convertToSnakeCase(item),
							})) || []
						}
					/>
				)}

				{isNoKK && (
					<TextInput
						key={`no_kk-${nik}`}
						form={form}
						name="no_kk"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor KK"
						placeholder="Masukkan Nomor KK"
						isNumber
					/>
				)}

				{isKepalaKeluarga && (
					<TextInput
						key={`kepala_keluarga-${nik}`}
						form={form}
						name="kepala_keluarga"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kepala Keluarga"
						placeholder="Masukkan kepala keluarga"
					/>
				)}
			</div>

			{isHubungan && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<SelectInput
						data={
							referensi?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
						form={form}
						name="hubungan_id"
						isDisabled={disabled || loadingReferensi}
						isRequired
						isRow
						label="Hubungan"
						placeholder="Pilih hubungan"
					/>
				</div>
			)}

			{isAlamat && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<TextAreaInput
						form={form}
						key={`alamat-${nik}`}
						name="alamat"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat"
						placeholder="Masukkan alamat"
					/>
				</div>
			)}

			{isNikAyah && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<TextInput
						form={form}
						name="nik_ayah"
						isDisabled={disabled}
						isRequired
						isRow
						label="NIK Ayah"
						placeholder="Masukkan nik ayah"
						isNumber
					/>
					{isNamaAyah && (
						<TextInput
							form={form}
							name="nama_ayah"
							isDisabled={disabled}
							isRequired
							isRow
							label="Nama Ayah"
							placeholder="Masukkan nama ayah"
						/>
					)}
				</div>
			)}
		</div>
	);
}
