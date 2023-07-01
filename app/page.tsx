import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { drive, fuels, transmission, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
    drive: searchParams.drive || "",
    transmission : searchParams.transmission || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  // const isDataEmpty = true;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className=' mt-12 padding-x padding-y max-width ' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters '>
          <SearchBar />

          <div className='home__filter-container '>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='drive' options={drive} />
            <CustomFilter title='transmission' options={transmission} />
            <CustomFilter title='year' options={yearsOfProduction} />
            
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
