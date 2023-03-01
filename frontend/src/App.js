import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Spinner from './components/Spinner';
import Welcome from './components/Welcome';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = () => {
    fetch(API_URL + `/images`)
      .then((res) => res.json())
      .then((res) => {
        setImages(res);
        setLoading(false);
        toast.success('Images retrieved from DB');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(word)
    fetch(API_URL + `/new-image?query=${word}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText + ` ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setImages([{ title: word, ...data }, ...images]);
        toast.info(`Found ${word}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setWord('');
  };

  const handleDeleteImage = (id) => {
    fetch(API_URL + `/images/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText + ` ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setImages(images.filter((image) => image.id !== id));
        toast.warning('Image was deleted!');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSaveImage = (id) => {
    const imgToBeSaved = images.find((image) => image.id === id);
    imgToBeSaved.saved = true;
    // debugger;
    fetch(API_URL + `/images`, {
      method: 'POST',
      body: JSON.stringify(imgToBeSaved),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText + ` ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.inserted_id) {
          setImages(
            images.map((image) =>
              image.id === id ? { ...image, saved: true } : image
            )
          );
          toast.info('Saved!');
        }
      });
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pd-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
