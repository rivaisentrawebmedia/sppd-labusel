import type {
	FieldValues,
	Path,
	PathValue,
	UseFormReturn,
} from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useMobile } from "@/utils/useMobile";
import clsx from "clsx";

interface Props<T extends FieldValues> {
	label?: string;
	name: Path<T>;
	form: UseFormReturn<T>;
	className?: string;
	inputClassName?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
}

/**
 * Komponen Input khusus untuk format Rupiah
 * - Menampilkan angka dalam format "Rp x.xxx"
 * - Menyimpan nilai mentah (angka tanpa format) di form
 */
function TextRupiahInput<T extends FieldValues>({
	label,
	name,
	form,
	className,
	inputClassName,
	isDisabled,
	isRow = false,
	isRequired,
}: Props<T>) {
	const { isMobile } = useMobile();
	const [displayValue, setDisplayValue] = useState("");

	const formatRupiah = (value: string | number) => {
		const num = parseFloat(String(value).replace(/[^\d]/g, "")) || 0;
		return `Rp ${new Intl.NumberFormat("id-ID").format(num)}`;
	};

	const parseRupiah = (value: string) => value.replace(/[^\d]/g, "");

	useEffect(() => {
		const currentValue = form.getValues(name);
		if (currentValue) {
			setDisplayValue(formatRupiah(currentValue));
		}
	}, [form, name]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = parseRupiah(e.target.value);
		setDisplayValue(formatRupiah(rawValue));

		// ✅ Fix TypeScript: pastikan sesuai PathValue<T, Path<T>>
		form.setValue(name, rawValue as PathValue<T, Path<T>>, {
			shouldValidate: true,
		});
	};

	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem
					className={clsx(
						"whitespace-nowrap",
						className,
						isRow
							? clsx(
									isMobile
										? "flex flex-col gap-4"
										: "grid grid-cols-[12rem_1fr] items-center gap-5"
							  )
							: "flex flex-col gap-2"
					)}
				>
					{label && (
						<FormLabel className="text-neutral font-normal">
							{label} {isRequired && <span className="text-red-500">*</span>}
						</FormLabel>
					)}

					<FormControl>
						<Input
							type="text"
							value={displayValue}
							onChange={handleChange}
							disabled={isDisabled}
							className={clsx(
								"w-full placeholder:text-[#9C9C9C] focus-visible:ring-0 rounded",
								inputClassName
							)}
							placeholder="Rp 0"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default TextRupiahInput;
