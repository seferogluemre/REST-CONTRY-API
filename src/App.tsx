import axios from 'axios'
import './App.scss'
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { load } from 'cheerio';

interface Country {
  name: {
    common: string;
  }
  population: number;
  flags: {
    png: string;
  }
}




function App() {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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






  if (loading) {
    return (
      <div className=''>

      </div>
    )
  }



  return (
    <>
      <Container>
        <Row>
          {
            countrys?.map((country, index) => (
              <div key={index} className='col-lg-4 col-md-4 col-sm-6 col-xxl-3'>
                <div className='card'>
                  <img src={country.flags.png} className='country-image' />
                  <div className='card-body text-center'>
                    <h3 className='py-2'>{country.name.common}</h3>
                    <h5>Population:  {country.population}</h5>
                  </div>
                </div>
              </div>
            ))
          }
        </Row>
      </Container>

    </>
  )
}

export default App
