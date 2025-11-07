import { polygonToImage } from "@/utils/polygonToImage";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../model";
import { PreviewBedaIdentitas } from "./printSKBedaIdentitas/preview";
import { PreviewBelumMemilikiPBB } from "./printSKBelumMemilikiPBB/preview";
import { PreviewBepergian } from "./printSKBepergian/preview";
import { PreviewDomisili } from "./printSKDomisili/preview";
import { PreviewDomisiliPerusahaan } from "./printSKDomisiliPerusahaan/preview";
import { PreviewGhaib } from "./printSKGhaib/preview";
import { PreviewMasukKerja } from "./printSKIzinTidakMasukKerja/preview";
import { PreviewSKJamkesos } from "./printSKJamkesos/preview";
import { PreviewJandaDuda } from "./printSKJandaDuda/preview";
import { PreviewJualBeli } from "./printSKJualBeli/preview";
import { PreviewJualBeliTanah } from "./printSKJualBeliTanah/preview";
import { PreviewKelahiran } from "./printSKKelahiran/preview";
import { PreviewKematian } from "./printSKKematian/preview";
import { PreviewSKKepemilikanKendaraan } from "./printSKKepemilikanKendaraan/preview";
import { PreviewSKKepemilikanTanah } from "./printSKKepemilikanTanah/preview";
import { PreviewSKDalamProses } from "./printSKKTPDalamProses/preview";
import { PreviewSKLahirMati } from "./printSKLahirMati/preview";
import { PreviewPenghasilan } from "./printSKPenghasilan/preview";
import { PreviewSKPergiKawin } from "./printSKPergiKawin/preview";
import { PreviewSKSKPRujuk } from "./printSKPRujuk/preview";
import { PreviewResiKTPSementara } from "./printSKResiKTPSementara/preview";
import { PreviewStatusPerkawinan } from "./printSKStatusPerkawinan/preview";
import { PreviewTidakMampu } from "./printSKTidakMampu/preview";
import { PreviewSKUntukNikahNonMuslim } from "./printSKUntukNikahNonMuslim/preview";
import { PreviewSKUsaha } from "./printSKUsaha/preview";
import { PreviewSKWaliHakim } from "./printSKWaliHakim/preview";
import { PreviewSPAktaLahir } from "./printSPAktaLahir/preview";
import { PreviewSPBelumMemilikiAktaLahir } from "./printSPBelumMemilikiAktaLahir/preview";
import { PreviewSPCatatanKepolisian } from "./printSPCatatanKepolisian/preview";
import { PreviewSPCerai } from "./printSPCerai/preview";
import { PreviewSPDuplikatKelahiran } from "./printSPDuplikatKelahiran/preview";
import { PreviewSPDuplikatSuratNikah } from "./printSPDuplikatSuratNikah/preview";
import { PreviewSKFisikTanah } from "./printSPFisikTanah/preview";
import { PreviewSKIzinOrangTua } from "./printSPIzinOrangTua/preview";
import { PreviewSKKartuKeluarga } from "./printSPKartuKeluarga/preview";
import { PreviewSPKehilangan } from "./printSPKehilangan/preview";
import { PreviewSKPermohonanPenerbitanBukuPasLintasBatas } from "./printSPPermohonanPenerbitanBukuPasLintasBatas/preview";
import { PreviewSPPernikahan } from "./printSPPernikahan/preview";
import { PreviewSKPerubahanKartuKeluarga } from "./printSPPerubahaKartuKeluarga/preview";
import { PreviewSPPindahDomisili } from "./printSPPindahDomisili/preview";
import { PreviewSRIzinKeramaian } from "./printSRIzinKeramaian/preview";
import { PreviewSuratKuasa } from "./printSuratKuasa/preview";
import { PreviewSuratTugas } from "./printSuratTugas/preview";
import { PreviewSKBiodataWarga } from "./suratKeteranganBiodataWarga/preview";
import { PreviewBelumMenikah } from "./printSKBelumMenikah/preview";

export const showDetailSurat = (
	jenis: string,
	dataUpdate: ResKopSuratType,
	profilDesa: ResProfilDesaType,
	surat: ResKotakSuratDetailType
) => {
	const sketchInit = surat?.sketch;
	const sketchAnu = surat?.sketch ? JSON.parse(sketchInit) : undefined;
	const sketch = polygonToImage(sketchAnu);

	switch (jenis) {
		case "Surat Keterangan Domisili":
			return (
				<PreviewDomisili
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Belum Pernah Menikah":
			return (
				<PreviewBelumMenikah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Pengantar Rujuk / Cerai":
			return (
				<PreviewSKSKPRujuk
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Biodata Warga":
			return (
				<PreviewSKBiodataWarga
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pengantar Permohonan Penerbitan Buku Pas Lintas Batas":
			return (
				<PreviewSKPermohonanPenerbitanBukuPasLintasBatas
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Untuk Nikah Warga Non Muslim":
			return (
				<PreviewSKUntukNikahNonMuslim
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Orang Tua":
			return (
				<PreviewSKIzinOrangTua
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Suami":
			return (
				<PreviewSKIzinOrangTua
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Istri":
			return (
				<PreviewSKIzinOrangTua
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Keluarga":
			return (
				<PreviewSKIzinOrangTua
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Kepemilikan Tanah":
			return (
				<PreviewSKKepemilikanTanah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pernyataan Penguasaan Fisik Bidang Tanah (Sporadik)":
			return (
				<PreviewSKFisikTanah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Perubahan Kartu Keluarga":
			return (
				<PreviewSKPerubahanKartuKeluarga
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Kartu Keluarga":
			return (
				<PreviewSKKartuKeluarga
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Akta Lahir":
			return (
				<PreviewSPAktaLahir
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pernyataan Belum Memiliki Akta Lahir":
			return (
				<PreviewSPBelumMemilikiAktaLahir
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Duplikat Kelahiran":
			return (
				<PreviewSPDuplikatKelahiran
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Duplikat Surat Nikah":
			return (
				<PreviewSPDuplikatSuratNikah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Cerai":
			return (
				<PreviewSPCerai
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Jamkesos":
			return (
				<PreviewSKJamkesos
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan KTP dalam Proses":
			return (
				<PreviewSKDalamProses
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Lahir Mati":
			return (
				<PreviewSKLahirMati
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Pergi Kawin":
			return (
				<PreviewSKPergiKawin
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Wali Hakim":
			return (
				<PreviewSKWaliHakim
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Kepemilikan Kendaraan":
			return (
				<PreviewSKKepemilikanKendaraan
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Jual Beli":
			return (
				<PreviewJualBeli
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Jual Beli Tanah":
			return (
				<PreviewJualBeliTanah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
					sketch={sketch || ""}
				/>
			);
		case "Surat Keterangan Belum Memiliki Pajak Bumi dan Bangunan":
			return (
				<PreviewBelumMemilikiPBB
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Domisili Perusahaan":
			return (
				<PreviewDomisiliPerusahaan
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Tidak Mampu":
			return (
				<PreviewTidakMampu
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Kelahiran":
			return (
				<PreviewKelahiran
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Pindah Domisili":
			return (
				<PreviewSPPindahDomisili
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Kematian":
			return (
				<PreviewKematian
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Usaha":
			return (
				<PreviewSKUsaha
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Bepergian":
			return (
				<PreviewBepergian
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Penghasilan":
			return (
				<PreviewPenghasilan
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Izin Tidak Kerja":
			return (
				<PreviewMasukKerja
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Status Perkawinan":
			return (
				<PreviewStatusPerkawinan
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Resi KTP Sementara":
			return (
				<PreviewResiKTPSementara
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Janda Duda":
			return (
				<PreviewJandaDuda
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Beda Identitas":
			return (
				<PreviewBedaIdentitas
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Ghaib":
			return (
				<PreviewGhaib
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Pengantar Catatan Kepolisian":
			return (
				<PreviewSPCatatanKepolisian
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Pengantar Kehilangan":
			return (
				<PreviewSPKehilangan
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Rekomendasi Izin Keramaian":
			return (
				<PreviewSRIzinKeramaian
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Kuasa":
			return (
				<PreviewSuratKuasa
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Tugas":
			return (
				<PreviewSuratTugas
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Pengantar Pernikahan":
			return <PreviewSPPernikahan profilDesa={profilDesa} surat={surat} />;
		default:
			return <></>;
	}
};
