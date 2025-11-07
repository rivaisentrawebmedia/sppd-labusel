import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";

export function FormInformasiJandaDuda({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<SuratPayload>;
}) {
	const isAktaCerai = form.watch("dasar_pengajuan") === "akta_cerai";
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Janda/Duda
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<RadioInput
						form={form}
						name="dasar_pengajuan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Dasar Pengajuan"
						data={[
							{ label: "Akta Cerai", value: "akta_cerai" },
							{
								label: "Surat Keterangan Kematian",
								value: "surat_keterangan_kematian",
							},
						]}
					/>
					<TextInput
						form={form}
						name="nomor_pengajuan"
						label="Nomor Pengajuan"
						placeholder="Masukkan Nomor Pengajuan"
						isDisabled={disabled}
						isRequired
						isRow
					/>
					{isAktaCerai && (
						<RadioInput
							form={form}
							name="penyebab"
							isDisabled={disabled}
							isRequired
							isRow
							label="Penyebab"
							data={[
								{ label: "Cerai Mati", value: "cerai_mati" },
								{ label: "Cerai Hidup", value: "cerai_hidup" },
							]}
						/>
					)}
				</div>
			</div>
		</>
	);
}
