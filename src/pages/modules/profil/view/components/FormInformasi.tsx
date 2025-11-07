import type { UseFormReturn } from "react-hook-form";
import type { ProfilPayload } from "../../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import {
	useGetAgama,
	useGetDisabilitas,
	useGetSuku,
} from "@/layouts/constroller";

export function FormInformasi({
	disabled,
	form,
}: {
	form: UseFormReturn<ProfilPayload>;
	disabled: boolean;
}) {
	const { agama, loading: loadingAgama } = useGetAgama();
	const { suku, loading: loadingSuku } = useGetSuku();
	const { disabilitas, loading: loadingDisabilitas } = useGetDisabilitas();

	return (
		<>
			<div className="flex flex-col gap-3 w-full flex-1">
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 flex-1">
					<TextInput
						form={form}
						name="nama_warga"
						isDisabled={disabled}
						label="Nama Lengkap"
						placeholder="Nama Lengkap"
						type="text"
						isRequired
						isRow
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 flex-1">
					<TextInput
						form={form}
						name="no_kk"
						isDisabled={disabled}
						label="No. KK"
						placeholder="No. KK"
						type="text"
						isRequired
						isRow
					/>
					<TextInput
						form={form}
						name="nik"
						isDisabled={disabled}
						label="NIK"
						placeholder="NIK"
						type="text"
						isRequired
						isRow
					/>
					<TextInput
						form={form}
						name="tempat_lahir"
						isDisabled={disabled}
						label="Tempat Lahir"
						placeholder="Tempat Lahir"
						type="text"
						isRequired
						isRow
					/>
					<TextInput
						form={form}
						name="tanggal_lahir"
						isDisabled={disabled}
						label="Tanggal Lahir"
						type="date"
						isRequired
						isRow
					/>
					<SelectInput
						name="jenis_kelamin"
						isDisabled={disabled}
						label="Jenis Kelamin"
						placeholder="Pilih Jenis Kelamin"
						isRequired
						isRow
						form={form}
						data={[
							{
								label: "Laki-laki",
								value: "L",
							},
							{
								label: "Perempuan",
								value: "P",
							},
						]}
					/>
					<SelectInput
						name="agama_id"
						isDisabled={disabled || loadingAgama}
						label="Agama"
						placeholder="Pilih Agama"
						isRequired
						isRow
						form={form}
						data={
							agama?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
					/>
					<SelectInput
						name="suku_id"
						isDisabled={disabled || loadingSuku}
						label="Suku"
						placeholder="Pilih Suku"
						isRequired
						isRow
						form={form}
						data={
							suku?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
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
						name="kewarganegaraan"
						isDisabled={disabled}
						label="Kewarganegaraan"
						placeholder="Pilih Kewarganegaraan"
						isRequired
						isRow
						form={form}
						data={["wni", "wna", "ganda"]?.map((item) => {
							return {
								label: item?.toUpperCase(),
								value: item,
							};
						})}
					/>
					<SelectInput
						name="disabilitas_id"
						isDisabled={disabled || loadingDisabilitas}
						label="Disabilitas"
						placeholder="Pilih Disabilitas"
						isRequired
						isRow
						form={form}
						data={
							disabilitas?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
					/>
				</div>
			</div>
		</>
	);
}
