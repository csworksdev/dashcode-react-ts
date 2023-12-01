import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const SearchModal = () => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	const [query, setQuery] = useState(" ");
	const searchList = [
		{
			id: 1,
			name: "Halaman Dashboard",
			link: "/dashboard",
		},
		{
			id: 2,
			name: "Halaman RBAC - Penugasan",
			link: "/setting/rbac/assignment",
		},
		{
			id: 3,
			name: "Halaman RBAC - Peran",
			link: "/setting/rbac/role",
		},
		{
			id: 4,
			name: "Halaman RBAC - Perizinan",
			link: "/setting/rbac/permission",
		},
		{
			id: 5,
			name: "Halaman RBAC - Rute",
			link: "/setting/rbac/rute",
		},
		{
			id: 6,
			name: "Halaman RBAC - Menu",
			link: "/setting/rbac/menu",
		},
		{
			id: 7,
			name: "Halaman Pengguna",
			link: "/user",
		},
		{
			id: 8,
			name: "Halaman Tambah Pengguna",
			link: "/user/create",
		},
	];
	const filteredsearchList: any = searchList.filter((item: any) =>
		item.name.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<>
			<div>
				<button className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 px-1 space-x-3 rtl:space-x-reverse css-nc2-c_co-2a-s" onClick={openModal}>
					{/* <Icon icon="heroicons-outline:search" /> */}
					<FiSearch size={20} />
					<span className="css-cn-a-_d2-av xl:inline-block hidden">Pencarian... </span>
				</button>
			</div>

			<Transition show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-[9999] overflow-y-auto p-4 md:pt-[25vh] pt-20"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-slate-900/60 backdrop-filter backdrop-blur-sm backdrop-brightness-10" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel>
							<Combobox>
								<div className="relative">
									<div className="relative mx-auto max-w-xl rounded-md bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-gray-500-500 dark:ring-light divide-y divide-gray-500-300 dark:divide-light">
										<div className="flex bg-white dark:bg-slate-800  px-3 rounded-md py-3 items-center">
											<div className="flex-0  text-slate-700 dark:text-slate-300 ltr:pr-2 rtl:pl-2 text-lg">
												<Icon icon="heroicons-outline:search" />
											</div>
											<Combobox.Input
												className="bg-transparent outline-none focus:outline-none border-none w-full flex-1 dark:placeholder:text-slate-300 dark:text-slate-200"
												placeholder="Pencarian..."
												onChange={(event) => setQuery(event.target.value)}
											/>
										</div>
										<Transition
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Combobox.Options className="max-h-40 overflow-y-auto text-sm py-2">
												{filteredsearchList.length === 0 && query !== "" && (
													<div>
														<div className=" text-base py-2 px-4">
															<p className="text-slate-500 text-base dark:text-white">
																No result found
															</p>
														</div>
													</div>
												)}

												{filteredsearchList.map((item: any, i: number) => (
													<Combobox.Option value={''} key={i}>
														{({ active }) => (
															<Link to={item.link} onClick={() => setIsOpen(false)}>
																<div
																	className={`px-4 text-[15px] font-normal capitalize py-2 ${active
																		? "bg-slate-900 dark:bg-slate-600 dark:bg-opacity-60 text-white"
																		: "text-slate-900 dark:text-white"
																		}`}
																>
																	<span>{item.name}</span>
																</div>
															</Link>
														)}
													</Combobox.Option>
												))}
											</Combobox.Options>
										</Transition>
									</div>
								</div>
							</Combobox>
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
};

export default SearchModal;
