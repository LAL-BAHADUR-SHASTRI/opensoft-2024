import React from "react";

function PlanCard({ name, description, price, duration, onClick }) {
  return (
    <div className="relative max-w-sm p-8 bg-gray-900 border border-gray-700 rounded-lg shadow shadow-blue-900">
      {name === "Standard" ? (
        <p className="absolute m-2 top-0 right-0 text-secondary-foreground bg-secondary  font-sm rounded-sm text-sm px-2 py-1 text-center">
          Popular
        </p>
      ) : (
        <></>
      )}
      <h5 className="mb-2 text-xl font-bold tracking-tight text-white text-left">
        {name}
      </h5>
      <p className="mb-6 font-normal text-gray-400 text-left">{description}</p>
      <h5 className="my-6 text-2xl tracking-tight text-white text-left">
        ₹{price} <span className="text-gray-500 text-sm">/{duration}</span>
      </h5>
      <button
        type="submit"
        className="w-full text-secondary-foreground bg-secondary focus:ring-2  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={onClick}>
        Choose Plan
      </button>
    </div>
  );
}

function Purchase() {
  const plans = [
    {
      name: "Starter",
      price: "199",
      duration: "month",
      description:
        "Access to a wide selection of movies and shows, including new releases and exclusive content.",
      devices: "One device simultaneously",
      offlineViewing: "NO",
      hdr: "NO",
      dolbyAtmos: "NO",
      adFree: "NO",
    },
    {
      name: "Standard",
      price: "169",
      duration: "month (rs1015 for 6 months)",
      description:
        "Access to a wide selection of movies and shows, including new releases and exclusive content and much more",
      devices: "Two devices simultaneously",
      offlineViewing: "NO",
      hdr: "YES",
      dolbyAtmos: "NO",
      adFree: "YES",
    },
    {
      name: "Premium",
      price: "149",
      duration: "month (rs1799 for 12 months)",
      description:
        "Access to a wide selection of movies and shows, including new releases and exclusive content and much more",
      devices: "One device simultaneously",
      offlineViewing: "YES",
      hdr: "YES",
      dolbyAtmos: "YES",
      adFree: "YES",
    },
  ];

  return (
    <div className="bg-background px-8 py-2">
      <div className=" w-full text-left text-sm ">
        <div class="flex flex-row items-center justify-evenly gap-20 py-10">
          <div className="w-30 h-30 bg-white">logo</div>
          <div>
            <h1 className="mt-4 text-4xl font-semi text-white">
              Upgrade your <span className=" text-secondary">viewing</span>{" "}
              experience
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Access to a wider selection of movies and shows, including most
              new releases and exclusive content
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto rounded-xl overflow-hidden bg-background shadow-2xl shadow-blue-950">
        {/* Plans */}
        <p className="text-white p-10 text-3xl  font-semibold text-left ">
          Choose the plan that's right for you
        </p>
        <div className="flex flex-wrap gap-8 space-x-4 p-4 justify-evenly">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>

        <p className="text-white p-10 text-3xl font-semibold text-left ">
          Compare our plans and find the right one for you
        </p>

        <div className="flex justify-center mx-40 my-10 text-left text-sm  ">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead class="text-xs text-accent-foreground uppercase bg-accent">
                <tr>
                  <th scope="col" class=" px-6 py-4 text-sm">
                    Features
                  </th>
                  {plans.map((plan, index) => (
                    <th key={index} scope="col" class=" px-6 py-3 ">
                      <div className="flex flex-row items-center">
                        <p className="">{plan.name}</p>
                        {plan.name === "Standard" ? (
                          <p className=" m-2 block text-secondary-foreground bg-secondary  font-sm rounded-sm text-sm px-2 py-1 text-center">
                            Popular
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Price
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.price} / {plan.duration}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Content
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.description}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Devices
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.devices}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Offline Viewing
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.offlineViewing}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    HDR
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.hdr}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Dolby Atmos
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.dolbyAtmos}
                    </td>
                  ))}
                </tr>
                <tr class=" border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap">
                    Ad-Free
                  </th>
                  {plans.map((plan, index) => (
                    <td key={index} class="px-6 py-4">
                      {plan.adFree}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
