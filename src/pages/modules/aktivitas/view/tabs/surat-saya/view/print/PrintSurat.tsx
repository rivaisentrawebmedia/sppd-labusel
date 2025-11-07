import { polygonToImage } from "@/utils/polygonToImage";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../model";
import { PrintSKDomisili } from "./printSKDomisili";
import { PrintSKBiodataWarga } from "./suratKeteranganBiodataWarga";
import { PrintSKPermohonanPenerbitanBukuPasLintasBatas } from "./printSPPermohonanPenerbitanBukuPasLintasBatas";
import { PrintSKUntukNikahNonMuslim } from "./printSKUntukNikahNonMuslim";
import { PrintSKIzinOrangTua } from "./printSPIzinOrangTua";
import { PrintSKKepemilikanTanah } from "./printSKKepemilikanTanah";
import { PrintSKFisikTanah } from "./printSPFisikTanah";
import { PrintSKPerubahanKartuKeluarga } from "./printSPPerubahaKartuKeluarga";
import { PrintSKKartuKeluarga } from "./printSPKartuKeluarga";
import { PrintSKSKPRujuk } from "./printSKPRujuk";
import { PrintSPAktaLahir } from "./printSPAktaLahir";
import { PrintSPBelumMemilikiAktaLahir } from "./printSPBelumMemilikiAktaLahir";
import { PrintSPDuplikatKelahiran } from "./printSPDuplikatKelahiran";
import { PrintSPDuplikatSuratNikah } from "./printSPDuplikatSuratNikah";
import { PrintSPCerai } from "./printSPCerai";
import { PrintSKJamKesos } from "./printSKJamkesos";
import { PrintSKKTPDalamProses } from "./printSKKTPDalamProses";
import { PrintSKLahirMati } from "./printSKLahirMati";
import { PrintSKPergiKawin } from "./printSKPergiKawin";
import { PrintSKWaliHakim } from "./printSKWaliHakim";
import { PrintSKKepemilikanKendaraan } from "./printSKKepemilikanKendaraan";
import { PrintSKJualBeli } from "./printSKJualBeli";
import { PrintSKJualBeliTanah } from "./printSKJualBeliTanah";
import { PrintSKBelumMemilikiPBB } from "./printSKBelumMemilikiPBB";
import { PrintSPPIndahDomisili } from "./printSPPindahDomisili";
import { PrintSKDomisiliPerusahaan } from "./printSKDomisiliPerusahaan";
import { PrintSKTidakMampu } from "./printSKTidakMampu";
import { PrintSKKelahiran } from "./printSKKelahiran";
import { PrintSKKematian } from "./printSKKematian";
import { PrintSKUsaha } from "./printSKUsaha";
import { PrintSKBepergian } from "./printSKBepergian";
import { PrintSKPenghasilan } from "./printSKPenghasilan";
import { PrintSKIzinTidakMasukKerja } from "./printSKIzinTidakMasukKerja";
import { PrintSKStatusPerkawinan } from "./printSKStatusPerkawinan";
import { PrintSKResiKTPSementara } from "./printSKResiKTPSementara";
import { PrintSKJandaDuda } from "./printSKJandaDuda";
import { PrintSKGhaib } from "./printSKGhaib";
import { PrintSKBedaIdentitas } from "./printSKBedaIdentitas";
import { PrintSPCatatanKepolisian } from "./printSPCatatanKepolisian";
import { PrintSPKehilangan } from "./printSPKehilangan";
import { PrintSRIzinKeramaian } from "./printSRIzinKeramaian";
import { PrintSuratKuasa } from "./printSuratKuasa";
import { PrintSuratTugas } from "./printSuratTugas";
import { PrintSPPernikahan } from "./printSPPernikahan";
import { PrintSKBelumMenikah } from "./printSKBelumMenikah";

export const PrintSurat = (
	jenis: string,
	dataUpdate: ResKopSuratType,
	profilDesa: ResProfilDesaType,
	surat: ResKotakSuratDetailType
) => {
	const sketchInit = surat?.sketch;
	const sketchAnu = surat?.sketch ? JSON.parse(sketchInit) : undefined;
	const sketch = polygonToImage(sketchAnu);

	switch (jenis) {
		case "Surat Keterangan Belum Pernah Menikah":
			return (
				<PrintSKBelumMenikah
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Domisili":
			return (
				<PrintSKDomisili
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Biodata Warga":
			return (
				<PrintSKBiodataWarga
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pengantar Permohonan Penerbitan Buku Pas Lintas Batas":
			return (
				<PrintSKPermohonanPenerbitanBukuPasLintasBatas
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Untuk Nikah Warga Non Muslim":
			return (
				<PrintSKUntukNikahNonMuslim
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Orang Tua":
			return (
				<PrintSKIzinOrangTua
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Suami":
			return (
				<PrintSKIzinOrangTua
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Istri":
			return (
				<PrintSKIzinOrangTua
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Izin Keluarga":
			return (
				<PrintSKIzinOrangTua
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Kepemilikan Tanah":
			return (
				<PrintSKKepemilikanTanah
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pernyataan Penguasaan Fisik Bidang Tanah (Sporadik)":
			return (
				<PrintSKFisikTanah
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Perubahan Kartu Keluarga":
			return (
				<PrintSKPerubahanKartuKeluarga
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Kartu Keluarga":
			return (
				<PrintSKKartuKeluarga
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Pengantar Rujuk / Cerai":
			return (
				<PrintSKSKPRujuk
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Akta Lahir":
			return (
				<PrintSPAktaLahir
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Pernyataan Belum Memiliki Akta Lahir":
			return (
				<PrintSPBelumMemilikiAktaLahir
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Duplikat Kelahiran":
			return (
				<PrintSPDuplikatKelahiran
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Duplikat Surat Nikah":
			return (
				<PrintSPDuplikatSuratNikah
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Permohonan Cerai":
			return (
				<PrintSPCerai
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Jamkesos":
			return (
				<PrintSKJamKesos
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan KTP dalam Proses":
			return (
				<PrintSKKTPDalamProses
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Lahir Mati":
			return (
				<PrintSKLahirMati
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Pergi Kawin":
			return (
				<PrintSKPergiKawin
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Wali Hakim":
			return (
				<PrintSKWaliHakim
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Kepemilikan Kendaraan":
			return (
				<PrintSKKepemilikanKendaraan
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Jual Beli":
			return (
				<PrintSKJualBeli
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);

		case "Surat Keterangan Jual Beli Tanah":
			return (
				<PrintSKJualBeliTanah
					jenis_surat={jenis}
					kopSurat={dataUpdate}
					profilDesa={profilDesa}
					surat={surat}
					sketch={sketch || ""}
				/>
			);
		case "Surat Keterangan Belum Memiliki Pajak Bumi dan Bangunan":
			return (
				<PrintSKBelumMemilikiPBB
					kopSurat={dataUpdate}
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
				/>
			);
		case "Surat Keterangan Pindah Domisili":
			return (
				<PrintSPPIndahDomisili
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);
		case "Surat Keterangan Domisili Perusahaan":
			return (
				<PrintSKDomisiliPerusahaan
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Tidak Mampu":
			return (
				<PrintSKTidakMampu
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Kelahiran":
			return (
				<PrintSKKelahiran
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Kematian":
			return (
				<PrintSKKematian
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Usaha":
			return (
				<PrintSKUsaha
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Bepergian":
			return (
				<PrintSKBepergian
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Penghasilan":
			return (
				<PrintSKPenghasilan
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Izin Tidak Kerja":
			return (
				<PrintSKIzinTidakMasukKerja
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Status Perkawinan":
			return (
				<PrintSKStatusPerkawinan
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Resi KTP Sementara":
			return (
				<PrintSKResiKTPSementara
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Janda Duda":
			return (
				<PrintSKJandaDuda
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Ghaib":
			return (
				<PrintSKGhaib
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Keterangan Beda Identitas":
			return (
				<PrintSKBedaIdentitas
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Pengantar Catatan Kepolisian":
			return (
				<PrintSPCatatanKepolisian
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Pengantar Kehilangan":
			return (
				<PrintSPKehilangan
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Rekomendasi Izin Keramaian":
			return (
				<PrintSRIzinKeramaian
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Kuasa":
			return (
				<PrintSuratKuasa
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Tugas":
			return (
				<PrintSuratTugas
					jenis_surat={jenis}
					profilDesa={profilDesa}
					surat={surat}
					kopSurat={dataUpdate}
				/>
			);

		case "Surat Pengantar Pernikahan":
			return <PrintSPPernikahan profilDesa={profilDesa} surat={surat} />;

		default:
			return <></>;
	}
};
