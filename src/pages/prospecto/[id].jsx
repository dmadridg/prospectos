import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { server } from '@/backend/utils/server'

const ReviewProspecto = ({ data }) => {
  const router = useRouter()
  const [errorObservacion, setErrorObservacion] = useState({
    error: false,
    message: '',
  })

  const [selectedProspecto, setSelectedProspecto] = useState(
    data.selectedProspecto,
  )
  const [selectedProspectoDocs, setSelectedProspectoDocs] = useState(data.docs)

  const [updateForm, setUpdateForm] = useState({
    id: data.selectedProspecto.id,
    status: '0',
    observacion: '',
  })

  const onSubmit = async () => {
    if (updateForm.status === '0') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Un cambio de status es requerido',
      })
    }
    if (updateForm.status === '2' && updateForm.observacion === '') {
      setErrorObservacion({
        error: true,
        message: 'Observación es requerida',
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
    body.append('data', JSON.stringify(updateForm))

    const response = await fetch('/api/prospecto/updateStatus', {
      method: 'POST',
      body,
    })
      .then((res) => {
        const data = res.json()
        Swal.close()

        Swal.fire({
          icon: 'success',
          title: 'Prospecto actualizado',
          text: 'Se ha actualizado el prospecto',
          allowOutsideClick: false,
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
          text: 'Ocurrió un error al actualizar el prospecto',
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
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.nombre}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.apellido_paterno}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.apellido_materno}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.calle}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.numero_exterior}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.colonia}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.codigo_postal}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.telefono}
                  disabled
                />
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
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  value={selectedProspecto.rfc}
                  disabled
                />
              </div>
            </div>

            <div className="w-full px-4 lg:w-12/12">
              <div className="relative w-full mb-3">
                <h3 className="text-3xl text-black dark:text-gray-200">
                  Documentos
                </h3>

                <div>
                  {selectedProspectoDocs.length > 0 && (
                    <div className="p-3 mt-3 border">
                      {selectedProspectoDocs.map((file, index) => (
                        <p
                          className="text-black dark:text-gray-200"
                          key={index}
                        >
                          {file.documento}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-12/12">
            <div className="relative w-full mb-3">
              <label
                className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                htmlFor="grid-password"
              >
                Status:
              </label>
              <select
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, status: e.target.value })
                }
                className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                value={updateForm.status}
              >
                <option value="0">Selecciona una opción</option>
                <option value="1">Autorizado</option>
                <option value="2">Rechazado</option>
              </select>

              {/* <div className="text-xs italic text-red-500">
                {errors.status?.message}
              </div> */}
            </div>
          </div>

          {updateForm.status === '2' && (
            <div className="w-full px-4 lg:w-12/12">
              <div className="relative w-full mb-3">
                <label
                  className="block mb-2 text-xs font-bold text-blueGray-600 dark:text-gray-200"
                  htmlFor="grid-password"
                >
                  Observacion:
                </label>
                <textarea
                  className={`w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white rounded shadow dark:text-gray-300 form-input focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring`}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      observacion: e.target.value,
                    })
                  }
                  value={updateForm.observacion}
                />
                <div className="text-xs italic text-red-500">
                  {errorObservacion.error ? 'Observación es requerida.' : ''}
                </div>
              </div>
            </div>
          )}

          <div className="block float-right mt-10">
            <button
              className="inline-flex items-center justify-center px-10 py-4 font-medium leading-5 text-white align-bottom transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg cursor-pointer focus:outline-none active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
              type="button"
              onClick={() => onSubmit()}
            >
              Evaluar prospecto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewProspecto

export async function getServerSideProps(context) {
  const { id } = context.query
  const response = await fetch(`${server}/api/prospecto/${id}`, {
    method: 'GET',
  })
  const { selectedProspecto, docs } = await response.json()
  const data = {
    selectedProspecto,
    docs,
  }
  return {
    props: {
      data,
    },
  }
}
