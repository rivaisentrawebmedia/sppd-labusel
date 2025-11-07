import { SelectBase } from "@/components/common/select/SelectBase";
import { generateDummyTahun } from "@/const/getTahun";
import { useSearchParams } from "react-router-dom";

interface Props {
	name?: string; // nama param di URL yang akan dibaca / diubah
}

export function SelectTahunAnggaran({ name = "tahun" }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();

	const value = searchParams.get(name) || "";

	const dataTahun = generateDummyTahun(2010).map((item) => ({
		label: `Tahun Anggaran ${item.label}`,
		value: item.value,
	}));

	const handleChange = (v: string) => {
		const newParams = new URLSearchParams(searchParams);
		newParams.set(name, v);
		setSearchParams(newParams);
	};

	return (
		<div className="bg-[#002F75] text-white flex flex-wrap items-center gap-4 px-4 md:px-8 lg:px-[6rem] py-2">
			<p className="text-sm md:text-base whitespace-nowrap">
				Tahun Anggaran Aktif
			</p>

			<div className="min-w-[180px]">
				<SelectBase
					value={value}
					data={dataTahun}
					className="bg-white w-full"
					placeholder="Pilih Tahun Anggaran"
					onChangeValue={handleChange}
				/>
			</div>
		</div>
	);
}
