import type { Profil } from "../../model";
import { LabelProfil } from "./ProfilStatusKependudukan";

export function ProfilAlamat({ data }: { data: Profil | undefined }) {
	return (
		<div className="flex flex-col gap-3">
			<LabelProfil label="No. Telepon" value={data?.no_telp || "-"} />
			<LabelProfil label="Email" value={data?.email || "-"} />
			<LabelProfil label="Alamat Lengkap" value={data?.alamat || "-"} />
		</div>
	);
}
