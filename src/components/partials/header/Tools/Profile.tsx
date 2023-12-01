import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import useProfile from "@/hooks/useProfile";
import { ToTitleCase } from "@/utils/stringConverter";
import { FiHelpCircle, FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { getCookie } from "@/utils/cookie";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";

const profileLabel = () => {
	const [Profile] = useProfile();
	return (
		<div className="flex items-center">
			<div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
				<div className="lg:h-12 lg:w-12 h-12 w-12 rounded-full">
					<img
						src={'/assets/images/KhlmcBLLtiMZzsr.min.webp'}
						alt="SIPD Penatausahaan Profile Image"
						className="block object-cover w-full h-full rounded-md"
					/>
				</div>
			</div>
		</div>
	);
};

const Profile = () => {
	const [Profile] = useProfile();
	const navigate = useNavigate();
	const ProfileMenu = [
		{
			label: "Profile",
			icon: <FiUser size={20} />,

			action: () => {
				
			},
		},
		{
			label: "Faq",
			icon: <FiHelpCircle size={20} />,
			action: () => {
				
			},
		},
		{
			label: "Keluar",
			icon: <FiLogOut size={20} />,
			action: () => {
				navigate('/logout')
			},
		},
	];

	const openJwt = () => {
		toast.success('Token copied, paste into jwt.io')
	};

	return (
		<Dropdown label={profileLabel()} classMenuItems="w-[350px] top-[58px]">
			{
				Profile != null &&
				<>
					<div className="container-profile-fixed">
						<div className="lg:h-14 lg:w-14 h-14 w-14 rounded-full css-ajf-jaf-aw">
							<img
								src={'/assets/images/KhlmcBLLtiMZzsr.min.webp'}
								alt="SIPD Penatausahaan Profile Image"
								className="block rounded-md"
							/>
						</div>
						<div className="container-profile-fixed-description">
							<div className="css-naf-j-wsa">
								<h1>{Profile.nama_user}</h1>
							</div>
							<p>{ToTitleCase(Profile.nama_role)}</p>
							{/* <span className="profile-fixed-description-years">Tahun {Profile.tahun}</span> */}
						</div>
					</div>
					<div className="container-profile-fixed">
						<div className="container-skpd-head">
							<FiPackage size={27} className="me-3" color="#6f6f6f" />
							<div className="css-na-f0wa-acf_3cf">
								<h1>{Profile.nama_daerah}</h1>
								<span>Tahun {Profile.tahun}</span>
							</div>
						</div>
					</div>

					<Accordion allowMultiple>
						<AccordionItem className="css-nca-wj-an-2a">
							<h2>
								<AccordionButton >
									<p className="font-12 ml-4 css-anf-aw-21c_a2">Debugging</p>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<div className="css-j-ja-hf92-f1">
									<div className="css-j-ja-hf92-fa">
										<p className="text-sm">Nama Daerah: {Profile.nama_daerah}</p>
										<p className="text-sm">Kode Kab: {Profile.kode_kab}</p>
										<p className="text-sm">Kode Prov: {Profile.kode_prop}</p>
										<p className="text-sm">ID User: {Profile.id_user}</p>
										<p className="text-sm">ID Pegawai: {Profile.id_pegawai}</p>
										<p className="text-sm">ID Daerah: {Profile.id_daerah}</p>
										<p className="text-sm">ID SKPD: {Profile.id_skpd}</p>
										<p className="text-sm">ID Pangkat & Golongan: {Profile.id_pang_gol}</p>
										<p className="text-sm">Tahun: {Profile.tahun}</p>
										<p className="text-sm">Username: {Profile.username}</p>
										<p className="text-sm">Password: {Profile.password}</p>
										<p className="text-sm">NIP: {Profile.nip_user}</p>
										<p className="text-sm">Nama User: {Profile.nama_user}</p>
										<p className="text-sm">Nama Role: {Profile.nama_role}</p>
										<p className="text-sm">Nama SKPD: {Profile.nama_skpd}</p>
										<p className="text-sm">
											<Button className="btn mt-3 btn-success btn-sm">
												<CopyToClipboard text={getCookie('X-SIPD-PU-TK') || ''}
													onCopy={() => openJwt()}>
													<span>Token</span>
												</CopyToClipboard>
											</Button>
										</p>

									</div>
								</div>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>

				</>
			}

			<div className="container-profile-fixed css-na-f0wa-acf_3cf">
				{ProfileMenu.map((item: any, index: any) => (
					<Menu.Item key={index}>
						{({ active }) => (
							<div onClick={() => item.action()} className={`css-n-vja-w9-v ${active ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50" : "text-slate-600 dark:text-slate-300"} block ${item.hasDivider ? "border-t border-slate-100 dark:border-slate-700" : ""}`}>
								<div className={`block cursor-pointer px-4 py-2`}>
									<div className="flex items-center">
										<span className="block text-xl ltr:mr-3 rtl:ml-3">
											{item.icon}
										</span>
										<span className="block text-sm ">{item.label}</span>
									</div>
								</div>
							</div>
						)}
					</Menu.Item>
				))}

			</div>
		</Dropdown>
	);
};

export default Profile;
