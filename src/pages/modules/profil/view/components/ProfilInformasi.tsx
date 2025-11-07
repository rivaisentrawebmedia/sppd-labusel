import type { ReactNode } from "react";
import type { Profil } from "../../model";
import { Image } from "@/components/common/image/getImage";
import dayjs from "dayjs";

export function ProfilInformasi({ data }: { data: Profil | undefined }) {
	return (
		<>
			<div className="flex flex-col gap-2 md:gap-4 w-full md:flex-row">
				<Image
					alt={data?.nama_warga || ""}
					src={data?.photo || ""}
					classNameImage="w-[11rem] h-[14rem] rounded-md object-cover"
					classNamePlaceHolder="w-[11rem] h-[14rem] rounded-md bg-[#f5f5ff] flex items-center justify-center text-primary/50 font-semibold text-3xl border border-primary/20 uppercase select-none"
				/>
				<div className="flex flex-col gap-3 w-full flex-1">
					<p className="text-xl font-semibold">{data?.nama_warga || "-"}</p>
					<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 flex-1">
						<LabelComponent label="No. KK" value={data?.no_kk || "-"} />
						<LabelComponent label="NIK" value={data?.nik || "-"} />
						<LabelComponent
							label="Tempat Lahir"
							value={data?.tempat_lahir || "-"}
						/>
						<LabelComponent
							label="Tanggal Lahir"
							value={
								data?.tanggal_lahir
									? dayjs(data?.tanggal_lahir)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
						/>
						<LabelComponent
							label="Jenis Kelamin"
							value={data?.jenis_kelamin || "-"}
						/>
						<LabelComponent label="Agama" value={data?.agama || "-"} />
						<LabelComponent label="Suku" value={data?.suku || "-"} />
						<LabelComponent
							label="Golongan Darah"
							value={data?.golongan_darah || "-"}
						/>
						<LabelComponent
							label="Kewarganegaraan"
							value={
								<p className="uppercase">{data?.kewarganegaraan || "-"}</p>
							}
						/>
						<LabelComponent
							label="Disabilitas"
							value={data?.disabilitas || "-"}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export function LabelComponent({
	label,
	value,
}: {
	label: string;
	value: string | ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2 md:gap-4 md:flex-row w-full">
			<p className="text-[#9A9A9B] w-full">{label}</p>
			<div className="text-[#222222] w-full">{value}</div>
		</div>
	);
}
