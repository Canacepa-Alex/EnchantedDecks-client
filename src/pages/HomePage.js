import { Link,} from "react-router-dom";

import bg from "../magic.png"

export default function HomePage() {




  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex flex-row items-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome
          </h1>
        </div>
      </header>
      <main>
        <div className="flex justify-center h-[48.8rem] items-center mx-auto w-screen">
        <img className="h-[45rem]"
                        src={bg}
                        alt="Your Company"
                      />
        </div>
      </main>
      
    </>
  );
}
