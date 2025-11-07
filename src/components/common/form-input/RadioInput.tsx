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

function RadioInput<T extends FieldValues>({
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
					<FormLabel className="text-neutral font-normal">
						{label} {isRequired && <span className="text-red-500">*</span>}
					</FormLabel>

					<FormControl>
						<div
							className={clsx(
								"flex gap-4",
								isRow ? "flex-wrap" : "flex-col items-start"
							)}
						>
							{data.map((option, index) => {
								const selected = field.value === option.value;
								return (
									<label
										key={index}
										className={clsx(
											"flex items-center gap-2 px-3 py-2 rounded-md border transition-all cursor-pointer",
											selected
												? "bg-primary text-white border-primary"
												: "border-gray-300 text-neutral hover:border-primary",
											isDisabled && "opacity-60 cursor-not-allowed"
										)}
									>
										<input
											type="radio"
											value={String(option.value)}
											checked={selected}
											onChange={() => field.onChange(option.value)}
											disabled={isDisabled}
											className="w-4 h-4 accent-primary"
										/>
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

export default RadioInput;
