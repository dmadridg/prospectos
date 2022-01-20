import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NuevoProspecto = () => {
  const [files, setFiles] = useState([])
  const router = useRouter()
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre is required'),
    apellidoPaterno: Yup.string().required('Apellido Paterno is required'),
    calle: Yup.string().required('Calle is required'),
    numeroExterior: Yup.number().required('Numero Exterior is required'),
    colonia: Yup.string().required('Colonio is required'),
    codigoPostal: Yup.string().required('Código Postal is required'),
    telefono: Yup.string().required('Teléfono is required'),
    rfc: Yup.string().required('RFC is required'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const [errorFiles, setErrorFiles] = useState({
    error: false,
    message: '',
  })

  const saveFileToArray = (e) => {
    setErrorFiles({
      error: false,
      message: '',
    })
    setFiles([])
    Array.from(e.target.files).forEach((file) => {
      setFiles((files) => [...files, file])
    })
  }

  const onSubmit = async (data) => {
    if (files.length === 0) {
      setErrorFiles({
        error: true,
        message: 'Debe seleccionar al menos un archivo',
      })
      return
    }

    Swal.fire({
      title: 'Validando información',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const body = new FormData()

    files.forEach((file, index) => {
      body.append(`file_${index + 1}`, file)
    })

    body.append('data', JSON.stringify(data))
    body.append('no_files', files.length)

    const response = await fetch('/api/prospecto/createProspecto', {
      method: 'POST',
      contentType: 'multipart/form-data',
      body,
    })
      .then((res) => {
        const data = res.json()
        Swal.close()

        Swal.fire({
          icon: 'success',
          title: 'Prospecto creado',
          text: 'Se ha registrado el prospecto',
        }).then((result) => {
          if (result.value) {
            router.push('/')
          }
        })
      })
      .catch((err) => {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el prospecto',
        })
      })

    return false
  }

  return (
    <div className="container grid px-6 mx-auto">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="my-6 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-gray-200">
            Nuevo Prospecto
          </h2>
        </div>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.nombre ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('nombre')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.nombre?.message}
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Apellido Paterno:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.apellidoPaterno
                      ? 'border !border-red-500 rounded'
                      : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('apellidoPaterno')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.apellidoPaterno?.message}
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Apellido Materno:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.apellidoMaterno
                      ? 'border !border-red-500 rounded'
                      : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('apellidoMaterno')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.apellidoMaterno?.message}
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Calle:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.calle ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('calle')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.calle?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  No. Ext:
                </label>
                <input
                  type="number"
                  className={`${
                    errors.numeroExterior
                      ? 'border !border-red-500 rounded'
                      : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('numeroExterior')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.numeroExterior?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Colonia:
                </label>
                <input
                  className={`${
                    errors.colonia ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('colonia')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.colonia?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Código postal:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.codigoPostal ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('codigoPostal')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.codigoPostal?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Teléfono:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.telefono ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('telefono')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.telefono?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  RFC:
                </label>
                <input
                  type="text"
                  className={`${
                    errors.rfc ? 'border !border-red-500 rounded' : ''
                  } w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  {...register('rfc')}
                />
                <div className="text-xs italic text-red-500">
                  {errors.rfc?.message}
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-12/12">
              <div className="relative w-full mb-3">
                <h3 className="text-3xl text-black dark:text-gray-200">
                  Documentos
                </h3>
                <label
                  className="block mt-5 mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Archivos:
                </label>
                <input
                  multiple
                  type="file"
                  name="archivos[]"
                  onChange={saveFileToArray}
                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                />
                <div>
                  {files.length > 0 && (
                    <div className="p-3 mt-3 border">
                      {files.map((file, index) => (
                        <p
                          className="text-black dark:text-gray-200"
                          key={index}
                        >
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="text-xs italic text-red-500">
                    {errorFiles.error ? 'Documentos son requeridos' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block float-right mt-10">
            <button
              className="inline-flex items-center justify-center px-10 py-4 mr-2 font-medium leading-5 text-white align-bottom transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg cursor-pointer focus:outline-none active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
              type="submit"
            >
              Guardar prospecto
            </button>
            <button
              className="inline-flex items-center justify-center px-10 py-4 font-medium leading-5 text-white align-bottom transition-colors duration-150 bg-red-600 border border-transparent rounded-lg cursor-pointer focus:outline-none active:bg-red-600 hover:bg-red-700 focus:shadow-outline-purple"
              type="button"
              onClick={() => {
                Swal.fire({
                  title: '¿Estás seguro?',
                  text: 'Se perderán todos los datos',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Salir',
                  cancelButtonText: 'Cancelar',
                }).then((result) => {
                  if (result.value) {
                    router.push('/')
                  }
                })
              }}
            >
              Salir
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NuevoProspecto
