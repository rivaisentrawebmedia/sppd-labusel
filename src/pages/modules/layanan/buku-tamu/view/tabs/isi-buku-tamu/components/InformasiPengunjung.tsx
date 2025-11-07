import { useGetProfil } from "@/pages/modules/profil/controller";
import type { UseFormReturn } from "react-hook-form";
import type { BukuTamuByID, BukuTamuPayload } from "../../../../model";
import TextInput from "@/components/common/form-input/TextInput";
import { useGetPublikInfo } from "@/layouts/constroller";
import { Skeleton } from "@/components/ui/skeleton";

export function InformasiPengunjung({
	disabled,
	form,
	bowo,
}: {
	form: UseFormReturn<BukuTamuPayload>;
	disabled: boolean;
	bowo: BukuTamuByID | undefined;
}) {
	const { data, loading: loadingProfil } = useGetProfil();
	const { loading: loadingPublik, publikInfo } = useGetPublikInfo();

	const isLoading = loadingProfil || loadingPublik;
	const isWargaDesa = data?.is_warga_desa === true;
	const isWargaPendatang = data?.is_warga_desa === false;

	const lembaga = bowo?.kota_atau_lembaga;
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<p className="font-medium text-lg">Data Pengunjung</p>
				</div>

				{/* Skeleton saat loading */}
				{isLoading ? (
					<div className="animate-pulse space-y-4 mt-2">
						<div className="h-5 bg-gray-200 rounded w-1/3"></div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="flex flex-col gap-2 md:flex-row md:gap-4"
								>
									<Skeleton className="w-full h-4 bg-gray-200 rounded" />
									<Skeleton className="w-full h-4 bg-gray-200 rounded" />
								</div>
							))}
						</div>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2 md:flex-row md:gap-4">
								<p className="text-[#9C9C9C] w-full">
									Tanggal Kunjungan <span className="text-red-500">*</span>
								</p>
								<TextInput
									form={form}
									name="tanggal_kunjungan"
									isDisabled={disabled}
									type="date"
									className="w-full"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<LabelComponent
								label="Nomor Induk Kependudukan"
								value={data?.nik || "-"}
							/>
							<LabelComponent
								label="Nama Lengkap"
								value={data?.nama_warga || "-"}
							/>
							<LabelComponent label="No. HP" value={data?.no_telp || "-"} />
							<LabelComponent
								label="Asal"
								value={
									isWargaDesa
										? "Warga Desa"
										: isWargaPendatang
										? "Pendatang"
										: "-"
								}
							/>
							<LabelComponent
								label="Kota / Lembaga Asal"
								value={
									isWargaDesa && publikInfo
										? publikInfo?.nama_desa
										: lembaga || "-"
								}
							/>
							<LabelComponent
								label="Alamat Lengkap"
								value={data?.alamat || "-"}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

function LabelComponent({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-2 md:flex-row md:gap-4">
			<p className="text-[#9C9C9C] w-full">{label}</p>
			<p className="w-full">{value}</p>
		</div>
	);
}
