import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetAnggotaKK } from "../../../../controller";
import SelectInput from "@/components/common/select/SelectBaseForm";

export function FormPemberiKuasa({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { anggotaKK, loading } = useGetAnggotaKK();

	const nik = form.watch("nik_pemberi");
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Pemberi Kuasa
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<SelectInput
						data={
							anggotaKK?.map((item) => {
								return {
									label: `${item?.nik} - ${item?.nama_warga}`,
									value: item?.nik,
								};
							}) || []
						}
						form={form}
						name="nik_pemberi"
						isDisabled={disabled || loading}
						isRequired
						isRow
						label="NIK"
						placeholder="Masukkan NIK"
						onChange={(e) => {
							const selected = anggotaKK?.find((item) => item?.nik === e);

							form.setValue("nama_pemberi", selected?.nama_warga || "");
						}}
					/>

					<TextInput
						form={form}
						key={`nama_pemberi-${nik}`}
						name="nama_pemberi"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama"
						placeholder="Masukkan Nama"
					/>

					<TextInput
						form={form}
						name="disposisi_kuasa_sebagai"
						isDisabled={disabled}
						isRequired
						isRow
						label="Disposisi Kuasa Sebagai"
						placeholder="Masukkan disposisi kuasa sebagai"
					/>

					<TextInput
						form={form}
						name="disposisi_kuasa_untuk"
						isDisabled={disabled}
						isRequired
						isRow
						label="Disposisi Kuasa Untuk"
						placeholder="Masukkan disposisi kuasa untuk"
					/>

					<TextInput
						form={form}
						name="jabatan_pemberi"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jabatan"
						placeholder="Masukkan jabatan"
					/>
				</div>
			</div>
		</>
	);
}
