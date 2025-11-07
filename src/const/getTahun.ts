import type { ReferensiType } from "@/layouts/main-layout/model";

export const generateDummyTahun = (startYear: number): ReferensiType[] => {
	const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini
	const years: ReferensiType[] = [];

	// Loop dari tahun terbaru (currentYear) ke bawah
	for (let year = currentYear; year >= startYear; year--) {
		const yearString = year.toString();
		years.push({
			value: yearString?.toString(),
			label: yearString,
		});
	}

	return years;
};
