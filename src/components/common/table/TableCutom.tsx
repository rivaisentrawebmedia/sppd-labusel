interface Props {
	data: any;
	columns: any;
	className?: string;
	thClassName?: string;
	tdClassName?: string;
	isShowFilter?: boolean;
	isShowPagination?: boolean;
	tdFooterClassName?: string;
	isShowFooterTable?: boolean;
	addButtonCustom?: ReactNode;
	addRowColumn?: ReactNode;
	classNameSearch?: string;
	meta?: Meta;
	limit?: number;
	loading?: boolean;
}
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import SetLimitList from "./SetLimitList";

import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import TablePaginate, { type Meta } from "./TablePaginate";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_CONSTANTA } from "@/const/getImageConstanta";

const TableCustom = (props: Props) => {
	const {
		className,
		columns,
		data,
		tdClassName = "border",
		thClassName = "",
		isShowFilter = true,
		isShowPagination = true,
		tdFooterClassName,
		isShowFooterTable,
		addButtonCustom,
		addRowColumn,
		classNameSearch = "rounded-lg",
		limit,
		meta,
		loading,
	} = props;
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const [searchParmas, setSearchParams] = useSearchParams();
	const search = searchParmas.get("search");
	const searchingNotFound = !search || search === "";

	const handleSearch = (query: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("search", query);
			newParams.set("page", "1"); // Reset ke halaman 1 saat search
			return newParams;
		});
	};

	const columnCount = columns?.length || 5;

	return (
		<div className="flex flex-col w-full gap-4 ">
			{isShowFilter && (
				<div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
					<div className={`flex w-full gap-4 justify-between`}>
						<SetLimitList />
						<Search
							onSearch={handleSearch}
							innerClassName={classNameSearch}
							className="rounded-lg "
							position="end"
						/>
					</div>
					{addButtonCustom}
				</div>
			)}

			<Table className={`${className}  `}>
				<TableHeader>
					{table?.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									colSpan={header.colSpan}
									key={header.id}
									className={`  bg-[#F5F5FF] text-[#272CCD] ${thClassName}`}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{loading ? (
						Array.from({ length: 5 }).map((_, rowIndex) => (
							<TableRow key={`skeleton-${rowIndex}`}>
								{Array.from({ length: columnCount }).map((_, colIndex) => (
									<TableCell key={colIndex} className={`${tdClassName}`}>
										<Skeleton className="h-4 w-full" />
									</TableCell>
								))}
							</TableRow>
						))
					) : table?.getRowModel()?.rows?.length > 0 ? (
						table?.getRowModel()?.rows?.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell className={tdClassName} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columnCount}
								className="text-center py-6 text-gray-500 bg-white"
							>
								<div className="flex items-center flex-col justify-center gap-4">
									<img
										src={IMAGE_CONSTANTA?.no_data}
										alt="No Data"
										className="w-[15rem]"
									/>
									<div className="flex flex-col gap-0 items-center justify-center text-center text-[#888]">
										<p>Data tidak ditemukan</p>
										<p>
											{!searchingNotFound &&
												`Hasil pencarian untuk "${search}" tidak ditemukan. Silakan periksa kembali kata kunci Anda dan coba lagi.`}
										</p>
									</div>
								</div>
							</TableCell>
						</TableRow>
					)}
					{addRowColumn && addRowColumn}
				</TableBody>
				{isShowFooterTable && (
					<TableFooter>
						{table.getFooterGroups().map((footerGroup) => (
							<TableRow key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<TableCell
										key={header.id}
										colSpan={header.colSpan}
										className={`border font-semibold ${tdFooterClassName}`}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext()
											  )}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableFooter>
				)}
			</Table>

			{isShowPagination && data?.length > 0 && (
				<TablePaginate meta={meta} length={limit || 10} />
			)}
		</div>
	);
};

export default TableCustom;
