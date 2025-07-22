import React, { useRef, useState, useEffect } from 'react'

const Maneger = () => {
  const [passwordArry, setpasswordArry] = useState([])
  const [form, setform] = useState({ url: '', username: '', password: '' });
  const ref = useRef();

  useEffect(() => {
    let passwordData = localStorage.getItem('passwords');
    let passwordArry;
    if (passwordData) {
      setpasswordArry(JSON.perse(passwordData));
    }
    else {
      passwordArry = [];
    }
  }, [])



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

  const savePassword = () => {
    setpasswordArry([...passwordArry, form]);
    localStorage.setItem('passwords', JSON.stringify([...passwordArry, form]));
    console.log(passwordArry);

  }



  return (
    <>
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



    </>
  )
}

export default Maneger