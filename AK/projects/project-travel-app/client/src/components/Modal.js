import {useState} from "react";
import {getTags} from "../helpers";
import axios from "axios";

const Modal = ({mode, setMode, fetchData, currentPost}) => {
  const [form, setForm] = useState({
    title: currentPost?.data.title || "",
    description: currentPost?.data.description || "",
    line: currentPost?.data.address.line || "",
    town: currentPost?.data.address.town || "",
    region: currentPost?.data.address.region || "",
    country: currentPost?.data.address.country || "",
    longitude: currentPost?.data.address.coords[0] || undefined,
    latitude: currentPost?.data.address.coords[1] || undefined,
    photo: currentPost?.data.photo || "",
    website: currentPost?.data.website || "",
    nature: currentPost?.data.tags.includes("nature") || false,
    mountains: currentPost?.data.tags.includes("mountains") || false,
    hiking: currentPost?.data.tags.includes("hiking") || false,
    beach: currentPost?.data.tags.includes("beach") || false,
    sun: currentPost?.data.tags.includes("sun") || false,
  });

  const createMode = mode === "create";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: form.title,
      address: {
        line: form.line,
        town: form.town,
        region: form.region,
        country: form.country,
        coords: [Number(form.latitude), Number(form.longitude)],
      },
      photo: form.photo,
      website: form.website,
      description: form.description,
      tags: getTags(form),
    };

console.log(currentPost);


    try {
      if (createMode) {

        const response = await axios.post('http://localhost:8000/create/', {
          data,
        })
        const success = response.status === 200

        if (success) {
          setMode(null);
          fetchData();
        } else {
          console.error(response);
        }
      } else {
        const response = await axios.put(
          `http://localhost:8000/edit/${currentPost.documentId}`,
          {
            data
          }
        );
        const success = response.status === 200;

        if (success) {
          setMode(null);
          fetchData();
        } else {
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='overlay'>
      <div className='modal'>
        <form
          action=''
          onSubmit={handleSubmit}
        >
          <div
            className='close-icon'
            onClick={() => setMode(null)}
          >
            x
          </div>

          <h1>{createMode ? "Add" : "Edit"} your adventure!</h1>
          <h5>Upload a photo of your travel!</h5>
          <p>Paste a url from the internet</p>

          <div className='multi-input'>
            <div className='img-preview'>
              {form.photo && (
                <img
                  src='form.photo'
                  alt='uploaded location preview'
                />
              )}
            </div>
            <div className='main-inputs'>
              <div className='input-container'>
                <label htmlFor='photo'>Photo </label>
                <input
                  type='text'
                  id='photo'
                  name="photo"
                  placeholder='Photo url goes here'
                  required
                  value={form.photo}
                  onChange={handleChange}
                />
              </div>
              <div className='input-container'>
                <label htmlFor='title'>Title </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title goes here'
                  required
                  value={form.title}
                  onChange={handleChange}
                />{" "}
              </div>
              <div className='input-container'>
                <label htmlFor='website'>Website </label>
                <input
                  type='text'
                  id='website'
                  name="website"
                  placeholder='website url goes here'
                  required
                  value={form.website}
                  onChange={handleChange}
                />{" "}
              </div>
            </div>
          </div>

          <div className='input-container'>
            <label htmlFor='description'>Description </label>
            <input
              type='text'
              id='description'
              name='description'
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className='multi-input'>
            <div className='input-container'>
              <label htmlFor='line'>First Line </label>
              <input
                type='text'
                id='line'
                placeholder='First Line of Address'
                required
                name='line'
                value={form.line}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='country'>Country </label>
              <input
                type='text'
                id='country'
                placeholder='Country'
                required
                name='country'
                value={form.country}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='town'>Town/City </label>
              <input
                type='text'
                id='town'
                placeholder='Town/City'
                required
                name='town'
                value={form.town}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='multi-input'>
            <div className='input-container'>
              <label htmlFor='latitude'>Latitude </label>
              <input
                type='number'
                id='latitude'
                placeholder='latitude goes here'
                required
                name='latitude'
                value={form.latitude}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='longitude'>Longitude </label>
              <input
                type='number'
                id='longitude'
                placeholder='longitude goes here'
                required
                name='longitude'
                value={form.longitude}
                onChange={handleChange}
              />
            </div>
            <div className='input-container'>
              <label htmlFor='region'>Region</label>
              <input
                type='text'
                id='region'
                placeholder='region goes here'
                required
                name='region'
                value={form.region}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='multi-input'>
            <div className='input-container'>
              <label htmlFor='nature-checkbox'>Nature</label>
              <input
                type='checkbox'
                id='nature-checkbox'
                name='nature'
                checked={form.nature}
                onChange={handleChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor='mountains-checkbox'>Mountains</label>
              <input
                type='checkbox'
                id='mountains-checkbox'
                name='mountains'
                checked={form.mountains}
                onChange={handleChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor='hiking-checkbox'>Hiking</label>
              <input
                type='checkbox'
                id='hiking-checkbox'
                name='hiking'
                checked={form.hiking}
                onChange={handleChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor='beach-checkbox'>Beach</label>
              <input
                type='checkbox'
                id='beach-checkbox'
                name='beach'
                checked={form.beach}
                onChange={handleChange}
              />
            </div>

            <div className='input-container'>
              <label htmlFor='sun-checkbox'>Sun</label>
              <input
                type='checkbox'
                id='sun-checkbox'
                name='sun'
                checked={form.sun}
                onChange={handleChange}
              />
            </div>
          </div>
          <br></br>
          <input
            type='submit'
            value='Submit for Review ➥'
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
