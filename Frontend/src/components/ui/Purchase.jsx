function Purchase() {
  return (
    <div className="bg-gray-600 p-8">
      <div className="mx-auto rounded-xl overflow-hidden bg-gray-800 shadow-2xl shadow-blue-900 mt-20">
        <div className="md:flex">
          <p className="text-gray-500 w-full">
            <div className="flex flex-col">
              <div className="relative grid h-[25rem] flex-col items-end justify-center overflow-hidden bg-white bg-clip-border text-center text-gray-700">
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-signin bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                </div>
                <div className="relative p-6 px-6 py-14 md:px-12">
                  <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    How we design and code open-source projects?
                  </h2>
                  <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                    Tania Andrew
                  </h5>
                  <img
                    alt="Tania Andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </p>
        </div>
        <p className="text-white p-10 text-4xl">
          Choose the plan that&apos;s right for you
        </p>
        <div className="flex flex-wrap space-x-4 p-4 justify-evenly">
          <div>
            <div className="max-w-md p-6 bg-gray-900 border border-gray-700 rounded-lg shadow shadow-blue-900">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                  Starter
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Access to a wide selection of movies and shows, including new
                releases and exclusive content.
              </p>
              <h5 className="my-11 text-3xl tracking-tight text-white">
                199 <span className="text-gray-500 text-sm">/month</span>
              </h5>
              <button
                type="submit"
                className="w-full text-black bg-gradient-to-r from-gold to-yellow-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
              </button>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="max-w-md p-6 bg-gray-900 border border-gray-700 rounded-lg shadow shadow-blue-900">
              <div className="flex justify-between">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                    Standard
                  </h5>
                </a>
                <img src="premium.png" alt="premium" className="h-100 w-200" />
              </div>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Access to a wide selection of movies and shows, including new
                releases and exclusive content and much more
              </p>
              <h5 className="my-8 text-3xl tracking-tight text-white">
                169{" "}
                <span className="text-gray-500 text-sm">
                  /month(rs1015 for 6 months)
                </span>
              </h5>
              <button
                type="submit"
                className="w-full text-black bg-gradient-to-r from-gold to-yellow-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
              </button>
            </div>
          </div>
          {/*  */}

          <div>
            <div className="max-w-md p-6 bg-gray-900 border border-gray-700 rounded-lg shadow shadow-blue-900">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                  Premium
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Access to a wide selection of movies and shows, including new
                releases and exclusive content and much more
              </p>
              <h5 className="my-8 text-3xl tracking-tight text-white">
                149{" "}
                <span className="text-gray-500 text-sm">
                  /month(rs1799 for 12 months)
                </span>
              </h5>
              <button
                type="submit"
                className="w-full text-black bg-gradient-to-r from-gold to-yellow-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
              </button>
            </div>
          </div>
          {/*  */}
        </div>
        <p className="text-white p-10 text-4xl">
          Compare our plans and find the right one for you
        </p>
        <div className="flex justify-center mx-40 my-10">
          <table className="table-auto border-collapse rounded-lg">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th className="border px-4 py-2">Features</th>
                <th className="border px-4 py-2">Starter</th>
                <th className="border px-4 py-2">
                  <div className="flex">
                    Standard{" "}
                    <img
                      src="premium.png"
                      alt="premium"
                      className="h-100 w-200 px-5"
                    />
                  </div>
                </th>
                <th className="border px-4 py-2">Premium</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <tr>
                <td className="border px-4 py-2">Price</td>
                <td className="border px-4 py-2">rs199/Month</td>
                <td className="border px-4 py-2">rs169/Month</td>
                <td className="border px-4 py-2">rs149/Month</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Content</td>
                <td className="border px-4 py-2">
                  {" "}
                  Access to a wide selection of movies and shows, including new
                  releases and exclusive content and much more
                </td>
                <td className="border px-4 py-2">
                  {" "}
                  Access to a wide selection of movies and shows, including new
                  releases and exclusive content and much more
                </td>
                <td className="border px-4 py-2">
                  {" "}
                  Access to a wide selection of movies and shows, including new
                  releases and exclusive content and much more
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2"> Devices</td>
                <td className="border px-4 py-2">
                  Watch on One device simultaneously
                </td>
                <td className="border px-4 py-2">
                  Watch on Two device simultaneously
                </td>
                <td className="border px-4 py-2">
                  Watch on One device simultaneously
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Offline Viewing</td>
                <td className="border px-4 py-2">Basic 1</td>
                <td className="border px-4 py-2">Standard 1</td>
                <td className="border px-4 py-2">Premium 1</td>
              </tr>
              <tr>
                <td className="border px-4 py-2"> HDR</td>
                <td className="border px-4 py-2">Basic 1</td>
                <td className="border px-4 py-2">Standard 1</td>
                <td className="border px-4 py-2">Premium 1</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Dolby Atmos</td>
                <td className="border px-4 py-2">Basic 1</td>
                <td className="border px-4 py-2">Standard 1</td>
                <td className="border px-4 py-2">Premium 1</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Ad-Free</td>
                <td className="border px-4 py-2">Basic 1</td>
                <td className="border px-4 py-2">Standard 1</td>
                <td className="border px-4 py-2">Premium 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
