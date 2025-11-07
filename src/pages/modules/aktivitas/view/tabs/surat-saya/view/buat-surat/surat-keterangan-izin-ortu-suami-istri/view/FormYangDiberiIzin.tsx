import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetAgama } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { convertToSnakeCase } from "@/utils/helpers";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { useGetAnggotaKK } from "../../../../controller";
import dayjs from "dayjs";

export function FormYangDiberiIzin({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { agama, loading: loadingAgama } = useGetAgama();

	const isWarga = form.watch("is_warga_desa") === true;
	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Yang Diberi Izin
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="diberi_izin"
						isDisabled
						isRequired
						isRow
						label="Hubungan dengan Pemberi Izin"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					{isWarga ? (
						<SelectInput
							form={form}
							name="nik_2"
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
								form.setValue("nama_2", selected?.nama_warga || "");
								form.setValue("tempat_lahir_2", selected?.tempat_lahir || "");
								form.setValue(
									"tanggal_lahir_2",
									selected?.tanggal_lahir
										? dayjs(selected?.tanggal_lahir)
												.locale("id")
												.format("YYYY-MM-DD")
										: ""
								);
								form.setValue("agama_2_id", selected?.agama_id || "");
								form.setValue(
									"kewarganegaraan_2",
									selected?.kewarganegaraan || ""
								);
								form.setValue("pekerjaan_2", selected?.pekerjaan || "");
								form.setValue("alamat_2", selected?.alamat || "");
							}}
						/>
					) : (
						<TextInput
							form={form}
							name="nik_2"
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
					<SelectInput
						form={form}
						name="agama_2_id"
						isDisabled={disabled || loadingAgama}
						isRequired
						isRow
						label="Agama"
						placeholder="Pilih Agama"
						data={agama?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
					<TextInput
						form={form}
						name="pekerjaan_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Pilih pekerjaan"
					/>
					<SelectInput
						form={form}
						name="kewarganegaraan_2"
						isDisabled={disabled}
						isRequired
						isRow
						label="Kewarganegaraan"
						placeholder="Masukkan kewarganegaraan"
						data={["WNI", "WNA", "Ganda"]?.map((item) => {
							return {
								label: item,
								value: convertToSnakeCase(item),
							};
						})}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
		</>
	);
}
