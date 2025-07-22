import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Maneger = () => {

  const [passwordArry, setpasswordArry] = useState(() => {
    const stored = localStorage.getItem('passwords');
    return stored ? JSON.parse(stored) : [];
  });
  const [form, setform] = useState({ url: '', username: '', password: '' });
  const [edit, setedit] = useState([])

  const ref = useRef();

  useEffect(() => {
    let passwordData = localStorage.getItem('passwords');
    let passwordArry;
    if (passwordData) {
      setpasswordArry(JSON.parse(passwordData));
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(passwordArry));
  }, [passwordArry]);


  const savePassword = () => {
    if (edit.id) {


      setpasswordArry(passwordArry.map(obj =>
        obj.id === edit.id ? { ...obj, url: form.url, userame: form.username, password: form.password } : obj
      ))



    } else {

      setpasswordArry([...passwordArry, { ...form, id: uuidv4() }]);
      localStorage.setItem('passwords', JSON.stringify([...passwordArry, { ...form, id: uuidv4() }]));
    }

    setform({ url: '', username: '', password: '' });


  }

  const deletePassword = (id) => {
    if (confirm("You want to Delete ?")) {
      setpasswordArry(passwordArry.filter(item => item.id !== id))
      localStorage.setItem('passwords', JSON.stringify(passwordArry.filter(item => item.id !== id)))
    }
  }


  const editPassword = async (id) => {
    await setedit(passwordArry.filter(item => item.id === id)[0])

    setform(passwordArry.filter(item => item.id === id)[0])
    // console.log(edit);

  }


  const hanldeChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }


  const showPass = () => {
    const passInput = document.querySelector('.password');
    const passIcon = document.querySelector('.passIcon');

    if (passInput.type === "password") {
      passInput.type = "text";
      ref.current.src = "img/eye.png";

    } else {
      ref.current.src = "img/eyecross.png";
      passInput.type = "password";
    }

  }

  const copyFunc = (text) => {
    navigator.clipboard.writeText(text)

    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });

  }



  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="mx-auto width-3/4">
        <div className='w-2/3 mx-auto border-2 border-gray-300 flex flex-col justify-center items-center p-10 mt-10 bg-white shadow-lg rounded-lg'>

          <input value={form.url} onChange={hanldeChange} name="url"
            className="w-3/4 py-1 rounded px-2 mb-4 border-1 border-gray-300"

            type="text" placeholder="Enter URL" />
          <div className='flex gap-2 justify-between items-center w-3/4 mb-4'>

            <input value={form.username} onChange={hanldeChange} name='username'
              className="w-2/4 py-1 rounded px-2 mb-4 border-1 border-gray-300"

              type="text" placeholder="Enter Username" />

            <div className='relative w-2/4'>
              <input onChange={hanldeChange} value={form.password} name='password'
                className="password w-full py-1 rounded px-2 mb-4 border-1 border-gray-300"
                type="password" placeholder="Enter Password" />
              <img ref={ref} onClick={showPass}
                className='passIcon w-10 h-6 absolute right-1 top-1 cursor-pointer' src="img/eyecross.png" alt="copy icon" />
            </div>
          </div>
          <button onClick={savePassword}
            className='flex justify-center items-center gap-2 bg-green-500 px-8 py-2 rounded cursor-pointer'>
            {/* <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              state="hover-swirl">
            </lord-icon> */}
            Save</button>

        </div>
      </div >

      <div className="table container w-2/3 m-auto mt-20">

        {passwordArry.length == 0 && <div className='font-bold text-2xl text-center'> No data found! </div>}
        {passwordArry.length != 0 &&
          <>

            <div><h2 className='text-3xl font-bold'>Your Passwords</h2></div>

            <table className="table-auto w-full mb-4 " >
              <thead className='bg-gray-500 text-white'>
                <tr >
                  <th >Website URL</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>


              <tbody className='bg-gray-200 '>

                {passwordArry.map((item, index) => {

                  return (
                    <tr key={index} className='border-b-1 px-10 h-5 text-center'>
                      <td >
                        <div className='flex justify-center'>

                          <a href={item.url} target="_blank" className='hover:underline hover:text-violet-400'>{item.url}</a>
                          <div onClick={() => { copyFunc(item.url) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex justify-center'>
                          {item.username}
                          <div onClick={() => { copyFunc(item.username) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex justify-center'>
                          {item.password}
                          <div onClick={() => { copyFunc(item.password) }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/vesvelsm.json"
                              trigger="morph"
                              state="morph-share"
                              style={{ "width": "25px", "height": "25px", "cursor": "pointer", "padding": "0" }}>
                            </lord-icon>
                          </div>

                        </div>

                      </td>
                      <td className='flex justify-center gap-3'>
                        <div onClick={() => { editPassword(item.id) }} className='cursor-pointer'>
                          <lord-icon
                            src="https://cdn.lordicon.com/qawxkplz.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </div>
                        <div onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </div>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </>
        }
      </div >


    </>
  )
}

export default Maneger