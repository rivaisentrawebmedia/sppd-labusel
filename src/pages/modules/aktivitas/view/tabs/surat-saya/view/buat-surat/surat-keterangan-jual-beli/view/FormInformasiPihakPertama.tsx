import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";
import { useGetAnggotaKK } from "../../../../controller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import dayjs from "dayjs";

export function FormInformasiPihakPertama({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const isWarga = form.watch("is_warga_desa") === true;
	const { anggotaKK, loading: loadingKK } = useGetAnggotaKK();

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pihak Pertama
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					{isWarga ? (
						<SelectInput
							form={form}
							name="nik_1"
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
								form.setValue("nama_1", selected?.nama_warga || "");
								form.setValue("tempat_lahir_1", selected?.tempat_lahir || "");
								form.setValue(
									"tanggal_lahir_1",
									selected?.tanggal_lahir
										? dayjs(selected?.tanggal_lahir)
												.locale("id")
												.format("YYYY-MM-DD")
										: ""
								);
								form.setValue("pekerjaan_1", selected?.pekerjaan || "");
								form.setValue("alamat_1", selected?.alamat || "");
								form.setValue("jenis_kelamin_1", selected?.jenis_kelamin || "");
							}}
						/>
					) : (
						<TextInput
							form={form}
							name="nik_1"
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
					<TextInput
						form={form}
						name="pekerjaan_1"
						isDisabled={disabled}
						isRequired
						isRow
						label="Pekerjaan"
						placeholder="Masukkan Pekerjaan"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin_1"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="alamat_1"
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
