interface PageHeaderProps {
    pageName: string;
  }
  
  function PageHeader({ pageName }: PageHeaderProps) {
    
    return (
      <div className="bg-white rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mx-auto max-w-screen-2xl 2xl:pt-4 md:p-6 2xl:p-0 xl:pb-2">
          <div className=" flex justify-between items-center mb-15">
            <div className="mx-auto ml-8 mt-6 ">
              <h3 className="mb-2 font-bold text-4xl pb-3 text-graydark drop-shadow-lg shadow-black dark:text-white">Crear Recepción</h3>
              <p className="text-2xl drop-shadow-lg shadow-black">Crea una recepción, añade la información de tu paciente y sus exámenes a realizar.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default PageHeader;