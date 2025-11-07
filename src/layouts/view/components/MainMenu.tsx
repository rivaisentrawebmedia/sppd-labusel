import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { Menus } from "../main-layout";
import { usePathname } from "@/utils/usePathname";

export function MainMenu({ menu }: { menu: Menus }) {
	const { pathname, firstPathname, secondPathname } = usePathname();
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// ✅ Tutup menu ketika klik di luar area menu
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenMenu(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleToggle = (label: string) => {
		setOpenMenu((prev) => (prev === label ? null : label));
	};

	const handleChildClick = () => {
		setOpenMenu(null); // ✅ Tutup submenu setelah klik anak
	};

	return (
		<nav
			ref={menuRef}
			className="hidden md:flex flex-col w-full bg-white border-b border-[#eee] px-4 md:px-8 lg:px-[6rem]"
		>
			<div className="flex gap-6 font-medium pt-3 pb-2 relative">
				{menu.map((row) => {
					const isActive = row?.child
						? row?.link === `/${firstPathname}/${secondPathname}`
						: row?.link === pathname;

					const hasChild = Array.isArray(row.child) && row.child.length > 0;

					return (
						<div key={row.label} className="relative group">
							{hasChild ? (
								// 🔹 MENU DENGAN CHILD
								<button
									type="button"
									onClick={() => handleToggle(row.label)}
									className={clsx(
										"flex items-center gap-1 border-b-2 duration-300 transition-colors",
										{
											"border-b-[#272CCD] text-[#272CCD]": isActive,
											"border-b-transparent hover:text-[#272CCD]": !isActive,
										}
									)}
								>
									{row.label}
								</button>
							) : (
								// 🔹 MENU TANPA CHILD
								<Link
									to={row.link}
									className={clsx("border-b-2 duration-300 transition-colors", {
										"border-b-[#272CCD] text-[#272CCD]": isActive,
										"border-b-transparent hover:text-[#272CCD]": !isActive,
									})}
								>
									{row.label}
								</Link>
							)}

							{/* 🔸 SUBMENU DROPDOWN */}
							{hasChild && openMenu === row.label && (
								<div className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-2 flex flex-col z-50 min-w-[200px]">
									{row?.child?.map((child) => (
										<Link
											key={child.link}
											to={child.link}
											onClick={handleChildClick}
											className={clsx(
												"px-3 py-2 text-sm rounded-md hover:bg-[#f5f5ff] transition-colors",
												{
													"text-[#272CCD] font-semibold":
														pathname === child.link,
												}
											)}
										>
											{child.label}
										</Link>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</nav>
	);
}
