import type { UseFormReturn } from "react-hook-form";
import type { LaporanPayload } from "../../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";
import { FormUpload } from "./FormUpload";
import { FormDampak } from "./FormDampak";
import { FormTindakan } from "./FormTindakan";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetJenisLaporan } from "@/layouts/constroller";

export function FormLaporan({
	disabled,
	form,
}: {
	form: UseFormReturn<LaporanPayload>;
	disabled: boolean;
}) {
	const { jenisLaporan, loading } = useGetJenisLaporan();
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<SelectInput
				form={form}
				name="id_jenis_laporan"
				label="Jenis Laporan"
				placeholder="Pilih jenis laporan"
				data={
					jenisLaporan?.map((item) => {
						return {
							label: item?.nama,
							value: item?.id,
						};
					}) || []
				}
				isRequired
				isDisabled={disabled || loading}
				isRow
			/>
			<div className="hidden md:col-span-1 md:block" />

			<TextInput
				form={form}
				name="perihal"
				label="Perihal"
				placeholder="Cth: Jalan Rusak"
				inputClassName="placeholder:text-[#888]/50"
				isDisabled={disabled}
				isRequired
				isRow
			/>
			<div className="hidden md:col-span-1 md:block" />

			<TextInput
				form={form}
				name="lokasi"
				label="Lokasi"
				placeholder="Cth: Jalan Desa Raya, depan Balai Desa"
				inputClassName="placeholder:text-[#888]/50"
				isDisabled={disabled}
				isRequired
				isRow
			/>
			<div className="hidden md:col-span-1 md:block" />

			<TextAreaInput
				form={form}
				name="isi"
				label="Deskripsi Masalah"
				placeholder="Cth: Terdapat lubang besar di tengah jalan yang membahayakan pengguna, terutama pengendara motor. Lubang ini telah ada selama lebih dari dua bulan dan belum ada tindakan perbaikan. Kondisi ini memperburuk arus lalu lintas dan sering menyebabkan kecelakaan kecil."
				isDisabled={disabled}
				inputClassName="placeholder:text-[#888]/50"
				isRequired
				isRow
			/>
			<div className="hidden md:col-span-1 md:block" />
			<FormDampak disabled={disabled} form={form} />
			<div className="hidden md:col-span-1  md:block" />
			<FormTindakan disabled={disabled} form={form} />
			<div className="hidden md:col-span-1  md:block" />
			<FormUpload disabled={disabled} form={form} />
		</div>
	);
}
