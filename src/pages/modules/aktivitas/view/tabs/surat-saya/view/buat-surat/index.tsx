import { FormSuratKeteranganBedaIdentitas } from "./surat-keterangan-beda-identitas/view";
import { FormSuratKeteranganBelumMemilikiPajakPBB } from "./surat-keterangan-belum-memiliki-pbb/view";
import { FormSuratKeteranganBelumPernahMenikah } from "./surat-keterangan-belum-pernah-menikah/view";
import { FormSuratKeteranganBepergian } from "./surat-keterangan-bepergian/view";
import { FormSuratKeteranganBiodata } from "./surat-keterangan-biodata/view";
import { FormSuratKeteranganDomisiliPerusahaan } from "./surat-keterangan-domisili-perusahaan/view";
import { FormSuratKeteranganDomisili } from "./surat-keterangan-domisili/view";
import { FormSuratKeteranganGhaib } from "./surat-keterangan-ghaib/view";
import { FormSuratKeteranganIzinOrtu } from "./surat-keterangan-izin-ortu-suami-istri/view";
import { FormSuratKeteranganIzinTidakMasukKerja } from "./surat-keterangan-izin-tidak-kerja/view";
import { FormSuratKeteranganJamkesos } from "./surat-keterangan-jamkesos/view";
import { FormSuratKeteranganJandaDuda } from "./surat-keterangan-janda-duda/view";
import { FormSuratKeteranganJualBeliTanah } from "./surat-keterangan-jual-beli-tanah/view";
import { FormSuratKeteranganJualBeli } from "./surat-keterangan-jual-beli/view";
import { FormSuratKeteranganKelahiran } from "./surat-keterangan-kelahiran/view";
import { FormSuratKeteranganKematian } from "./surat-keterangan-kematian/view";
import { FormSuratKeteranganKepemilikanKendaraan } from "./surat-keterangan-kepemilikan-kendaraan/view";
import { FormSuratKeteranganKepemilikanTanah } from "./surat-keterangan-kepemilikan-tanah/view";
import { FormSuratKeteranganKTPDiproses } from "./surat-keterangan-ktp-diproses/view";
import { FormSuratKeteranganLahirMati } from "./surat-keterangan-lahir-mati/view";
import { FormSuratKeteranganNikahWargaNonMuslim } from "./surat-keterangan-nikah-untuk-warga-non-muslim/view";
import { FormSuratKeteranganPengantarCerai } from "./surat-keterangan-pengantar-rujuk/view";
import { FormSuratKeteranganPenghasilan } from "./surat-keterangan-penghasilan/view";
import { FormSuratKeteranganPergiKawin } from "./surat-keterangan-pergi-kawin/view";
import { FormSuratKeteranganResiKTPSementara } from "./surat-keterangan-resi-ktp/view";
import { FormSuratKeteranganStatusPerkawinan } from "./surat-keterangan-status-perkawinan/view";
import { FormSuratKeteranganTidakMampu } from "./surat-keterangan-tidak-mampu/view";
import { FormSuratKeteranganUsaha } from "./surat-keterangan-usaha/view";
import { FormSuratKeteranganWaliHakim } from "./surat-keterangan-wali-hakim/view";
import { FormSuratKuasa } from "./surat-kuasa/view";
import { FormSuratPengantarCatatanKepolisian } from "./surat-pengantar-catatan-kepolisian/view";
import { FormSuratPengantarKehilangan } from "./surat-pengantar-kehilangan/view";
import { FormSuratPengantarPermohonanPenerbitanBukuPasLintas } from "./surat-pengantar-pemohonan-penerbitan-buku-pas-lintas-batas/view";
import { FormSuratPengantarPenikahan } from "./surat-pengantar-pernikahan/view";
import { FormSuratPengantarPindahDomisili } from "./surat-pengantar-pindah-domisili/view";
import { FormSuratPermohonanAktaLahir } from "./surat-permohonan-akta-lahir/view";
import { FormSuratKeteranganPermohonanCerai } from "./surat-permohonan-cerai/view";
import { FormSuratPermohonanDuplikatKelahiran } from "./surat-permohonan-duplikat-kelahiran/view";
import { FormSuratPermohonanDuplikatSuratNikah } from "./surat-permohonan-duplikat-surat-nikah/view";
import { FormSuratPermohonanPermohonanKK } from "./surat-permohonan-kk/view";
import { FormSuratPermohonanPerubahanKK } from "./surat-permohonan-perubahan-kk/view";
import { FormSuratPernyataanBelumMemilikiAktaLahir } from "./surat-pernyataan-belum-memiliki-akta-lahir/view";
import { FormSuratPernyataanPenguasaanFisikBidangTanah } from "./surat-pernyataan-penguasaan-fisik-bidang-tanah/view";
import { FormSuratRekomendasiKeramaian } from "./surat-rekomendasi-keramaian/view";
import { FormSuratTugas } from "./surat-tugas/view";

export const buatSurat = (jenis: string) => {
	switch (jenis) {
		case "Surat Keterangan Beda Identitas":
			return <FormSuratKeteranganBedaIdentitas />;
		case "Surat Keterangan Bepergian":
			return <FormSuratKeteranganBepergian />;
		case "Surat Keterangan Biodata":
			return <FormSuratKeteranganBiodata />;
		case "Surat Keterangan Domisili":
			return <FormSuratKeteranganDomisili />;
		case "Surat Keterangan Domisili Perusahaan":
			return <FormSuratKeteranganDomisiliPerusahaan />;
		case "Surat Keterangan Ghaib":
			return <FormSuratKeteranganGhaib />;
		case "Surat Keterangan Izin Tidak Masuk Kerja":
			return <FormSuratKeteranganIzinTidakMasukKerja />;
		case "Surat Keterangan JAMKESOS":
			return <FormSuratKeteranganJamkesos />;
		case "Surat Keterangan Janda / Duda":
			return <FormSuratKeteranganJandaDuda />;
		case "Surat Keterangan Kelahiran":
			return <FormSuratKeteranganKelahiran />;
		case "Surat Keterangan Kematian":
			return <FormSuratKeteranganKematian />;
		case "Surat Keterangan Kepemilikan Tanah":
			return <FormSuratKeteranganKepemilikanTanah />;
		case "Surat Keterangan Penghasilan":
			return <FormSuratKeteranganPenghasilan />;
		case "Surat Keterangan Usaha":
			return <FormSuratKeteranganUsaha />;
		case "Surat Kuasa":
			return <FormSuratKuasa />;
		case "Surat Pengantar Kehilangan":
			return <FormSuratPengantarKehilangan />;
		case "Surat Keterangan Pindah Domisili":
			return <FormSuratPengantarPindahDomisili />;
		case "Surat Permohonan Cerai":
			return <FormSuratKeteranganPermohonanCerai />;
		case "Surat Permohonan Kartu Keluarga":
			return <FormSuratPermohonanPermohonanKK />;
		case "Surat Permohonan Perubahan Kartu Keluarga":
			return <FormSuratPermohonanPerubahanKK />;
		case "Surat Rekomendasi Izin Keramaian":
			return <FormSuratRekomendasiKeramaian />;
		case "Surat Keterangan Wali Hakim":
			return <FormSuratKeteranganWaliHakim />;
		case "Surat Keterangan Resi KTP Sementara":
			return <FormSuratKeteranganResiKTPSementara />;
		case "Surat Keterangan Tidak Mampu":
			return <FormSuratKeteranganTidakMampu />;
		case "Surat Keterangan Status Perkawinan":
			return <FormSuratKeteranganStatusPerkawinan />;

		case "Surat Keterangan KTP dalam Proses":
			return <FormSuratKeteranganKTPDiproses />;

		case "Surat Keterangan Pergi Kawin":
			return <FormSuratKeteranganPergiKawin />;

		case "Surat Keterangan Kepemilikan Kendaraan":
			return <FormSuratKeteranganKepemilikanKendaraan />;

		case "Surat Keterangan Lahir Mati":
			return <FormSuratKeteranganLahirMati />;

		case "Surat Keterangan Belum Memiliki Pajak Bumi dan Bangunan":
			return <FormSuratKeteranganBelumMemilikiPajakPBB />;

		case "Surat Pengantar Catatan Kepolisian":
			return <FormSuratPengantarCatatanKepolisian />;
		case "Surat Keterangan Belum Pernah Menikah":
			return <FormSuratKeteranganBelumPernahMenikah />;
		case "Surat Pernyataan Penguasaan Fisik Bidang Tanah (SPORADIK)":
			return <FormSuratPernyataanPenguasaanFisikBidangTanah />;
		case "Surat Keterangan Izin Orang Tua/Suami/Istri":
			return <FormSuratKeteranganIzinOrtu />;
		case "Surat Keterangan Pengantar Rujuk/Cerai":
			return <FormSuratKeteranganPengantarCerai />;
		case "Surat Permohonan Duplikat Surat Nikah":
			return <FormSuratPermohonanDuplikatSuratNikah />;
		case "Surat Permohonan Duplikat Kelahiran":
			return <FormSuratPermohonanDuplikatKelahiran />;
		case "Surat Permohonan Belum Memiliki Akta Lahir":
			return <FormSuratPernyataanBelumMemilikiAktaLahir />;
		case "Surat Permohonan Akta Lahir":
			return <FormSuratPermohonanAktaLahir />;
		case "Surat Keterangan Jual Beli":
			return <FormSuratKeteranganJualBeli />;
		case "Surat Keterangan Jual Beli Tanah":
			return <FormSuratKeteranganJualBeliTanah />;

		case "Surat Tugas":
			return <FormSuratTugas />;
		case "Surat Pengantar Permohonan Penerbitan Buku Pas Lintas":
			return <FormSuratPengantarPermohonanPenerbitanBukuPasLintas />;

		case "Surat Keterangan Untuk Nikah Warga Non Muslim":
			return <FormSuratKeteranganNikahWargaNonMuslim />;

		case "Surat Pengantar Pernikahan":
			return <FormSuratPengantarPenikahan />;

		default:
			return <></>;
	}
};
