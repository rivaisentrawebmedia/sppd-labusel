import type { Profil } from "../../model";

export function ProfilStatusKependudukan({
	data,
}: {
	data: Profil | undefined;
}) {
	return (
		<div className="flex flex-col gap-3">
			<LabelProfil
				label="Kepala Keluarga"
				value={data?.is_kepala_keluarga ? "Ya" : "Tidak"}
			/>
			<LabelProfil
				label="Status"
				value={data?.is_active ? "Tidak Aktif" : "Aktif"}
			/>
		</div>
	);
}

export function LabelProfil({
	label,
	value,
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
			<p className="w-full md:w-[20rem] text-[#9C9C9C]">{label}</p>
			<p className="texr-[#222222] flex-1">{value}</p>
		</div>
	);
}
