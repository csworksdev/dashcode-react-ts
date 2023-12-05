import { FiCalendar, FiClock, FiCreditCard, FiFileText, FiGitPullRequest, FiHome, FiLayout, FiLogOut, FiMaximize2, FiShield, FiShoppingBag, FiTrendingDown, FiTrendingUp, FiUser, FiUserPlus, FiUsers } from "react-icons/fi";

export const SidebarMenuItems: SidebarMenuItemsType[] = [
	{
		id: '!!-dashboard',
		title: "Dashboard",
		icon: FiHome,
		link: "/dashboard",
		except_rbac: true,
	},
	{
		isHeadr: true,
		title: "pengaturan",
	},
	{
		id: '!!-rbac',
		title: "RBAC",
		icon: FiShield,
		link: "#!",
		children: [
			{
				id: '!!-rbac-penugasan',
				title: "Penugasan",
				link: "/setting/rbac/assignment",
			},
			{
				id: '!!-rbac-peran',
				title: "Peran",
				link: "/setting/rbac/role",
			},
			{
				id: '!!-rbac-perizinan',
				title: "Perizinan",
				link: "/setting/rbac/permission",
			},
			{
				id: '!!-rbac-rute',
				title: "Rute",
				link: "/setting/rbac/rute",
			},
			{
				id: '!!-rbac-menu',
				title: "Menu",
				link: "/setting/rbac/menu",
			},
		],
	},
	{
		id: '!!-jadwal',
		title: "Jadwal",
		icon: FiCalendar,
		link: "/setting/jadwal",
	},
	{
		id: '!!-kebijakanspd',
		title: "Kebijakan SPD",
		icon: FiClock,
		link: "/setting/kebijakan-spd",
	},
	{
		id: '!!-rekeningbank',
		title: "Rekening Bank",
		icon: FiCreditCard,
		link: "#!",
		children: [
			{
				id: '!!-rekeningbank-rkud',
				title: 'RKUD',
				link: '/setting/rekening-bank/rkud'
			},
			{
				id: '!!-rekeningbank-skpd',
				title: 'SKPD',
				link: '#!',
				children: [
					{
						id: '!!-rekeningbank-skpd-permohonan',
						title: "Permohonan",
						link: "/setting/rekening-bank/skpd/permohonan",
					},
					{
						id: '!!-rekeningbank-skpd-pengajuan',
						title: "Pengajuan",
						// hint: "Penerimaan Pembiayaan",
						link: "/setting/rekening-bank/skpd/pengajuan",
					},
					{
						id: '!!-rekeningbank-skpd-pembuatan',
						title: "Pembuatan",
						// hint: "Penerimaan Pembiayaan",
						link: "/setting/rekening-bank/skpd/pembuatan",
					},
				]
			},
		]
	},
	{
		id: '!!-besaranup',
		title: "Besaran UP",
		icon: FiMaximize2,
		link: "/setting/besaran-up",
	},
	{
		id: '!!-pelimpahankewenangan',
		title: "Pelimpahan Kewenangan",
		icon: FiGitPullRequest,
		link: "/setting/pelimpahan-kewenangan",
	},
	{
		id: '!!-penugasanpptk',
		title: "Penugasan PPTK",
		icon: FiLayout,
		link: "/setting/penugasan-pptk",
	},

	{
		id: '!!-pengguna',
		title: "Pengguna",
		icon: FiUser,
		link: "/user",
	},
	{
		id: '!!-pegawai',
		title: "Pegawai",
		icon: FiUsers,
		link: "/setting/pegawai",
	},
	{
		isHeadr: true,
		title: "Penatausahaan",
	},
	{
		id: '!!-penatausahaan-pengeluaran',
		title: "Pengeluaran",
		icon: FiTrendingUp,
		link: "#!",
		children: [
			{
				// Dokumen Pelaksanaan Anggaran
				id: '!!-penatausahaan-pengeluaran-dpa',
				title: "DPA",
				hint: "Dokumen Pelaksanaan Anggaran",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-dpa-penerimaan',
						title: "Penerimaan",
						hint: "Rencana Penerimaan Dana",
						link: "#!",
						children: [
							{
								id: '!!-penatausahaan-pengeluaran-dpa-penerimaan-pendapatan',
								title: "Pendapatan",
								link: "/penatausahaan/pengeluaran/dpa/rencana-penerimaan-dana/pendapatan",
							},
							{
								id: '!!-penatausahaan-pengeluaran-dpa-penerimaan-penerimaanpembiayaan',
								title: "Penerimaan Pembiayaan",
								// hint: "Penerimaan Pembiayaan",
								link: "/penatausahaan/pengeluaran/dpa/rencana-penerimaan-dana/penerimaan-pembiayaan",
							},
						]
					},
					{
						id: '!!-penatausahaan-pengeluaran-dpa-penarikan',
						title: "Penarikan",
						hint: "Rencana Penarikan Dana",
						link: "#!",
						children: [
							{
								id: '!!-penatausahaan-pengeluaran-dpa-penarikan-belanja',
								title: "Belanja",
								link: "/penatausahaan/pengeluaran/dpa/rencana-penarikan-dana/belanja",
							},
							{
								id: '!!-penatausahaan-pengeluaran-dpa-penarikan-pengeluaranpembiayaan',
								title: "Pengeluaran Pembiayaan",
								link: "/penatausahaan/pengeluaran/dpa/rencana-penarikan-dana/pengeluaran-pembiayaan",
							},
						]
					},
					{
						id: '!!-penatausahaan-pengeluaran-dpa-validasi',
						title: "Validasi",
						link: "#!",
						children: [
							{
								id: '!!-penatausahaan-pengeluaran-dpa-validasi-pendapatan',
								title: "Pendapatan",
								link: "/penatausahaan/pengeluaran/dpa/validasi/pendapatan",
							},
							{
								id: '!!-penatausahaan-pengeluaran-dpa-validasi-belanja',
								title: "Belanja",
								link: "/penatausahaan/pengeluaran/dpa/validasi/belanja",
							},
							{
								id: '!!-penatausahaan-pengeluaran-dpa-validasi-pembiayaan',
								title: "Pembiayaan",
								link: "/penatausahaan/pengeluaran/dpa/validasi/pembiayaan",
							},
						]
					},
					{
						id: '!!-penatausahaan-pengeluaran-dpa-laporan',
						title: "Laporan",
						link: "#!",
						children: [
							{
								id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas',
								title: "Anggaran Kas",
								link: "#!",
								children: [
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-pemda',
										title: "Pemda",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/pemda",
										hint: "Pemerintah Daerah"
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-skpd',
										title: "SKPD",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/skpd",
										hint: "Satuan Kerja Perangkat Daerah"
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-pendapatan',
										title: "Pendapatan",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/pendapatan",
										// hint: "Rencana Anggaran Kas Pendapatan"
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-belanja',
										title: "Belanja",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/belanja",
										// hint: "Rencana Anggaran Kas Belanja"
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-penerimaanpembiayaan',
										title: "Penerimaan Pembiayaan",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/penerimaan-pembiayaan",
										// hint: "Rencana Anggaran Kas Penerimaan Pembiayaan"
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-anggarankas-pengeluaranpembiayaan',
										title: "Pengeluaran Pembiayaan",
										link: "/penatausahaan/pengeluaran/dpa/laporan/rak/pengeluaran-pembiayaan",
										// hint: "Rencana Anggaran Kas Pengeluaran Pembiayaan"
									},
								]
							},
							{
								id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa',
								title: "DPA.",
								link: "#!",
								children: [
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-halamanpersetujuandpa',
										title: "Halaman Persetujuan DPA",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/halaman-persetujuan-dpa",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-halamandepandpa',
										title: "Halaman Depan DPA",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/halaman-depan-dpa",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-skpd',
										title: "SKPD",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/skpd",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-pendapatan',
										title: "Pendapatan",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/pendapatan",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-belanja',
										title: "Belanja",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/belanja",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-rincianbelanja',
										title: "Rincian Belanja",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/rincian-belanja",
									},
									{
										id: '!!-penatausahaan-pengeluaran-dpa-laporan-dpa-pembiayaan',
										title: "Pembiayaan",
										link: "/penatausahaan/pengeluaran/dpa/laporan/dpa/pembiayaan",
									},
								]
							},

						]
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-spd',
				title: "SPD",
				hint: "Surat Penyediaan Dana",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-spd-pembuatan',
						title: "Pembuatan",
						link: "/penatausahaan/pengeluaran/spd/pembuatan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-spd-otorisasi',
						title: "Otorisasi",
						link: "/penatausahaan/pengeluaran/spd/otorisasi",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-pengajuan',
				title: "Pengajuan",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-pengajuan-tu',
						title: "TU",
						hint: 'Tambah Uang',
						link: "/penatausahaan/pengeluaran/pengajuan/tu",
					},
					{
						id: '!!-penatausahaan-pengeluaran-pengajuan-dpr',
						title: "DPR",
						hint: 'Daftar Pengeluaran Riil',
						link: "/penatausahaan/pengeluaran/pengajuan/dpr",
					},
					{
						id: '!!-penatausahaan-pengeluaran-pengajuan-dpt',
						title: "DPT",
						hint: 'Daftar Pembayaran Tagihan',
						link: "/penatausahaan/pengeluaran/pengajuan/dpt",
					},
					{
						id: '!!-penatausahaan-pengeluaran-pengajuan-npd',
						title: "NPD",
						hint: 'Nota Pencairan Dana',
						link: "/penatausahaan/pengeluaran/pengajuan/npd",
					},
					{
						id: '!!-penatausahaan-pengeluaran-pengajuan-datapegawai',
						title: "Data Pegawai",
						link: "/penatausahaan/pengeluaran/pengajuan/data-pegawai",
					},
				]
			},
			{
				id: '!!-penatausahaan-pengeluaran-rekapitulasi-npd',
				title: "Rekapitulasi NPD",
				link: "/penatausahaan/pengeluaran/rekapitulasi-npd",
			},
			{
				id: '!!-penatausahaan-pengeluaran-spp',
				title: "SPP",
				hint: "Surat Permintaan Pembayaran",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-spp-pembuatan',
						title: "Pembuatan",
						link: "#!",
						children: [
							{
								id: '!!-penatausahaan-pengeluaran-spp-pembuatan-up',
								title: "UP",
								hint: "Uang Persediaan",
								link: "/penatausahaan/pengeluaran/spp/pembuatan?type=UP",
							},
							{
								id: '!!-penatausahaan-pengeluaran-spp-pembuatan-gu',
								title: "GU",
								hint: "Ganti Uang",
								link: "/penatausahaan/pengeluaran/spp/pembuatan?type=GU",
							},
							{
								id: '!!-penatausahaan-pengeluaran-spp-pembuatan-tu',
								title: "TU",
								hint: "Tambah Uang",
								link: "/penatausahaan/pengeluaran/spp/pembuatan?type=TU",
							},
							{
								id: '!!-penatausahaan-pengeluaran-spp-pembuatan-ls',
								title: "LS",
								hint: "Langsung",
								link: "/penatausahaan/pengeluaran/spp/pembuatan?type=LS",
							},
						],
					},
					{
						id: '!!-penatausahaan-pengeluaran-spp-verifikasi',
						title: "Verifikasi",
						link: "/penatausahaan/pengeluaran/spp/verifikasi",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-spm',
				title: "SPM",
				hint: "Surat Perintah Membayar",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-spm-pembuatan',
						title: "Pembuatan",
						link: "/penatausahaan/pengeluaran/spm/pembuatan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-spm-verifikasi',
						title: "Verifikasi",
						link: "/penatausahaan/pengeluaran/spm/verifikasi",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-sp2d',
				title: "SP2D",
				hint: "Surat Perintah Pencairan Dana",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-sp2d-pembuatan',
						title: "Pembuatan",
						link: "/penatausahaan/pengeluaran/sp2d/pembuatan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-sp2d-validasi',
						title: "Verifikasi",
						link: "/penatausahaan/pengeluaran/sp2d/validasi",
					},
					{
						id: '!!-penatausahaan-pengeluaran-sp2d-pencairan',
						title: "Pencairan",
						link: "/penatausahaan/pengeluaran/sp2d/pencairan",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-sp3b',
				title: "SP3B",
				hint: "Surat Permintaan Pengesahan Pendapatan dan Belanja Daerah",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-sp3b-pembuatan',
						title: "Pembuatan",
						link: "/penatausahaan/pengeluaran/sp3b/pembuatan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-sp3b-pengesahan',
						title: "Pengesahan",
						link: "/penatausahaan/pengeluaran/sp3b/pengesahan",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-pelimpahanupgu',
				title: "Pelimpahan UP / GU",
				hint: "Pelimpahan Uang Persediaan / Ganti Uang",
				link: "/penatausahaan/pengeluaran/pelimpahan-up-gu",
			},
			{
				id: '!!-penatausahaan-pengeluaran-tbp',
				title: "TBP",
				hint: "Tanda Bukti Pembayaran",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-tbp-upgu',
						title: "UP / GU",
						hint: "Uang Persediaan / Ganti Uang",
						link: "/penatausahaan/pengeluaran/tbp/up-gu",
					},
					{
						id: '!!-penatausahaan-pengeluaran-tbp-tu',
						title: "TU",
						hint: "Tambah Uang",
						link: "/penatausahaan/pengeluaran/tbp/tu",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-sts',
				title: "STS",
				hint: "Surat Tanda Setoran",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-sts-upgu',
						title: "UP / GU",
						hint: "Uang Persediaan / Ganti Uang",
						link: "/penatausahaan/pengeluaran/daftar-rekanan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-sts-tu',
						title: "TU",
						hint: "Tambah Uang",
						link: "/penatausahaan/pengeluaran/daftar-rekanan",
					},
					{
						id: '!!-penatausahaan-pengeluaran-sts-ls',
						title: "LS",
						hint: "Langsung",
						link: "/penatausahaan/pengeluaran/daftar-rekanan",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-bku',
				title: "BKU",
				hint: "Buku Kas Umum",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-bku-skpd',
						title: "SKPD",
						hint: "Buku Kas Umum SKPD",
						link: "/penatausahaan/pengeluaran/bku/skpd",
					},
					{
						id: '!!-penatausahaan-pengeluaran-bku-pemda',
						title: "Pemda",
						hint: "Buku Kas Umum Pemda",
						link: "/penatausahaan/pengeluaran/bku/pemda",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-lpj',
				title: "LPJ",
				hint: "Laporan Pertanggung Jawaban",
				link: "#!",
				children: [
					{
						id: '!!-penatausahaan-pengeluaran-lpj-upgu',
						title: "UP / GU",
						hint: "Uang Persediaan / Ganti Uang",
						link: "/penatausahaan/pengeluaran/lpj/up-gu",
					},
					{
						id: '!!-penatausahaan-pengeluaran-lpj-tu',
						title: "TU",
						hint: "Tambah Uang",
						link: "/penatausahaan/pengeluaran/lpj/tu",
					},
					{
						id: '!!-penatausahaan-pengeluaran-lpj-administratiffungsional',
						title: "Administratif / Fungsional",
						link: "/penatausahaan/pengeluaran/lpj/administratif",
					},
				],
			},
			{
				id: '!!-penatausahaan-pengeluaran-daftarrekanan',
				title: "Daftar Rekanan",
				link: "/penatausahaan/pengeluaran/daftar-rekanan?=1",
			},
			
			// {
			// 	id: '!!-penatausahaan-pengeluaran-npd',
			// 	title: "NPD",
			// 	hint: "Nota Pencairan Dana",
			// 	link: "#!",
			// 	except_rbac: true,
			// 	children: [
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-npd-pembuatan',
			// 			title: "Pembuatan",
			// 			link: "/penatausahaan/pengeluaran/npd/pembuatan",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-npd-otorisasi',
			// 			title: "Otorisasi",
			// 			link: "/penatausahaan/pengeluaran/npd/otorisasi",
			// 			except_rbac: true,
			// 		},
			// 	],
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-tu',
			// 	title: "Tambah Uang",
			// 	link: "#!",
			// 	except_rbac: true,
			// 	children: [
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-tu-otorisasi',
			// 			title: "Otorisasi",
			// 			link: "/penatausahaan/pengeluaran/tambah-uang/otorisasi",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-tu-buku-kendali',
			// 			title: "Buku Kendali",
			// 			link: "/penatausahaan/pengeluaran/tambah-uang/buku-kendali",
			// 			except_rbac: true,
			// 		},
			// 	],
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-sptjm',
			// 	title: "SPTJM",
			// 	hint: "Surat Pernyataan Tanggung Jawab Mutlak",
			// 	link: "#!",
			// 	except_rbac: true,
			// 	children: [
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-sptjm-spp',
			// 			title: "SPP",
			// 			hint: "Surat Permintaan Pembayaran",
			// 			link: "/penatausahaan/pengeluaran/sptjm/spp",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-sptjm-spm',
			// 			title: "SPM",
			// 			hint: "Surat Perintah Membayar",
			// 			link: "#!",
			// 			except_rbac: true,
			// 			children: [
			// 				{
			// 					id: '!!-penatausahaan-pengeluaran-sptjm-spm-pembuatan',
			// 					title: "Pembuatan",
			// 					link: "/penatausahaan/pengeluaran/sptjm/spm/pembuatan",
			// 					except_rbac: true,
			// 				},
			// 				{
			// 					id: '!!-penatausahaan-pengeluaran-sptjm-spm-verifikasi',
			// 					title: "Verifikasi",
			// 					link: "/penatausahaan/pengeluaran/sptjm/spm/verifikasi",
			// 					except_rbac: true,
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-sp2d',
			// 	title: "SP2D",
			// 	hint: "Surat Perintah Pencairan Dana",
			// 	link: "/penatausahaan/pengeluaran/sp2d",
			// 	except_rbac: true,
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-pengesahan',
			// 	title: "Pengesahan",
			// 	link: "#!",
			// 	except_rbac: true,
			// 	children: [
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-pengesahan-lpj',
			// 			title: "LPJ",
			// 			hint: "Laporan Pertanggung Jawaban",
			// 			link: "/penatausahaan/pengeluaran/pengesahan/lpj",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-pengesahan-sts',
			// 			title: "STS",
			// 			hint: "Surat Tanda Setoran",
			// 			link: "/penatausahaan/pengeluaran/pengesahan/sts",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-pengesahan-spj',
			// 			title: "SPJ",
			// 			hint: "Surat Pertanggung Jawaban",
			// 			link: "/penatausahaan/pengeluaran/pengesahan/spj",
			// 			except_rbac: true,
			// 		},
			// 	],
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-kartu-kendali-kegiatan',
			// 	title: "Kartu Kendali Kegiatan",
			// 	link: "/penatausahaan/pengeluaran/kartu-kendali-kegiatan",
			// 	except_rbac: true,
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-kontrak',
			// 	title: "Kontrak (SPK)",
			// 	link: "/penatausahaan/pengeluaran/kontrak",
			// 	except_rbac: true,
			// },
			// {
			// 	id: '!!-penatausahaan-pengeluaran-kkpd',
			// 	title: "KKPD",
			// 	hint: "Kartu Kredit Pemerintahan Daerah",
			// 	link: "#!",
			// 	except_rbac: true,
			// 	children: [
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-kkpd-pembayaran-tagihan',
			// 			title: "Pembayaran Tagihan",
			// 			link: "/penatausahaan/pengeluaran/kkpd/pembayaran-tagihan",
			// 			except_rbac: true,
			// 		},
			// 		{
			// 			id: '!!-penatausahaan-pengeluaran-kkpd-sptjm',
			// 			title: "SPTJM.",
			// 			hint: "Surat Pernyataan Tanggung Jawab Mutlak",
			// 			link: "#!",
			// 			except_rbac: true,
			// 			children: [
			// 				{
			// 					id: '!!-penatausahaan-pengeluaran-kkpd-sptjm-spp',
			// 					title: "SPP.",
			// 					hint: "Surat Permintaan Pembayaran",
			// 					link: "/penatausahaan/pengeluaran/kkpd/sptjm/spp",
			// 					except_rbac: true,
			// 				},
			// 				{
			// 					id: '!!-penatausahaan-pengeluaran-kkpd-sptjm-spm',
			// 					title: "SPM.",
			// 					hint: "Surat Perintah Membayar",
			// 					link: "/penatausahaan/pengeluaran/kkpd/sptjm/spm",
			// 					except_rbac: true,
			// 				},
			// 			],
			// 		},
			// 	],
			// },
		],
	},
	{
		id: '!!-penatausahaan-penerimaan',
		title: "Penerimaan",
		icon: FiTrendingDown,
		link: "#!",
		children: [
			{
				// STBP
				id: '!!-penatausahaan-penerimaan-stbp',
				title: "STBP",
				hint: "Surat Tanda Bukti Penerimaan",
				link: "/penatausahaan/penerimaan/stbp",
			},
			{
				// STS
				id: '!!-penatausahaan-penerimaan-sts',
				title: "STS",
				hint: "Surat Tanda Setor",
				link: "/penatausahaan/penerimaan/sts",
			},
		]
	},
	{
		id: '!!-penatausahaan-pembiayaan-main',
		title: "Pembiayaan",
		icon: FiShoppingBag,
		link: "/penatausahaan/pembiayaan",
		except_rbac: true,
	},
	{
		isHeadr: true,
		title: "Laporan",
	},
	{
		id: '!!-penatausahaan-akuntansi-main',
		title: "Akuntansi",
		icon: FiFileText,
		link: "#!",
		except_rbac: true,
		children: [
			{
				id: '!!-laporan-akuntansi-kebijakan-akuntansi',
				title: "Kebijakan Akuntansi",
				link: "#!",
				except_rbac: true,
			},
			{
				id: '!!-laporan-akuntansi-jurnal-umum',
				title: "Jurnal Umum",
				link: "#!",
				except_rbac: true,
				children: [
					{
						id: '!!-laporan-akuntansi-jurnal-umum-reklasifikasi',
						title: "Reklasifikasi",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-jurnal-umum-koreksi',
						title: "Koreksi",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-jurnal-umum-jurnal-umum',
						title: "Jurnal Umum",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-jurnal-umum-transaks-non-anggaran',
						title: "Transaksi non Anggaran",
						link: "#!",
						except_rbac: true,
					},
				]
			},
			{
				id: '!!-laporan-akuntansi-pembuatan-jurnal',
				title: "Pembuatan Jurnal",
				link: "#!",
				except_rbac: true,
				children: [
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-anggaran',
						title: "Anggaran",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-pendapatan',
						title: "Pendapatan",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-belanja',
						title: "Belanja",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-pembiayaan',
						title: "Pembiayaan",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-jurnal-umum',
						title: "Jurnal Umum",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-pembalik',
						title: "Pembalik",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-penutup',
						title: "Penutup",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-pembuatan-jurnal-eliminasi',
						title: "Eliminasi",
						link: "#!",
						except_rbac: true,
					},

				]
			},
			{
				id: '!!-laporan-akuntansi-buku-jurnal',
				title: "Buku Jurnal",
				link: "#!",
				except_rbac: true,
			},
			{
				id: '!!-laporan-akuntansi-buku-besar',
				title: "Buku Besar",
				link: "#!",
				except_rbac: true,
			},
			{
				id: '!!-laporan-akuntansi-neraca-saldo',
				title: "Neraca Saldo",
				link: "#!",
				except_rbac: true,
			},
			{
				id: '!!-laporan-akuntansi-laporan',
				title: "Laporan",
				link: "#!",
				except_rbac: true,
				children: [
					{
						id: '!!-laporan-akuntansi-laporan-lra',
						title: "LRA",
						hint: "Laporan Realisasi Anggaran",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-laporan-lo',
						title: "LO",
						hint: "Laporan Operasional",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-laporan-neraca',
						title: "Neraca",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-laporan-lpe',
						title: "LPE",
						hint: "Laporan Perubahan Ekuitas",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-laporan-lak',
						title: "LAK",
						hint: "Laporan Arus Kas",
						link: "#!",
						except_rbac: true,
					},
					{
						id: '!!-laporan-akuntansi-laporan-lpsal',
						title: "LPSAL",
						hint: "Laporan Perubahan Saldo Anggaran Lebih",
						link: "#!",
						except_rbac: true,
					},


				]
			},
		]
	},
	{
		isHeadr: true,
		title: "lainnya",
	},
	{
		title: "Keluar",
		icon: FiLogOut,
		link: "/logout",
		except_rbac: true,
	},
];