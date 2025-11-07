import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormInformasiTanahDijual({
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
					Informasi Tanah Dijual
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextAreaInput
						form={form}
						name="informasi_tanah"
						isDisabled={disabled}
						isRequired
						label="Tuliskan informasi tanah (alamat/letak, harga jual, dan ukuran/luas tanah)"
						placeholder="Cth: Menjual tanah yang terletak di Tornauli Dusun Tornauli Desa Sijarango,  Kecamatan pakat, Kabupaten Humbang Hasundutan seharga Rp. 18,000.000,- (Delapan Belas  Juta Rupiah) dengan Ukuran Luas ± 200 m2 (Dua ratus meter)"
					/>
				</div>
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Batas Tanah
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="batas_utara"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Utara"
						placeholder="Masukkan batas utara"
					/>
					<TextInput
						form={form}
						name="batas_timur"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Timur"
						placeholder="Masukkan batas timur"
					/>
					<TextInput
						form={form}
						name="batas_selatan"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Selatan"
						placeholder="Masukkan batas selatan"
					/>
					<TextInput
						form={form}
						name="batas_barat"
						isDisabled={disabled}
						isRequired
						isRow
						label="Batas Barat"
						placeholder="Masukkan batas barat"
					/>
				</div>
			</div>
		</>
	);
}
