import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiKendaraan({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Kendaraan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="merk"
						isDisabled={disabled}
						isRequired
						isRow
						label="Merk"
						placeholder="Masukkan Merk"
					/>
					<TextInput
						form={form}
						name="tahun_pembuatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tahun Pembuatan"
						placeholder="Masukkan tahun pembuatan"
						isNumber
					/>
					<TextInput
						form={form}
						name="warna"
						isDisabled={disabled}
						isRequired
						isRow
						label="Warna"
						placeholder="Masukkan warna"
					/>
					<TextInput
						form={form}
						name="nomor_polisi"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor Polisi"
						placeholder="Masukkan nomor polisi"
					/>
					<TextInput
						form={form}
						name="nomor_mesin"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor Mesin"
						placeholder="Masukkan nomor mesin"
					/>
					<TextInput
						form={form}
						name="nomor_rangka"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor Rangka"
						placeholder="Masukkan nomor rangka"
					/>
					<TextInput
						form={form}
						name="nomor_bpkb"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nomor BPKB"
						placeholder="Masukkan nomor BPKB"
					/>
					<TextInput
						form={form}
						name="bahan_bakar"
						isDisabled={disabled}
						isRequired
						isRow
						label="Bahan Bakar"
						placeholder="Masukkan bahan bakar"
					/>
					<TextInput
						form={form}
						name="isi_silinder"
						isDisabled={disabled}
						isRequired
						isRow
						label="Isi Silinder"
						placeholder="Masukkan isi silinder"
					/>
					<TextInput
						form={form}
						name="atas_nama"
						isDisabled={disabled}
						isRequired
						isRow
						label="Atas Nama"
						placeholder="Masukkan atas nama"
					/>
				</div>
			</div>
		</>
	);
}
