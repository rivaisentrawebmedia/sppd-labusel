import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { type ReactNode } from "react";
import { useMobile } from "@/utils/useMobile";

interface Props<T extends FieldValues> {
	label?: string | ReactNode;
	htmlFor?: string;
	name: Path<T>;
	placeholder?: string;
	form: UseFormReturn<T>;
	data: {
		value: string;
		label: string;
	}[];
	className?: string;
	isRow?: boolean;
	isDisabled?: boolean;
	isRequired?: boolean;
	onChange?: (value: string) => void;
}

function SelectInput<T extends FieldValues>({
	label,
	htmlFor,
	placeholder,
	name,
	form,
	data,
	className,
	isDisabled,
	isRequired,
	isRow = false,
	onChange,
}: Props<T>) {
	const { isMobile } = useMobile();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={` whitespace-nowrap 
          ${
						isRow
							? `${
									isMobile
										? "flex flex-col gap-4"
										: "grid grid-cols-[12rem_1fr] flex-row items-center gap-5"
							  }`
							: "flex flex-col gap-2"
					}
          ${className}`}
				>
					{/* LABEL */}
					<FormLabel className="text-neutral font-normal" htmlFor={htmlFor}>
						{label} {isRequired && <span className="text-red-500">*</span>}
					</FormLabel>

					{/* SELECT CONTROL */}
					<FormControl>
						<Select
							value={field.value || ""}
							onValueChange={(val) => {
								field.onChange(val);
								if (onChange) onChange(val);
							}}
							disabled={isDisabled}
						>
							<SelectTrigger className="focus-visible:ring-0 flex-1 w-full text-black border-gray-300">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent>
								{data.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>

					{/* ERROR MESSAGE */}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default SelectInput;
