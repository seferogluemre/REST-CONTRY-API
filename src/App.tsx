import axios from 'axios'
import './App.scss'
import { useEffect, useState } from 'react';
import { Container, Form, FormControl, FormSelect, Row } from 'react-bootstrap';

type Continent = "Europe" | "Asia" | "Africa" | "North America" | "South America" | "Oceania" | "Antarctica";

type ContinentType = string[];

const continentArray: ContinentType = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"]

interface Country {
  name: {
    common: string;
  }
  population: number;
  flags: {
    png: string;
  }
  continents: Continent[];
}

function App() {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");


  useEffect(() => {
    const getAllCountrys = async () => {
      setLoading(true)
      try {
        const response = await axios.get("https://restcountries.com/v3.1/independent?status=true");
        setCountrys(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false)
        setError(error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.");
        console.log("hata tespit edildi" + error)
      }
    }
    getAllCountrys();
  }, [])


  const filteredCountry = countrys.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchName.toLowerCase())

    const continentMatch =
      selectedContinent === "default" || country.continents.includes(selectedContinent as Continent);

    return nameMatch && continentMatch;

  })



  return (
    <>
      <Container>
        <Form className='d-flex align-items-center flex-column justify-content-center my-5'>
          <FormSelect onChange={(e) => setSelectedContinent(e.target.value)} className='bg-dark text-light border-none w-50'>
            <option value="default">Default</option>
            {
              continentArray.map((option, index) => (
                <option value={option} key={index} >{option}</option>
              ))
            }
          </FormSelect>
          <FormControl className='w-50 my-3' type='text' value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        </Form>
        <Row className='d-flex justify-content-center'>
          {
            loading ? (
              <div className="loader-container">
                <div className="bouncing-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            ) : (
              filteredCountry.map((country, index) => (
                <div key={index} className='col-lg-4 col-md-4 col-sm-6 col-xxl-3 d-flex justify-content-center align-items-center'>
                  <div className='card'>
                    <img src={country.flags.png} className='country-image' alt={`Flag of ${country.name.common}`} />
                    <div className='card-body text-center'>
                      <h3 className='py-2'>{country.name.common}</h3>
                      <h5>Population: <span className='text-danger'>{country.population}</span></h5>
                      <h5 className='py-3 text-warning'>Continents: {country.continents.join("")}</h5>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default App;
