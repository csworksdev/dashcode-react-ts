import NominalFormat from "@/components/main/NominalFormat";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRandomRangeInt } from "@/utils/numberTools";

type Props = {
	statistic: DashboardStatisticType[]
}

const MainCard = (props: Props) => {
	const { statistic } = props
	return (
		<>
			{statistic.map((item: DashboardStatisticType, i: number) => (
				<motion.div
					initial="pageInitial"
					animate="pageAnimate"
					exit="pageExit"
					key={i} className={`css-n-f-a93_cj-aj-21-v`}
					variants={{
						pageInitial: {
							opacity: 0,
							y: 50,
						},
						pageAnimate: {
							opacity: 1,
							y: 0,
						},
						pageExit: {
							opacity: 0,
							y: -50,
						},
					}}
					transition={{
						type: "tween",
						ease: "easeInOut",
						duration: 0.3,
						delay: (i === 0) ? 0.2 : (i === 1) ? 0.5 : (i === 2) ? 0.1 : 0.4
					}}
				>
					<div className="css-ck-wKO-c_-w-1f">
						<item.icon size={30} color={item.color} />
						<Menu>
							<MenuButton variant={'ghost'} as={IconButton} icon={<FiMoreHorizontal className="w-100" size={30} />}></MenuButton>
							<MenuList>
								<MenuItem as={Link} to={`/penatausahaan/pengeluaran/dpa/${item.type === 1 || item.type === 3 ? 'rencana-penarikan-dana' : 'rencana-penerimaan-dana'}/${item.id}`} icon={<FiMoreVertical color={item.color} size={17} />} command='⌘T'>
									<p className='text-md font-semibold'>Input</p>
								</MenuItem>
								<MenuDivider />
								<MenuItem as={Link} to={`/penatausahaan/pengeluaran/dpa/laporan/rak/${item.id}`} icon={<FiMoreVertical color={item.color} size={17} />} command='⌘T'>
									<p className='text-md font-semibold'>Laporan RAK</p>
								</MenuItem>
								<MenuItem as={Link} to={`/penatausahaan/pengeluaran/dpa/laporan/dpa/${item.type === 2 || item.type === 3 ? 'pembiayaan' : item.id}`} icon={<FiMoreVertical color={item.color} size={17} />} command='⌘T'>
									<p className='text-md font-semibold'>Laporan DPA</p>
								</MenuItem>
							</MenuList>
						</Menu>

					</div>
					<div className="css-n9w0a_fo-q14c-c">
						<NominalFormat decimalSeparator="," thousandSeparator="." prefix="Rp " className="block text-3xl text-black text-bold dark:text-white font-bold text-dashboard-statistic" displayType="text" value={item.count} />
						<div className="flex space-x-2 rtl:space-x-reverse text-info-dashboard-statistic">
							<div className="flex-1 text-sm">
								<span className="block mb-1 text-slate-600 dark:text-slate-300 font-semibold">
									Realisasi Rp0
								</span>
							</div>
						</div>
					</div>
					<div className="css-3nabef" style={{ height: 4, background: '#EDF2F7' }}>
						<div
							aria-valuemax={100}
							aria-valuemin={0}

							role="progressbar"
							className=""
							style={{ width: "20%", background: item.color, height: 4 }}
							aria-valuenow={20}
						/>
					</div>

					<div className="css-ck-wKO-c_-w-1f">
						<div className="css-n-faw_w-1mf-_awa">
							<div className="css-sn-c82-kd_wo0a" style={{ background: item.color }}></div>
							<span className="block mb-0 text-sm text-bold dark:text-white font-bold">
								{item.title}
							</span>
						</div>
						<div className="badge" style={{ background: item.color, color: '#FFFFFF' }}>
							20%
						</div>
					</div>
				</motion.div>
			))}
		</>
	);
};

export default MainCard;