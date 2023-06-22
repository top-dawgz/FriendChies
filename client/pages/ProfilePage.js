import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState();
  const [size, setSize] = useState('');
  const [owner, setOwner] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');

  const [nameEdit, setEditName] = useState(false);
  const [breedEdit, setEditBreed] = useState(false);
  const [sexEdit, setEditSex] = useState(false);
  const [ageEdit, setEditAge] = useState(false);
  const [sizeEdit, setEditSize] = useState(false);
  const [ownerEdit, setEditOwner] = useState(false);
  const [aboutEdit, setEditAbout] = useState(false);
  const [imageEdit, setEditImage] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/dogs/profiles');
        if (response.data !== '') {
          setName(response.data.name);
          setBreed(response.data.breed);
          setSex(response.data.sex);
          setAge(response.data.age);
          setSize(response.data.size);
          setOwner(response.data.owner);
          setAbout(response.data.about);
          setImage(response.data.img_src);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  async function submitProfile(e) {
    await axios.post('/api/dogs/create', {
      name: name,
      breed: breed,
      owner: owner,
      age: Number(age),
      sex: sex,
      size: size,
      about: about,
      image: image,
    });
    window.location.reload();
  }
  return (
    <div>
      <h3 className='m-3 text-3xl text-center'>Profile</h3>
      <div className='mx-auto w-2/3 p-8 rounded flex flex-column justify-center items-centercard w-1/2 pt-2 pb-4 bg-indigo-50 border-indigo-600 border-2'>
        <div className='text-center'>
          <label className='font-bold text-center text-2xl font-bold m-3'>
            Name:
          </label>
          {name === '' || nameEdit ? (
            <input
              className='text-2xl'
              onChange={(e) => {
                setName(e.target.value);
              }}
              onClick={(e) => {
                setEditName(true);
              }}
              onDoubleClick={(e) => {
                setEditName(false);
              }}
              value={name}
              placeholder={name}
            ></input>
          ) : (
            <label
              className='text-2xl'
              onClick={(e) => {
                setEditName(true);
              }}
            >
              {' '}
              {name}
            </label>
          )}

          <div>
            <img
              className='mx-auto rounded max-w-full max-h-full rounded border-2 border-indigo-500'
              src={image}
              height='400px'
              width='400px'
            ></img>

            <label className='font-bold mt-2'>Your Image File</label>
            <br />
            {name === '' || imageEdit ? (
              <input
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                onClick={(e) => {
                  setEditImage(true);
                }}
                onDoubleClick={(e) => {
                  setEditImage(false);
                }}
                value={image}
                placeholder='your url'
              ></input>
            ) : (
              <label
                className='mb-2'
                onClick={(e) => {
                  setEditImage(true);
                }}
              >
                {' '}
                Update picture
              </label>
            )}
          </div>
          <h2 className='font-bold'>About me</h2>
          <div width='800px'>
            {about === '' || aboutEdit ? (
              <textarea
                className='w-full'
                rows='5'
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                onClick={(e) => {
                  setEditAbout(true);
                }}
                onDoubleClick={(e) => {
                  setEditAbout(false);
                }}
                value={about}
                placeholder={about}
              ></textarea>
            ) : (
              <p
                onClick={(e) => {
                  setEditAbout(true);
                }}
              >
                {about}
              </p>
            )}
          </div>
          <div>
            <ul>
              <li className='m-2'>
                <label className='font-bold'>
                  Breed
                  <br />
                </label>
                <br />
                {breed === '' || breedEdit ? (
                  <input
                    onChange={(e) => {
                      setBreed(e.target.value);
                    }}
                    onDoubleClick={(e) => {
                      setEditBreed(false);
                    }}
                    onClick={(e) => {
                      setEditBreed(true);
                    }}
                    value={breed}
                    placeholder={breed}
                  ></input>
                ) : (
                  <label
                    onClick={(e) => {
                      setEditBreed(true);
                    }}
                  >
                    {' '}
                    {breed}
                  </label>
                )}
              </li>
              <li className='m-2'>
                <label className='font-bold'>Sex</label>
                <br />
                {sex === 'Female' ? (
                  <input
                    id='input1'
                    className='m-1 hidden peer'
                    type='radio'
                    name='sex'
                    value='Female'
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    id='input1'
                    className='m-1 hidden peer'
                    type='radio'
                    name='sex'
                    value='Female'
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                )}
                <label
                  for='input1'
                  className={`peer-checked:border-indigo-600 p-2 border-solid mx-2 my-1 border-2 border-indigo-600 rounded-lg ease-in lm-10 ${
                    sex === 'Female' ? 'bg-indigo-200' : ''
                  }`}
                >
                  female
                </label>

                {sex === 'Male' ? (
                  <input
                    id='input2'
                    className='m-1 hidden peer'
                    type='radio'
                    name='sex'
                    value='Male'
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    id='input2'
                    className='m-1 hidden peer'
                    type='radio'
                    name='sex'
                    value='Male'
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                )}
                <label
                  for='input2'
                  className={`peer-checked:border-indigo-600 p-2 border-solid mx-2 my-1 border-2 border-indigo-600 rounded-lg ease-in lm-10 ${
                    sex === 'Male' ? 'bg-indigo-200' : ''
                  }`}
                >
                  male
                </label>
              </li>
              <li className='mx-2'>
                <label className='font-bold'>Age</label>
                <br />
                {age === undefined || ageEdit ? (
                  <input
                    type='number'
                    min='1'
                    max='99'
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    onDoubleClick={(e) => {
                      setEditAge(false);
                    }}
                    onClick={(e) => {
                      setEditAge(true);
                    }}
                    value={age}
                    placeholder={age}
                  ></input>
                ) : (
                  <label
                    onClick={(e) => {
                      setEditAge(true);
                    }}
                  >
                    {' '}
                    {age}
                  </label>
                )}
              </li>
              <li className='m-2'>
                <label className='font-bold'>Size</label>
                <br />

                {size === 'Small' ? (
                  <input
                    id='input3'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Small'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    id='input3'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Small'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}
                <label
                  for='input3'
                  className={`peer-checked:border-indigo-600 p-2 border-solid mx-2 my-2 border-2 border-indigo-600 rounded-lg ease-in lm-10 ${
                    size === 'Small' ? 'bg-indigo-200' : ''
                  }`}
                >
                  small
                </label>

                {size === 'Medium' ? (
                  <input
                    id='input4'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Medium'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    id='input4'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Medium'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}
                <label
                  for='input4'
                  className={`peer-checked:border-indigo-600 p-2 border-solid mx-2 my-2 border-2 border-indigo-600 rounded-lg ease-in lm-10 ${
                    size === 'Medium' ? 'bg-indigo-200' : ''
                  }`}
                >
                  medium
                </label>

                {size === 'Large' ? (
                  <input
                    id='input5'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Large'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    id='input5'
                    className='m-1 hidden peer'
                    type='radio'
                    name='size'
                    value='Large'
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}
                <label
                  for='input5'
                  className={`peer-checked:border-indigo-600 p-2 border-solid mx-2 border-2 border-indigo-600 rounded-lg ease-in lm-10 ${
                    size === 'Large' ? 'bg-indigo-200' : ''
                  }`}
                >
                  big
                </label>
              </li>
              <li className='m-2'>
                <label className='font-bold'>Owner</label>
                <br />
                {owner === '' || ownerEdit ? (
                  <input
                    onChange={(e) => {
                      setOwner(e.target.value);
                    }}
                    value={owner}
                    placeholder={owner}
                    onDoubleClick={(e) => {
                      setEditOwner(false);
                    }}
                    onClick={(e) => {
                      setEditOwner(true);
                    }}
                  ></input>
                ) : (
                  <label
                    onClick={(e) => {
                      setEditOwner(true);
                    }}
                  >
                    {' '}
                    {owner}
                  </label>
                )}
              </li>
            </ul>
          </div>
          <div className='flex justify-center'>
            <div
              className='flex items-center justify-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 p-1.5 rounded-md w-24 h-12 cursor-pointer border-solid border-2 border-indigo-600'
              type='submit'
              onClick={(e) => submitProfile(e)}
            >
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
