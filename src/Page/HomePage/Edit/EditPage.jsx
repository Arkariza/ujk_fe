import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { API_CRUD } from "../../../Services/baseUrl"


export default function EditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nm_siswa: "",
    alamat_siswa: "",
    tgl_lahir: "",
    jurusan: "",
  })

  useEffect(() => {
    if (!id) return
    axios
      .get(`${API_CRUD}/get/${id}`)
      .then((res) => {
        const payload = res.data?.data ?? res.data
        const record = Array.isArray(payload) ? payload[0] : payload
        if (record && typeof record === "object") {
          setForm({
            nm_siswa: record.nm_siswa || "",
            alamat_siswa: record.alamat_siswa || "",
            tgl_lahir: record.tgl_lahir || "",
            jurusan: record.jurusan || "",
          })
        }
      })
      .catch(() => alert("Gagal mengambil data"))
      .finally(() => setFetching(false))
  }, [id])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    try {
      await axios.put(`${API_CRUD}/edit/${id}`, form)
      setSuccess(true)
      navigate("/home-page")
    } catch {
      alert("Gagal menyimpan perubahan")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">Memuat data siswa…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-lg mt-10">

        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">Kode Siswa: {id}</p>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Siswa</h1>
          <p className="text-sm text-gray-500 mt-0.5">Perbarui informasi data siswa</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">

          <div className="space-y-1.5">
            <label htmlFor="nm_siswa" className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Nama Siswa
            </label>
            <input
              id="nm_siswa"
              name="nm_siswa"
              value={form.nm_siswa}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="alamat_siswa" className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Alamat
            </label>
            <textarea
              id="alamat_siswa"
              name="alamat_siswa"
              value={form.alamat_siswa}
              onChange={handleChange}
              rows={3}
              placeholder="Masukkan alamat lengkap"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="tgl_lahir" className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Tanggal Lahir
            </label>
            <input
              id="tgl_lahir"
              name="tgl_lahir"
              type="date"
              value={form.tgl_lahir}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Jurusan
            </label>
            <input
              id="jurusan"
              name="jurusan"
              value={form.jurusan}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition"
            />
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-lg transition-colors duration-150 active:scale-95"
            >
              {loading ? "Menyimpan…" : "Simpan Perubahan"}
            </button>
            <Link
              to="/home-page"
              className="flex-1 py-2.5 text-sm font-medium text-center text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              Batal
            </Link>
          </div>
          {success && (
            <p className="text-center text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg py-2">
              Data berhasil disimpan
            </p>
          )}
        </div>
      </div>
    </div>
  )
}