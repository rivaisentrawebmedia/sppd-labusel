import dayjs from "dayjs";
import type { BukuTamuByID } from "../../model";
import { convertFromSnakeCase } from "@/utils/helpers";

export function DetailInformasiPengujung({
	data,
}: {
	data: BukuTamuByID | undefined;
}) {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-md p-4 shadow w-full">
				<div className="flex flex-col gap-4">
					<p className="text-[#272CCD] font-medium text-lg">
						Informasi Pengunjung
					</p>
					<div className="flex flex-col gap-2">
						<LabelComponent
							label="Tanggal Kunjungan"
							value={
								data?.tanggal_kunjungan
									? dayjs(data?.tanggal_kunjungan)
											.locale("id")
											.format("DD MMMM YYYY")
									: "-"
							}
						/>
						<LabelComponent label="NIK" value={data?.nik || "-"} />
						<LabelComponent label="Nama Lengkap" value={data?.nama || "-"} />
						<LabelComponent label="No. HP" value={data?.no_hp || "-"} />
						<LabelComponent
							label="Asal / Instansi"
							value={
								data?.asal_tamu ? convertFromSnakeCase(data?.asal_tamu) : "-"
							}
						/>
						<LabelComponent
							label="Alamat Lengkap"
							value={data?.alamat || "-"}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-[#272CCD] font-medium text-lg">
						Informasi Kunjungan
					</p>
					<div className="flex flex-col gap-2">
						<LabelComponent
							label="Jenis Keperluan"
							value={data?.jenis_keperluan || "-"}
						/>
						<LabelComponent
							label="Tujuan Bertamu"
							value={data?.tujuan_bertamu || "-"}
						/>
					</div>
				</div>
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
