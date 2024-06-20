import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table/Table';
import { GetDataKelompok, UploadKelompok } from '@/infrastruture';
// import ExcelComponent from '../../components/exelComponent';
import { Text, Button, Modal, Anchor, Breadcrumbs } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
// import LoadingAnimation from '../../components/loadingSession';
import SearchInput from '../../components/uiComponents/inputComponents/SearchInput';
// import { RootState } from './infrastucture/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumbItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Data Kelompok' },
  { title: 'Tabel Daftar Kelompok' }
].map((item, index) => (
  <Anchor href={item.href} key={index} className="text-white opacity-50">
    {item.title}
  </Anchor>
));

const columns = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'gapoktan',
    header: 'Gapoktan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'namaKelompok',
    header: 'Nama Kelompok',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'desa',
    header: 'Desa',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  },
  {
    accessorKey: 'kecamatan',
    header: 'Kecamatan',
    cell: (props) => <span>{`${props.getValue()}`}</span>
  }
];

const IndexKelompok = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.state.user);
  // const [datas, setDatas] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [resp, setResp] = useState();
  const [dataTable, setDataTable] = useState();
  const fileInputRef = useRef();
  // const [filters, setFilters] = useState({});
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const location = useLocation();
  // const history = useHistory();

  // useEffect(() => {
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 10;

  // const searchQuery = searchParams.get('search_query') ?? '';
  // const sortKey = searchParams.get('sort_key') ?? '';
  // const sortType = searchParams.get('sort_type') ?? '';

  useEffect(() => {
    GetDataKelompok(page, limit)
      .then((res) => {
        if (res) {
          setResp(res);
          console.log(res);
        } else {
          console.log("Response is undefined");
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, [page, limit]);
  function handleFileChange(event) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    UploadKelompok(file).then(() => {
      window.location.reload();
    });
  }
  useEffect(() => {
    if (resp) {
      setDataTable({
        ...resp,

        data: resp.data.map((item, index) => ({
          ...item,
          no: resp.from + index,
        }))
      });
    }
  }, [resp]);

  return (
    <div>
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      <h3 className="text-white text-2xl font-bold mt-4">DATA KELOMPOK</h3>
      <div className="relativemt-6 mt-4 flex items-center w-full">
        
        <div className="rounded-lg w-full">
          <div className="relative bg-[#136B09] p-4 flex w-full justify-between rounded-t-lg shadow-lg">
            <h3 className="text-white text-2xl font-bold px-3">TABEL DATA KELOMPOK</h3>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
              />
              {/* <Link to={`/list-operator/tambah`}>
                <button className="ms-5 rounded-md bg-[#86BA34] text-white p-1 px-5 w-30 h-10">
                  <FontAwesomeIcon className="text-xl" icon={faPlus} />
                </button>
              </Link> */}
              <Button
                className="bg-[#F29D0E]"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}>
                <FontAwesomeIcon className="text-xl" icon={faUpload} />
                {/* <faUpload /> */}
                <span className="ml-2">Upload File</span>
              </Button>
            </div>
          </div>
          <div className="pt-0">
            <Table data={dataTable} columns={columns} withPaginationCount withPaginationControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexKelompok;
