import dayjs from "dayjs";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { toRoman } from "@/utils/helpers";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

function mapStyle({
	font,
	style,
	size,
}: {
	font: string;
	style: string;
	size: string;
}) {
	return {
		font,
		bold: style.toLowerCase() === "bold",
		italics: style.toLowerCase() === "italic",
		fontSize: parseInt(size),
	};
}

export type Surat = {
	surat: ResKotakSuratDetailType;
	jenis_surat: string;
	profil_desa: ResProfilDesaType;
	isCetak?: boolean;
	kop_surat: ResKopSuratType;
	website: string;
};

export function generatePdfSurat(data: Surat) {
	const { kop_surat, jenis_surat, profil_desa, surat, website } = data;

	const {
		logo_base64,
		isi_1,
		jenis_font_1,
		gaya_font_1,
		ukuran_font_1,
		isi_2,
		jenis_font_2,
		gaya_font_2,
		ukuran_font_2,
		isi_3,
		jenis_font_3,
		gaya_font_3,
		ukuran_font_3,
		isi_4,
		jenis_font_4,
		gaya_font_4,
		ukuran_font_4,
		isi_5,
		jenis_font_5,
		gaya_font_5,
		ukuran_font_5,
		isi_6,
		jenis_font_6,
		gaya_font_6,
		ukuran_font_6,
	} = kop_surat;

	const contentTexts = [
		{
			text: isi_1 || "",
			...mapStyle({
				font: jenis_font_1,
				style: gaya_font_1,
				size: ukuran_font_1,
			}),
		},
		{
			text: isi_2 || "",
			...mapStyle({
				font: jenis_font_2,
				style: gaya_font_2,
				size: ukuran_font_2,
			}),
		},
		{
			text: isi_3 || "",
			...mapStyle({
				font: jenis_font_3,
				style: gaya_font_3,
				size: ukuran_font_3,
			}),
		},
		{
			text: isi_4 || "",
			...mapStyle({
				font: jenis_font_4,
				style: gaya_font_4,
				size: ukuran_font_4,
			}),
		},
		{
			text: isi_5 || "",
			...mapStyle({
				font: jenis_font_5,
				style: gaya_font_5,
				size: ukuran_font_5,
			}),
		},
		...(isi_6
			? [
					{
						text: isi_6 || "",
						...mapStyle({
							font: jenis_font_6,
							style: gaya_font_6,
							size: ukuran_font_6,
						}),
					},
			  ]
			: []),
	];

	const pad = "\u00A0".repeat(5);

	return {
		content: [
			// ✅ Kop Surat
			{
				columns: logo_base64
					? [
							{
								image: `data:image/png;base64,${logo_base64}`,
								width: 80,
								height: 80,
							},
							{ width: "*", alignment: "center", stack: contentTexts },
					  ]
					: [{ width: "*", alignment: "center", stack: contentTexts }],
				columnGap: 10,
				margin: [0, 0, 0, 10],
			},
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},
			// ✅ Judul & Nomor Surat
			{
				text: jenis_surat?.toUpperCase(),
				alignment: "center",
				bold: true,
				fontSize: 15,
				decoration: "underline",
			},
			{
				text: `Nomor: ${surat?.kode_depan ? `${surat?.kode_depan}/` : ""}${
					surat?.nomor_surat ? `${surat?.nomor_surat}/` : `${pad}/`
				}${surat?.kode_belakang ? `${surat?.kode_belakang}/` : ""}${toRoman(
					Number(dayjs(surat?.tanggal_surat).locale("id").format("MM"))
				)}/${dayjs(surat?.tanggal_surat).locale("id").format("YYYY")}`,
				alignment: "center",
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},
			// ✅ Paragraf pembuka
			{
				text: `Yang bertanda tangan di bawah ini, atas nama ${surat?.disahkan_oleh} ${profil_desa?.nama_organisasi} Kecamatan ${profil_desa?.Kecamatan} Kabupaten ${profil_desa?.Kabupaten} dengan ini menerangkan bahwa:`,
				fontSize: 10,
				margin: [0, 0, 0, 5],
			},
			// ✅ Data diri
			{
				table: {
					widths: ["25%", "75%"],
					body: [
						[
							{ text: "NIK", fontSize: 10 },
							{ text: `: ${surat?.nik || ""}`, fontSize: 10 },
						],
						[
							{ text: "Nama", fontSize: 10 },
							{ text: `: ${surat?.nama || ""}`, fontSize: 10 },
						],
						[
							{ text: "Tempat, Tanggal Lahir", fontSize: 10 },
							{
								text: `: ${surat?.tempat_lahir || ""}, ${
									surat?.tanggal_lahir
										? dayjs(surat?.tanggal_lahir)
												.locale("id")
												.format("DD MMMM YYYY")
										: ""
								}`,
								fontSize: 10,
							},
						],
						[
							{ text: "Jenis Kelamin", fontSize: 10 },
							{
								text: `: ${
									surat?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"
								}`,
								fontSize: 10,
							},
						],
						[
							{ text: "Agama", fontSize: 10 },
							{ text: `: ${surat?.agama || ""}`, fontSize: 10 },
						],
						[
							{ text: "Pekerjaan", fontSize: 10 },
							{ text: `: ${surat?.pekerjaan || ""}`, fontSize: 10 },
						],
						[
							{ text: "Alamat Lengkap", fontSize: 10 },
							{ text: `: ${surat?.alamat || ""}`, fontSize: 10 },
						],
					],
				},
				layout: "noBorders",
				margin: [20, 0, 0, 10],
			},
			// ✅ Paragraf pengantar perusahaan
			{
				text: `Merupakan pimpinan / penanggung jawab atas perusahaan :`,
				fontSize: 10,
				margin: [0, 0, 0, 10],
			},
			// ✅ Detail perusahaan
			{
				table: {
					widths: ["25%", "75%"],
					body: [
						[
							{ text: "Nama Perusahaan", fontSize: 10 },
							{ text: `: ${surat?.nama_perusahaan || ""}`, fontSize: 10 },
						],
						[
							{ text: "Jenis Perusahaan", fontSize: 10 },
							{ text: `: ${surat?.jenis_usaha || ""}`, fontSize: 10 },
						],
						[
							{ text: "Bidang Usaha", fontSize: 10 },
							{ text: `: ${surat?.bidang_usaha || ""}`, fontSize: 10 },
						],
						[
							{ text: "Nomor Akta Pendirian", fontSize: 10 },
							{ text: `: ${surat?.nomor_akta_pendirian || ""}`, fontSize: 10 },
						],
						[
							{ text: "Nomor Induk Berusaha", fontSize: 10 },
							{ text: `: ${surat?.nib || ""}`, fontSize: 10 },
						],
						...(surat?.warga_desa
							? [
									[
										{ text: "Status Tanah/Bangunan", fontSize: 10 },
										{
											text: `: ${surat?.status_kepemilikan_bangunan || ""}`,
											fontSize: 10,
										},
									],
									[
										{ text: "Jumlah Karyawan", fontSize: 10 },
										{
											text: `: ${surat?.jumlah_karyawan || ""} Orang`,
											fontSize: 10,
										},
									],
							  ]
							: [
									[
										{ text: "Luas Tanah", fontSize: 10 },
										{
											text: `: ${surat?.luas_tanah || ""} m2 dan ${
												surat?.luas_bangunan || ""
											} m2`,
											fontSize: 10,
										},
									],
									[
										{ text: "Peruntukan Bangunan", fontSize: 10 },
										{
											text: `: ${surat?.peruntukan_bangunan || ""}`,
											fontSize: 10,
										},
									],
									[
										{ text: "Jumlah Karyawan", fontSize: 10 },
										{
											text: `: ${surat?.jumlah_karyawan || ""} Orang`,
											fontSize: 10,
										},
									],
							  ]),
						[
							{ text: "Alamat Perusahaan", fontSize: 10 },
							{ text: `: ${surat?.alamat_perusahaan || ""}`, fontSize: 10 },
						],
					],
				},
				layout: "noBorders",
				margin: [20, 0, 0, 10],
			},
			// ✅ Penutup
			{
				text: surat?.warga_desa
					? `Demikian Surat Keterangan Domisili Perusahaan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya, bila tidak sesuai dengan Perundang-Undangan maka dengan sendirinya Surat Keterangan Domisili Perusahaan ini batal demi Hukum dan berlaku 1 (Satu) tahun sejak dikeluarkannya surat keterangan ini.`
					: `Surat Keterangan Domisili Perusahaan ini diberikan ${surat?.keperluan}. \n\nDemikian Surat Keterangan Domisili Perusahaan ini dibuat dan diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya.`,
				fontSize: 10,
				margin: [0, 0, 0, 20],
			},
			// ✅ Tanda tangan & QR
			{
				columns: [
					{ width: "*", text: "" },
					{
						width: "40%",
						stack: [
							{
								table: {
									widths: ["35%", "*"],
									body: [
										[
											{ text: "Dikeluarkan di", fontSize: 10 },
											{
												text: `: ${profil_desa?.nama_organisasi}`,
												fontSize: 10,
											},
										],
										[
											{ text: "Pada Tanggal", fontSize: 10 },
											{
												text: `: ${dayjs(data?.surat?.tanggal_surat)
													.locale("id")
													.format("DD MMMM YYYY")}`,
												fontSize: 10,
											},
										],
									],
								},
								layout: "noBorders",
								margin: [0, 0, 0, 5],
							},
							{
								canvas: [
									{
										type: "line",
										x1: 0,
										y1: 0,
										x2: 200,
										y2: 0,
										lineWidth: 0.5,
									},
								],
								margin: [0, 0, 0, 5],
							},
							surat?.nama_jabatan_utama && {
								text: `an. ${surat.nama_jabatan_utama}`,
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 0],
							},
							{
								text: `${surat?.disahkan_oleh}`,
								bold: true,
								fontSize: 10,
								margin: [0, 0, 0, 50], // spasi tanda tangan
							},
							{
								text: `${surat?.nama_pejabat}`,
								bold: true,
								fontSize: 10,
							},
						],
						alignment: "left",
					},
				],
				columnGap: 0,
			},
		],
		footer: function (currentPage: number, pageCount: number) {
			return {
				columns: [
					{
						text: `Dicetak pada ${dayjs()
							.locale("id")
							.format("DD MMMM YYYY")} dari ${website}`,
						alignment: "left",
						italics: true,
						fontSize: 8,
					},
					{
						text: `Halaman ${currentPage} dari ${pageCount}`,
						alignment: "right",
						fontSize: 8,
					},
				],
				margin: [40, 0, 40, 20],
			};
		},
	} as TDocumentDefinitions;
}
