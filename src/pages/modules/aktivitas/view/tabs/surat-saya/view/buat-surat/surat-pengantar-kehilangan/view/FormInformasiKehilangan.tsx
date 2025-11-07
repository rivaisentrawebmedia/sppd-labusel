import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormInformasiBarangHilang({
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
					Informasi Barang Hilang
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="jenis_barang"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Barang"
						placeholder="Masukkan jenis barang"
					/>
					<TextInput
						form={form}
						name="ciri"
						isDisabled={disabled}
						isRequired
						isRow
						label="Ciri"
						placeholder="Masukkan ciri"
					/>
					<TextInput
						form={form}
						name="tempat_kehilangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Tempat Kehilangan"
						placeholder="Masukkan tempat kehilangan"
					/>
					<TextInput
						form={form}
						name="waktu_kehilangan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Waktu Kehilangan"
						type="date"
					/>
				</div>
			</div>
		</>
	);
}
