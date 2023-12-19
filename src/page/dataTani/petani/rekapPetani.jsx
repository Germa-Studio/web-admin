import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faEdit,
  faTrash,
  faDownload,
  faBullseye,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { GetDaftarTani, DeleteDaftarTani } from "@/infrastruture";
import ExcelComponent from "../../../components/exelComponent";
import { Text, Button, Modal,Tooltip, Anchor, Breadcrumbs, TextInput } from "@mantine/core";
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../components/loadingSession'
import SearchInput from "../../../components/uiComponents/inputComponents/searchInput";

const breadcrumbItems = [
  { title: "Dashboard", href: "/" },
  { title: "Data Petani" },
  { title: "Tabel Petani" },
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));
const RekapPetani = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true)
  const [modalDeleteData, setModalDeleteData] = useState(false);
  useEffect(() => {
    GetDaftarTani().then((data) => {
    const combinedData = data.map(item => {
      const petani = { ...item }; // Duplicating the petani data
      petani.namaKelompok = item.kelompok?.namaKelompok || ""; // Adding kelompok data to petani object
      petani.gapoktan = item.kelompok?.gapoktan || ""; // Adding kelompok data to petani object
      petani.penyuluh = item.dataPenyuluh?.nama || ""; // Adding kelompok data to petani object
      return petani;
    });
      setDatas(combinedData)
      setLoading(false)
    });
  }, []);
  const [filters, setFilters] = useState({
    kecamatan: "",
    desa: "",
    nik: "",
    nama: "",
    namaKelompok: "",
    gapoktan: "",
    penyuluh: "",
  });
  const handleFilterChange = (e, column) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: e.target.value,
    }));
  };
  const handleDeleteUser = (ids) => {
    DeleteDaftarTani(ids);
  };
  const filteredData = datas.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] !== "") {
          if (typeof item[key] === "number") {
            return item[key] === Number(filters[key]);
          } else if(typeof item[key] === "string"){
            return item[key].toLowerCase().includes(filters[key].toLowerCase());
          }
        }
      return true;
    });
  });
  const handleDownlod = () => {
    const dataExel = filteredData.map((item) => {
      return {
        NIK: item.NIK,
        ["No Wa"]: item.NoWa,
        Alamat: item.alamat,
        Kecamatan: item.kecamatan,
        Desa: item.desa,
        nama: item.nama,
        password: item.password,
        namaKelompok: item?.kelompok?.namaKelompok,
        gapoktan: item?.kelompok?.gapoktan,
        penyuluh: item?.dataPenyuluh?.nama
      };
    });
    ExcelComponent(dataExel, "data.xlsx", "Sheet1");
  };
  const totalData = filteredData.length;
  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">
        TABEL DATA PETANI
      </h3>
      <SearchInput placeholder="Cari NIK PETANI / POKTAN" />
      <div className="relativemt-6 mt-4 flex items-center w-full">
        <Modal
          opened={modalDeleteData}
          onClose={() => setModalDeleteData(false)}
          withCloseButton={false}
          centered
        >
          <Text>Apakah Kamu Yakin Akan Menghapus Data Ini ?</Text>
          <div
            style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
          >
            <Button
              color="cyan"
              style={{
                color: "white",
                backgroundColor: "#303A47",
                marginRight: 8,
              }}
              onClick={() => setModalDeleteData(false)}
            >
              Cancel
            </Button>
            <Button
              color="cyan"
              style={{ color: "white", backgroundColor: "red" }}
              type="submit"
              onClick={() => {
                handleDeleteUser(modalDeleteData);
                setModalDeleteData(false);
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
        <div className="bg-[#D9D9D9] rounded-lg w-full">
        <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
          <h3 className="text-white text-2xl font-bold px-3">
            DATA TABEL PETANI
          </h3>
          <Link to={`/data-tani/tambah`}>
              <button className="ms-5 rounded-md bg-[#86BA34] text-white p-1 px-5 w-30 h-10"> 
                <FontAwesomeIcon className="text-xl"
                  icon={faPlus}
                /></button>
            </Link>
        </div>
          <div className="pt-0">
            <div className="h-[calc(100vh-200px) p-6 flex justify-between items-center">
              <table className="min-w-full shadow-md">
                <thead className="bg-[#079073] text-white">
                  <tr>
                    <th  className="sticky top-0 px-4 py-2 truncate">
                      NO
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      NIK PETANI
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      NAMA PETANI
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      KONTAK PETANI
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      KECAMATAN
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      DESA
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate ">
                      PEMBINA
                    </th>
                    <th className="sticky top-0 px-4 py-2 truncate">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white text-black font-medium' : 'bg-[#D1D9D3] text-emerald-800 font-medium'}`}>
                      <td className="px-4 py-2 text-center ">{index + 1}</td>
                      <td className="px-4 py-2 text-center ">{item?.nik}</td>
                      <td className="px-4 py-2 text-center ">{item?.nama}</td>
                      <td className="px-4 py-2 text-center ">{item?.noTelp}</td>
                      <td className="px-4 py-2 text-center ">{item?.kecamatan}</td>
                      <td className="px-4 py-2 text-center ">{item?.desa}</td>
                      <td className="px-4 py-2 text-center ">{item?.penyuluh}</td>
                      <td className="px-2 py-2 text-center">
                        <Tooltip label="Detail">
                          <a href={`/data-tani/detail/${item.id}`} >
                            <FontAwesomeIcon
                              icon={faBullseye}
                              className="cursor-pointer text-black hover:text-black"
                            />
                          </a>
                        </Tooltip>
                        <Tooltip label="Edit">
                          <a href={`/rekap-data-tani/edit/${item.id}`}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="mr-2 ml-2 cursor-pointer text-blue-500 hover:text-blue-600"
                            />
                          </a>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <FontAwesomeIcon
                            onClick={() => setModalDeleteData(item?.id)}
                            icon={faTrash}
                            className="cursor-pointer text-red-500 hover:text-red-600"
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading &&
              <LoadingAnimation/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapPetani;
