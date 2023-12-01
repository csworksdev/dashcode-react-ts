declare namespace NodeJS {
    interface ProcessEnv {
        VITE_APP_SERVICE_AUTH_URL: string;
        // Add other environment variables here if needed
    }
}

type RbacAssignAndRevokePayloadType = {
    name?: number;
    user_id?: number;
    district_id?: number;
    assign: string[]
    revoke: string[]
}

type RbacByUserPayloadType = {
    user_id: number;
    district_id: number;
}

type RbacCreatePayloadType = {
    name: string
    description: string
}

type AuthUserInsertPayloadType = {
    nama_user: string
    nik: string
    nip: string
    npwp: string
    alamat: string
    id_pang_gol: number
    tgl_lahir: string
    password: string
    password_repeat: string
}

type ReactSelectType = {
    label: string;
    value: any;
}

type UserListEndpointParams = {
    page: number;
    limit: number;
    filter?: string;
}

type UsersListResponseType = {
    id_user: number
    id_daerah: number
    nip_user: string
    nama_user: string
    id_pang_gol: number
    nik_user: string
    npwp_user: string
    alamat: string
    lahir_user: string
}


type HeaderServiceResponsePagination = {
    currentPage: number;
    nextPage?: number;
    pageCount: number;
    pageSize: number;
    totalCount: number;
}

type BreadcumbType = {
    title: string;
    link: string;
}

type ProfileResponseType = {
    id_user: number
    id_daerah: number
    id_pegawai: number
    nip_user: string
    nama_user: string
    id_pang_gol: number
    nik_user: string
    npwp_user: string
    alamat: string
    lahir_user: string
    id_role: number
    id_skpd: number
    nama_role: string
    nama_skpd: string
    password: string
    tahun: number
    username: string
    kode_kab: string
    kode_prop: string
    nama_daerah: string
}

type SidebarMenuItemsType = {
    id?: string;
    title: string;
    hint?: string;
    isHeadr?: boolean;
    icon?: any;
    link?: string;
    rbac?: boolean;
    breadcumb?: MenuItemsBreadcumbType[];
    children?: MenuItemsType[]
    except_rbac?: boolean
}

type MenuItemsBreadcumbType = {
    title: string;
    link: string;
}

type PegawaiPayload = {
    id_pegawai_kpa: number
    id_role: number
    // id_skpd: number
    id_user: number
    id_user_kpa: number
    status_kepala: string
}

type JadwalListEndpointParams = {
    page: number;
    limit: number;
    filter?: string;
};

type JadwalCreatePayloadType = {
    id_jadwal: number;
};

type JadwalFormCreatePayloadType = {
    no_perda: string;
    no_perkada: string;
    tgl_perda: string;
    tgl_perkada: string;
    id_unik: string;
    id_jadwal_sipd: number;
    id_tahap_sipd: number;
    nama_sub_tahap_jadwal: string;
    waktu_mulai_jadwal: string;
};

type JadwalListResponseType = {
    id_jadwal: number;
    id_jadwal_sipd: number;
    id_unik: string;
    tahun: number;
    id_tahap_sipd: number;
    nama_sub_tahap_jadwal: string;
    waktu_mulai_jadwal: string;
    waktu_selesai_jadwal: string;
    is_locked: number;
    created_at: Date;
    created_by: number;
    created_by_nama: string;
    is_pass: boolean;
};

type DashboardStatisticType = {
    type: number;
    id: string;
    title: string;
    count: number;
    icon: any;
    color: string;
    text: string;
    percent: string;
    icon: string;
    percentClass: string;
}

type RouteType = {
    component: JSX.Element;
    link: string;
}

type PelimpahanPayload = {
    id_bid_urusan: number
    id_giat: number
    id_jadwal: number
    id_jadwal_sipd: number
    id_pegawai_kpa: number
    id_pegawai_pa: number
    id_program: number
    id_sub_giat: number
    id_sub_skpd: number
    id_unit: number
    id_urusan: number
}

type PenugasanPptkPayload = {
    id_pegawai_kpa: number
    id_pegawai_pa: number
    items: PenugasanPptkItemPayload[]
}

type PenugasanPptkItemPayload = {
    id_akun: number
    id_bid_urusan: number
    id_giat: number
    id_jadwal: number
    id_jadwal_sipd: number
    id_pegawai_pptk: number
    id_program: number
    id_sub_giat: number
    id_sub_skpd: number
    id_unit: number
    id_urusan: number
    subs_bl_teks: string
}

type PelimpahanPayload = {
    id_akun: number
    id_bid_urusan: number
    id_giat: number
    id_jadwal: number
    id_jadwal_sipd: number
    id_pegawai_pptk: number
    id_program: number
    id_sub_giat: number
    id_sub_skpd: number
    id_unit: number
    id_urusan: number
    subs_bl_teks: string
}


// type PenugasanPptkPayload = {
//     id_akun: number
//     id_bid_urusan: number
//     id_giat: number
//     id_jadwal: number
//     id_jadwal_sipd: number
//     id_pegawai_pptk: number
//     id_program: number
//     id_sub_giat: number
//     id_sub_skpd: number
//     id_unit: number
//     id_urusan: number
//     subs_bl_teks: string
// }

type PenerbitanSpdResponseType = {
    id_penerbitan_spd: number
    nama_penerbitan_spd: string
}

type PenerbitanSpdResponseType = {
    id_penerbitan_spd: number
    nama_penerbitan_spd: string
}

type PeriodeSpdResponseType = {
    id_periode: number
    nama_periode: string
}

type KebijakanSpdPayloadType = {
    id_penerbitan_spd: number
    id_periode: number
}

type BesaranUpPayload = {
    id_daerah: number
    id_skpd: number
    id_sub_skpd: number
    id_unit: number
    is_up: number
    pagu: number
    nilai_besaran_up: number
    nilai_besaran_up_kkpd: number
    tahun: number
}

type ValidasiBelanjaPayload = {
    id_bidang_urusan: number
    id_giat: number
    id_program: number
    id_skpd: number
    id_sub_skpd: number
    id_urusan: number
    nilai: number
    nilai_rak: number
    kegiatan: string
    kode_kegiatan: string
    sub_kegiatan: string
}

type SkpdResponseList = {
    id_skpd: number
    kode_skpd: string
    nama_skpd: string
    nilai: number
    nilai_rak: number
    status: number
}

type SkpdTableViewList = {
    anggaran: boolean
    rak: boolean
    status: boolean
}

type SpdOtorisasiPayloadType = {
    id_skpd: number
    id_spd: number
    tanggal: string
}

type CreateRkudPayload = {
    id_bank: number
    id_jenis_rkud: number
    is_locked: number
    nama_rekening: string
    no_rekening: string
}

type CreatePermohonanSkpdType = {
    id_bank: number
    nama_rekening: string
}

type SppPayloadType = {
    keterangan: string;
    nilai: number;
    jenis: string;
    tanggal: string;
}

type Sp2dPayloadType = {
    id_bud_penandatangan: number;
    id_rkud: number;
    id_spm: number;
    keperluan: string;
    tanggal: string;
}

type Sp2dUpdatePayloadType = {
    id_bud_penandatangan: number
    id_rkud: number
    keperluan: string
    tanggal: string
}

type SpmPayloadType = {
    keterangan: string;
    tanggal: string;
}

type SkpdResponseListType = {
    id_skpd: number
    nama_skpd: string
    kode_skpd: string
}


type VerifikasiSppPayloadType = {
    diterima: boolean;
    keterangan: string;
    nilai: number;
}

type CreateDaftarRekananType = {

}

type CreateDataPegawaiType = {
    tahun_gaji: number;
    bulan_gaji: number;
    jenis_gaji: number;
    file: any;
}


type DaftarRekananPayloadType = {
    alamat_perusahaan: string
    cabang_bank: string
    id_bank: number
    jenis_rekanan: string
    kategori_rekanan: string
    nama_bank: string
    nama_perusahaan: string
    nama_rekening: string
    nama_tujuan: string
    nik: string
    nomor_rekening: string
    npwp: string
    telepon_perusahaan: string
}

interface SppCreatePayload {
    spp_header: {
        jenis: string
        keterangan: string
        tanggal: string
    }
    spp_ls?: SppLsCreatePayload
    spp_up?: SppUpCreatePayload
    spp_tu?: SppTuCreatePayload
}

interface SppTuCreatePayload {
    id_pengajuan_tu: number
}

interface SppLsCreatePayload {
    nilai_materai_spp: number
    jenis_gaji?: number
    id_bulan?: number
    jenis_ls_spp: string
    id_pegawai_pptk: number
    no_rek_rekanan: string
    id_sumber_dana: number
    menggunakan_data_kontrak: boolean
    nomor_kontrak_po: string
    rincian_belanja: SppLsCreatePayloadSubKegiatan | []
}

interface SppLsCreatePayloadKegiatan {
    id_unit: number
    id_sub_skpd: number
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    id_akun: number
    nilai_anggaran: number
    id_rak_belanja: number
    nilai_input: number
}

interface SppLsCreatePayloadSubKegiatan {
    id_daerah: number
    id_skpd: number
    tahun: number
}

interface SppUpCreatePayload {
    nilai: number
}

interface ResponseListPajakType {
    idPajak: number
    namaPajak: string
    idRekening: number
    kodeRekening: any
    kode_jenis_sinergi: string
}

interface ResponseListPotonganType {
    idPotongan: number
    namaPotongan: string
    idRekening?: number | null
    kodeRekening: any
    kodeNama: string
    kode_jenis_sinergi?: string | null
}

interface SelectedDeductionsType {
    potongan_id: number
    potongan_name: string
    pajak: number
    total: number
}

interface SelectedTaxType {
    total: number
    pajak_id: number
    pajak_name: string
    pajak: number
    id_billing: string
    tanggal_billing: string
    ntpn: string
    tanggal_ntpn: string
}

interface ResponsePajakPotonganListType {
    frontend_id: string
    id_pajak_potongan: number
    jenis_pajak_potongan: string
    nama_pajak_potongan: string
    kode_sinergi: string
    nama_sinergi: string
    id_akun: number
    kode_akun: string
    nama_akun: string
}

interface PayloadPajakPotonganType {
    tipe: 'potongan' | 'pajak'
    frontend_id: string
    id_pajak_potongan: number
    id_billing: string
    tanggal_billing: string
    ntpm: string
    tanggal_ntmp: string
    nilai: number
    name: string
    percent: number
}

interface ResponseDataPegawaiType {
    id_gaji_pegawai: number
    id_daerah: number
    id_skpd: number
    bulan_gaji: number
    tahun_gaji: number
    jenis_gaji: number
    nip_pegawai: string
    nama_pegawai: string
    nik_pegawai: string
    npwp_pegawai: string
    tanggal_lahir_pegawai: string
    id_tipe_jabatan: number
    nama_jabatan: string
    eselon: string
    pppk_pns: number
    golongan: string
    mkg: number
    alamat: string
    status_pernikahan: number
    jumlah_istri_suami: number
    jumlah_anak: number
    jumlah_tanggungan: number
    is_pasangan_pns: string
    nip_pasangan: string
    kode_bank: string
    nama_bank: string
    nomor_rekening_bank_pegawai: string
    belanja_gaji_pokok: number
    perhitungan_suami_istri: number
    perhitungan_anak: number
    belanja_tunjangan_keluarga: number
    belanja_tunjangan_jabatan: number
    belanja_tunjangan_fungsional: number
    belanja_tunjangan_fungsional_umum: number
    belanja_tunjangan_beras: number
    belanja_tunjangan_pph: number
    belanja_pembulatan_gaji: number
    belanja_iuran_jaminan_kesehatan: number
    belanja_iuran_jaminan_kecelakaan_kerja: number
    belanja_iuran_jaminan_kematian: number
    belanja_iuran_simpanan_tapera: number
    belanja_iuran_pensiun: number
    tunjangan_khusus_papua: number
    tunjangan_jaminan_hari_tua: number
    potongan_iwp: number
    potongan_pph_21: number
    zakat: number
    bulog: number
    jumlah_gaji_tunjangan: number
    jumlah_potongan: number
    jumlah_ditransfer: number
    id_transaksi: string
    status_transaksi: string
    transaksi_log: TransaksiLog
    transaksi_note: string
    bpd_code: number
    nomor_transaksi_bank: string
    nama_rekening_bank: string
    is_manual: number
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
}

interface ListPengajuanTuTypes {
    id_pengajuan_tu: number
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    nomor_pengajuan_tu: string
    tanggal_pengajuan_tu: string
    id_sub_skpd: number
    nama_sub_skpd: string
    nilai_pengajuan_tu: number
    keterangan_pengajuan_tu: string
    is_verifikasi_pengajuan_tu: number
    is_otorisasi_pengajuan_tu: number
    created_at: string
}

interface ListPengajuanTuCreateTypes {
    id_pengajuan_tu: number
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    nomor_pengajuan_tu: string
    tanggal_pengajuan_tu: string
    id_sub_skpd: number
    nama_sub_skpd: string
    nilai_pengajuan_tu: number
    keterangan_pengajuan_tu: string
    kode_giat: string
    nama_giat: string
    kode_sub_giat: string
    nama_sub_giat: string
    nip_pptk: string
    nama_pptk: string
}

type PegawaiListType = {
    id: number
    id_daerah: number
    id_skpd: number
    id_user: number
    id_role: number
    nama_role: string
    tahun_pegawai: number
    id_pegawai_kpa: number
    status: string
    id_pegawai_ref: string
    id_user_kpa: number
}

type SppPembuatanListType = {
    id_spp: number
    created_at: string
    nomor_spp: string
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    nilai_spp: number
    tanggal_spp: string
    keterangan_spp: string
    is_verifikasi_spp: number
    verifikasi_spp_by: number
    verifikasi_spp_at: string
    nilai_verifikasi_spp: number
    nilai_materai_spp: number
    keterangan_verifikasi_spp: string
    jenis_spp: string
    jenis_ls_spp: string
    is_kunci_rekening_spp: number
    is_spm: number
    is_gaji: number
    jenis_gaji: number
    bulan_gaji: number
    tahun_gaji: number
    is_tpp: number
    bulan_tpp: number
    tahun_tpp: number
    id_pegawai_pptk: number
    id_pegawai_pa_kpa: number
    is_rekanan_upload: number
    id_kontrak: number
    id_lpj_gu: number
    id_pengajuan_tu: number
    id_ba: number
    id_sumber_dana: number
    is_status_perubahan: number
    status_perubahan_at: string
    status_perubahan_by: number
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
}

type SpmPembuatanListType = {
    id_sp_2_d: number
    id_spm: number
    nomor_spm: string
    id_spp: number
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    nilai_spm: number
    tanggal_spm: string
    nama_sub_skpd: string
    nomor_spp: string
    keterangan_spm: string
    is_verifikasi_spm: number
    verifikasi_spm_by: number
    verifikasi_spm_at: string
    keterangan_verifikasi_spm: string
    jenis_spm: string
    jenis_ls_spm: string
    is_kunci_rekening_spm: number
    is_sptjm_spm: number
    is_status_perubahan: number
    status_perubahan_at: string
    status_perubahan_by: number
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
}

type ListSp2dResponseType = {
    tanggal_spm: string
    nomor_spm: string
    id_sp_2_d: number
    nomor_sp_2_d: string
    id_spm: number
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    nilai_sp_2_d: number
    nilai_materai_sp_2_d: number
    tanggal_sp_2_d: string
    nama_sub_skpd: string
    keterangan_sp_2_d: string
    is_verifikasi_sp_2_d: number
    verifikasi_sp_2_d_by: number
    verifikasi_sp_2_d_at: string
    keterangan_verifikasi_sp_2_d: string
    is_transfer_sp_2_d: number
    transfer_sp_2_d_by: number
    transfer_sp_2_d_at: string
    keterangan_transfer_sp_2_d: string
    jenis_sp_2_d: string
    jenis_ls_sp_2_d: string
    is_kunci_rekening_sp_2_d: number
    is_gaji: number
    jenis_gaji: number
    bulan_gaji: number
    tahun_gaji: number
    is_tpp: number
    bulan_tpp: number
    tahun_tpp: number
    is_pelimpahan: number
    id_pegawai_bud_kbud: number
    id_rkud: number
    id_bank: number
    nama_bank: string
    no_rekening: string
    id_sumber_dana: number
    is_status_perubahan: number
    status_perubahan_at: string
    status_perubahan_by: number
    status_aklap: number
    nomor_jurnal: string
    jurnal_id: number
    metode: string
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
}

type SppPageTypes = {
    code: DocumentTransactionBasicType,
    title: "Uang Persediaan" | "Ganti Uang" | "Tambah Uang" | "Langsung"
}

type DocumentTransactionBasicType = '' | 'UP' | 'GU' | 'TU' | 'LS'
type DocumentTransactionBasicFilterType = '' | 'UP' | 'GU' | 'TU' | 'LS' | 'aktif' | 'draft' | 'diterima' | 'ditolak' | 'dihapus' | 'ditransfer' | 'non-panjar' | 'panjar'
type DocumentTransactionBasicSubTabFilterType = '' | 'draft' | 'diterima'
type NpdDocumentFilterType = '' | 'pembuatan' | 'pertanggungjawaban' | 'selesai'

interface ResponseSp2dReportType {
    jenis: string
    up: Sp2dReportUpType
    ls: Sp2dReportLsType
}

interface Sp2dReportUpType {
    nama_daerah: string
    tahun: number
    nomor_rekening: string
    nama_bank: string
    nomor_sp_2_d: string
    tanggal_sp_2_d: string
    nama_skpd: string
    nama_bp_bpp: string
    nip_bp_bpp: string
    jabatan_bp_bpp: string
    no_rek_bp_bpp: string
    nama_rek_bp_bpp: string
    bank_bp_bpp: string
    npwp_bp_bpp: string
    keterangan_sp2d: string
    nilai_sp2d: number
    nomor_spm: string
    tanggal_spm: string
    nama_ibu_kota: string
    nama_bud_kbud: string
    nip_bud_kbud: string
    jabatan_bud_kbud: string
}

interface Sp2dReportLsType {
    header: HeaderSp2dReportLsType
    detail_belanja: DetailBelanjaSp2dReportLsType[]
    pajak_potongan: PajakPotonganSp2dReportLsType[]
}

interface HeaderSp2dReportLsType {
    nama_daerah: string
    tahun: number
    nomor_rekening: string
    nama_bank: string
    nomor_sp_2_d: string
    tanggal_sp_2_d: string
    nama_skpd: string
    nama_sub_skpd: string
    nama_pihak_ketiga: string
    no_rek_pihak_ketiga: string
    nama_rek_pihak_ketiga: string
    bank_pihak_ketiga: string
    npwp_pihak_ketiga: string
    keterangan_sp2d: string
    nilai_sp2d: number
    nomor_spm: string
    tanggal_spm: string
    nama_ibu_kota: string
    nama_bud_kbud: string
    nip_bud_kbud: string
    jabatan_bud_kbud: string
}

interface DetailBelanjaSp2dReportLsType {
    kode_rekening: string
    uraian: string
    total_anggaran: number
    jumlah: number
}

interface PajakPotonganSp2dReportLsType {
    nama_pajak_potongan: string
    id_billing: string
    nilai_sp2d_pajak_potongan: number
}

interface ResponseNpdListTypes {
    id_npd: number
    nomor_npd: string
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    nilai_npd: number
    nilai_npd_disetujui: number
    tanggal_npd: string
    nomor_selesai: string
    nomor_kurang_lebih: string
    tanggal_npd_selesai: string
    keterangan_npd: string
    is_verifikasi_npd: number
    verifikasi_npd_at: string
    verifikasi_npd_by: number
    is_npd_panjar: number
    is_validasi_npd: number
    kondisi_selesai: number
    validasi_npd_at: string
    validasi_npd_by: number
    is_tbp: number
    tbp_at: string
    tbp_by: number
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    kode_giat: string
    nama_giat: string
    kode_sub_giat: string
    nama_sub_giat: string
}

interface PencairanInformasiType {
    no_rek_pengirim: string
    nama_bank_pengirim: string
    nama_penerima: string
    no_rek_penerima: string
    nama_bank_penerima: string
    bulan: string
    tahun: string
    jenis: string
    nama_skpd: string
    nomor_sp2d: string
    npwp: string
    nilai: number
    netto: number
    potongan: PajakPotonganSp2dReportLsType[]
}

interface ResponseListDetailNpd {
    id_npd_detail: number
    id_npd: number
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    total_pertanggungjawaban: number
    id_giat: number
    id_sub_giat: number
    id_akun: number
    nilai_npd_detail: number
    nilai_npd_detail_disetujui: number
    id_rak_belanja: number
    distribusi: string
    id_pegawai_kpa: number
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
    nama_akun: string
    kode_akun: string
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
    kode_skpd: string
    nama_skpd: string
    kode_sub_skpd: string
    nama_sub_skpd: string
    kode_giat: string
    nama_giat: string
    kode_sub_giat: string
    nama_sub_giat: string
}

interface SelectedRekananType {
    tahun: number
    id_daerah: number
    id_skpd: number
    nomor_rekening: string
    nama_rekening: string
    id_bank: number
    nama_bank: string
    cabang_bank: string
    nama_tujuan: string
    nama_perusahaan: string
    alamat_perusahaan: string
    telepon_perusahaan: string
    npwp: string
    nik: string
    jenis_rekanan: string
    kategori_rekanan: string
    is_valid: number
    is_locked: number
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
}

interface SppLsGroupedKegiatanTypes {
    kode_sub_skpd: string
    nama_sub_skpd: string
    kegiatan: SppLsKegiatanItemTypes[]
}

interface SppLsKegiatanItemTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    kode_giat: string
    nama_giat: string
    nilai_anggaran: number
}

interface SppLsTableGiat {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    kode_giat: string
    nama_giat: string
    nilai_anggaran: number
}

interface SelectedPenandatanganType {
    id: number
    id_daerah: number
    id_skpd: number
    id_user: number
    id_role: number
    nama_role: string
    tahun_pegawai: number
    id_pegawai_kpa: number
    status: string
    id_pegawai_ref: string
    id_user_kpa: number
    nama_user: string
    nip_user: string
}

interface SppLsTableSubGiat {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    kode_sub_giat: string
    nama_sub_giat: string
    nilai_anggaran: number
}

interface SppLsGroupedRekeningTypes {
    kode_sub_skpd: string
    nama_sub_skpd: string
    rekening: SppLsGroupedItemRekeningTypes[]
}

interface SppLsGroupedItemRekeningTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    nilai_pengajuan_detail: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    id_akun: number
    kode_akun: string
    nama_akun: string
    nilai_anggaran: number
    nilai_data_gaji: number
    nilai_input: number
    id_rak_belanja: number
    id_pegawai_pa_kpa: number
}

type AnggaranKeluarTypes = {
    nilai: number;
    pajak: SelectedTaxType[];
    potongan: SelectedDeductionsType[];
}

interface SelectedModalRekeningTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    id_akun: number
    kode_akun: string
    nama_akun: string
    nilai_anggaran: number
    index: number
    nilai_input: number
    sisa_anggaran: number
    pajak_potongan: SelectedModalRekeningPajakPotonganTypes[]
}

interface SppLsPageTypes {
    code: "barang-jasa" | "gaji" | "tpp" | "kontraktual",
    title: "Barang dan Jasa" | "Gaji" | "TPP" | "Kontraktual"
}

interface SelectedRekeningTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    nilai_data_gaji: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    id_akun: number
    kode_akun: string
    nama_akun: string
    nilai_anggaran: number
    nilai_input: number
    sisa_anggaran: number
    id_rak_belanja: number
    id_pegawai_pa_kpa: number
    pajak_potongan: any[]
}

interface SppLsGroupedItemSubKegiatanTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    id_sub_giat: number
    kode_sub_giat: string
    nama_sub_giat: string
    nilai_anggaran: number
}

interface SppLsGroupedSubKegiatanTypes {
    kode_sub_skpd: string
    nama_sub_skpd: string
    sub_kegiatan: SppLsGroupedItemSubKegiatanTypes[]
}

type MainPayloadCreateRecapType = {
    tanggal_npd_rekap: string;
    keterangan: string;
    lampiran_base64: string;
    no_rek_rekanan: string;
    items: MainPayloadCreateRecapItemsType[];
}

type MainPayloadCreateRecapItemsType = {
    id_npd_detail: number;
    nilai_rekap: number;
    nama_akun: string;
    kode_akun: string;
}