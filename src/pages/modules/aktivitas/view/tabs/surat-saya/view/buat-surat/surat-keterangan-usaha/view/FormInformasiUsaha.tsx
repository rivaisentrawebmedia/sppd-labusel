import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useGetReferensi } from "@/layouts/constroller";

export function FormInformasiUsaha({
	disabled,
	form,
}: {
	form: UseFormReturn<SuratPayload>;
	disabled: boolean;
}) {
	const { loading: loadingJenis, referensi: jenisUsaha } = useGetReferensi({
		jenis: "jenis-usaha",
	});
	const { loading: loadingBidang, referensi: bidangUsaha } = useGetReferensi({
		jenis: "bidang-usaha",
	});

	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Usaha
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<TextInput
						form={form}
						name="nama_usaha"
						isDisabled={disabled}
						isRequired
						isRow
						label="Nama Usaha"
						placeholder="Masukkan nama usaha"
					/>
					<SelectInput
						data={
							jenisUsaha?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							}) || []
						}
						form={form}
						name="jenis_usaha_id"
						isDisabled={disabled || loadingJenis}
						isRequired
						isRow
						label="Jenis Usaha"
						placeholder="Masukkan jenis usaha"
					/>
					<SelectInput
						form={form}
						name="bidang_usaha_id"
						isDisabled={disabled || loadingBidang}
						isRequired
						isRow
						label="Bidang Usaha"
						placeholder="Masukkan bidang usaha"
						data={bidangUsaha?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						})}
					/>
					<TextInput
						form={form}
						name="npwp"
						isDisabled={disabled}
						isRequired
						isRow
						label="NPWP"
						placeholder="Masukkan NPWP"
					/>
					<TextInput
						form={form}
						name="alamat_usaha"
						isDisabled={disabled}
						isRequired
						isRow
						label="Alamat Usaha"
						placeholder="Masukkan alamat usaha"
					/>
					<TextInput
						form={form}
						name="usaha_berdiri_sejak"
						isDisabled={disabled}
						isRequired
						isRow
						label="Usaha Berdiri Sejak"
						type="date"
					/>
				</div>
			</div>
		</>
	);
}
