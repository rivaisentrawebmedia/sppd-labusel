import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useMobile } from "@/utils/useMobile";
import clsx from "clsx";

interface Props<T extends FieldValues> {
	label?: string;
	name: Path<T>;
	form: UseFormReturn<T>;
	className?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
	data: {
		label: string;
		value: string | number | boolean;
	}[];
}

function RadioInputCol<T extends FieldValues>({
	label,
	name,
	form,
	className,
	isRow = false,
	isDisabled,
	isRequired,
	data,
}: Props<T>) {
	const { isMobile } = useMobile();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
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
					{/* Field label (optional) */}
					{label ? (
						<FormLabel className="text-neutral font-normal">
							{label} {isRequired && <span className="text-red-500">*</span>}
						</FormLabel>
					) : null}

					<FormControl>
						{/* Opsi: render secara kolom ke bawah (vertical) */}
						<div className="flex flex-col gap-2">
							{data?.map((option, index) => {
								const selected = field.value === option.value;

								return (
									<label
										key={index}
										// tanpa border / box, hanya radio bulatan
										className={clsx(
											"flex items-center gap-2 cursor-pointer p-1",
											isDisabled && "opacity-60 cursor-not-allowed"
										)}
										// jangan biarkan label clickable kalau disabled
										aria-disabled={isDisabled ? true : undefined}
									>
										{/* radio input native (tampil sebagai bulatan) */}
										<input
											type="radio"
											value={String(option.value)}
											checked={selected}
											onChange={() =>
												!isDisabled && field.onChange(option.value)
											}
											disabled={isDisabled}
											aria-label={option.label} // tetap aksesibel
											className="w-4 h-4 bg-white"
										/>

										{/* label teks disembunyikan dari tampilan tapi tersedia untuk screen reader */}
										<span className="text-sm">{option.label}</span>
									</label>
								);
							})}
						</div>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default RadioInputCol;
