import { useGetProfil } from "@/pages/modules/profil/controller";
import type { UseFormReturn } from "react-hook-form";
import type { BukuTamuByID, BukuTamuPayload } from "../../../../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetReferensi } from "@/layouts/constroller";
import SelectInput from "@/components/common/select/SelectBaseForm";
import { useEffect } from "react";

export function DataKunjungan({
	disabled,
	form,
	bowo,
}: {
	form: UseFormReturn<BukuTamuPayload>;
	disabled: boolean;
	bowo: BukuTamuByID | undefined;
}) {
	const { data } = useGetProfil();
	const { loading: loadingJenis, referensi: jenisKeperluan } = useGetReferensi({
		jenis: "jenis-keperluan",
	});
	const { loading: loadingTujuan, referensi: tujuanBertamu } = useGetReferensi({
		jenis: "tujuan-bertamu",
	});

	const isWargaPendatang = data?.is_warga_desa === false;

	useEffect(() => {
		if (jenisKeperluan && bowo) {
			form.setValue("jenis_keperluan_id", bowo?.jenis_keperluan_id);
		}
	}, [bowo, jenisKeperluan]);

	useEffect(() => {
		if (tujuanBertamu && bowo) {
			form.setValue("tujuan_bertamu_id", bowo?.tujuan_betamu_id);
		}
	}, [bowo, tujuanBertamu]);

	return (
		<>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<p className="font-medium text-lg">Data Kunjungan</p>
				</div>
				<div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
					<div className="flex md:items-center w-full md:w-1/2 flex-col gap-2 md:flex-row md:gap-4">
						<p className="text-[#9C9C9C] w-full">
							Jenis Keperluan <span className="text-red-500">*</span>
						</p>
						<SelectInput
							form={form}
							name="jenis_keperluan_id"
							isDisabled={disabled || loadingJenis}
							className="w-full"
							placeholder="Pilih Opsi"
							data={jenisKeperluan?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
						/>
					</div>
					<div className="hidden md:w-1/2 md:block" />
				</div>
				<div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
					<div className="flex md:items-center w-full md:w-1/2 flex-col gap-2 md:flex-row md:gap-4">
						<p className="text-[#9C9C9C] w-full">
							Tujuan Bertamu <span className="text-red-500">*</span>
						</p>
						<SelectInput
							form={form}
							name="tujuan_bertamu_id"
							isDisabled={disabled || loadingTujuan}
							className="w-full"
							placeholder="Pilih Opsi"
							data={tujuanBertamu?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
						/>
					</div>
					<div className="hidden md:w-1/2 md:block" />
				</div>
				{isWargaPendatang && (
					<div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
						<div className="flex md:items-center w-full md:w-1/2 flex-col gap-2 md:flex-row md:gap-4">
							<p className="text-[#9C9C9C] w-full">Kota / Lembaga Asal</p>
							<TextInput
								form={form}
								name="kota_atau_lembaga"
								isDisabled={disabled}
								className="w-full"
								placeholder="Masukkan lembaga"
							/>
						</div>
						<div className="hidden md:w-1/2 md:block" />
					</div>
				)}
			</div>
		</>
	);
}
