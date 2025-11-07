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
	const profilDesa = profil_desa;

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
			// 1️⃣ Kop Surat
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
			// 2️⃣ Garis
			{
				canvas: [
					{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 },
				],
				margin: [0, 5, 0, 20],
			},
			// 3️⃣ Judul & Nomor Surat
			{
				text: jenis_surat?.toUpperCase(),
				alignment: "center",
				bold: true,
				fontSize: 15,
				decoration: "underline",
				margin: [0, 0, 0, 0],
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

			{
				text: `Yang bertanda tangan di bawah ini:`,
				fontSize: 10,
				alignment: "justify",
				margin: [0, 0, 0, 10],
			},

			// Data Pihak Pertama
			{
				margin: [30, 0, 0, 10],
				table: {
					widths: ["35%", "*"],
					body: [
						["Nomor Induk Kependudukan", `: ${surat?.nik_pemberi}`],
						["Nama", `: ${surat?.nama_pemberi}`],
						["Jabatan", `: ${surat?.jabatan_pemberi}`],
					],
				},
				layout: "noBorders",
				fontSize: 10,
			},

			// Paragraf transisi ke Pihak Kedua
			{
				text: `Selanjutnya disebut Pihak Pertama, bertindak untuk dan atas nama Pemerintah ${profilDesa?.nama_organisasi} Kecamatan ${profilDesa?.Kecamatan} Kabupaten ${profilDesa?.Kabupaten}, memberikan kuasa penuh kepada:`,
				fontSize: 10,
				alignment: "justify",
				margin: [0, 0, 0, 10],
			},

			// Data Pihak Kedua
			{
				margin: [30, 0, 0, 10],
				table: {
					widths: ["35%", "*"],
					body: [
						["Nomor Induk Kependudukan", `: ${surat?.nik_penerima}`],
						["Nama", `: ${surat?.nama_penerima}`],
						["Jabatan", `: ${surat?.jabatan_penerima}`],
					],
				},
				layout: "noBorders",
				fontSize: 10,
			},

			// Pihak Kedua
			{
				text: `Selanjutnya disebut Pihak Kedua.`,
				fontSize: 10,
				alignment: "justify",
				margin: [0, 0, 0, 10],
			},

			// Isi Kuasa
			{
				text: `Surat Kuasa ini diberikan oleh Pihak Pertama kepada Pihak Kedua sebagai ${surat?.disposisi_kuasa_sebagai} untuk ${surat?.disposisi_kuasa_untuk}.`,
				fontSize: 10,
				alignment: "justify",
				margin: [0, 0, 0, 10],
			},

			// Penutup
			{
				text: `Demikian Surat Kuasa ini dibuat dan diberikan kepada yang bersangkutan untuk dilaksanakan dengan penuh rasa tanggung jawab dan dipergunakan sebagaimana mestinya.`,
				fontSize: 10,
				margin: [0, 0, 0, 20],
				alignment: "justify",
			},

			// 6️⃣ Tanda tangan + QR Code
			{
				text: `${profilDesa?.nama_organisasi}, ${dayjs()
					.locale("id")
					.format("DD MMMM YYYY")}`,
				alignment: "center",
				fontSize: 10,
				margin: [0, 30, 0, 20],
			},

			// Dua kolom: Pihak Pertama dan Pihak Kedua
			{
				columns: [
					{
						width: "50%",
						stack: [
							{
								text: "Pihak Pertama",
								alignment: "center",
								fontSize: 10,
								margin: [0, 0, 0, 60],
							},
							{
								text: `${surat?.nama_pemberi}`,
								alignment: "center",
								fontSize: 10,
								bold: true,
							},
						],
					},
					{
						width: "50%",
						stack: [
							{
								text: "Pihak Kedua",
								alignment: "center",
								fontSize: 10,
								margin: [0, 0, 0, 60],
							},
							{
								text: `${surat?.nama_penerima}`,
								alignment: "center",
								fontSize: 10,
								bold: true,
							},
						],
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
