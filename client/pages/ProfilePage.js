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
        console.log('profile fetched for 1');
        console.log(response);
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
    console.log(name, breed, owner, age, sex, size, about);
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
      <h3 className="m-3 text-3xl text-center">Profile</h3>
      <div class="mx-auto w-2/3 p-8 rounded flex flex-column justify-center items-centercard w-1/2 pt-2 pb-4 bg-indigo-50 border-indigo-600 border-2">
        <div className="text-center">
          <label class="font-bold text-center text-2xl font-bold m-3">
            Name:
          </label>
          {name === '' || nameEdit ? (
            <input
              class="text-2xl"
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
              class="text-2xl"
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
              className="mx-auto rounded max-w-full max-h-full rounded border-2 border-indigo-500"
              src={image}
              height="400px"
              width="400px"
            ></img>

            <label className="font-bold mt-2">Your Image File</label>
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
                placeholder="your url"
              ></input>
            ) : (
              <label className="mb-2"
                onClick={(e) => {
                  setEditImage(true);
                }}
              >
                {' '}
                Update picture
              </label>
            )}
          </div>
          <h2 className="font-bold">About me</h2>
          <div width="800px">
            {about === '' || aboutEdit ? (
              <textarea
                className="w-full"
                rows="5"
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
              <li className="m-2">
                <label className="font-bold">
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
              <li className="m-2">
                <label className="font-bold">Sex</label>
                <br />
                <label>female</label>
                {sex === 'Female' ? (
                  <input
                    className="m-1"
                    type="radio"
                    name="sex"
                    value="Female"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    className="m-1"
                    type="radio"
                    name="sex"
                    value="Female"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                )}

                <label>male</label>
                {sex === 'Male' ? (
                  <input
                    className="m-1"
                    type="radio"
                    name="sex"
                    value="Male"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    className="m-1"
                    type="radio"
                    name="sex"
                    value="Male"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
                  />
                )}
              </li>
              <li className="m-2">
                <label className="font-bold">Age</label>
                <br />
                {age === undefined || ageEdit ? (
                  <input
                    type="number"
                    min="1"
                    max="99"
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
              <li className="m-2">
                <label className="font-bold">Size</label>
                <br />
                <label>small</label>
                {size === 'Small' ? (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Small"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Small"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}

                <label>medium</label>
                {size === 'Medium' ? (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Medium"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Medium"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}
                <label>big</label>
                {size === 'Large' ? (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Large"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    checked
                  />
                ) : (
                  <input
                    className="m-1"
                    type="radio"
                    name="size"
                    value="Large"
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                  />
                )}
              </li>
              <li className="m-2">
                <label className="font-bold">Owner</label>
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
          <div className="flex justify-center">
            <div
              className="flex items-center justify-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 p-1.5 rounded-md w-24 h-12 cursor-pointer border-solid border-2 border-indigo-600"
              type="submit"
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
