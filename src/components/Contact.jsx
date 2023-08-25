import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {

  const formRef = useRef();
  const [form, setForm] = useState({
    name: '', email: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const formChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      'service_iw2shum',
      'template_vqgfgdw',
      {
        from_name: form.name,
        from_email: form.email,
        to_name: 'Nafisa',
        to_email: 'nawernafisa8@gmail.com',
        message: form.message
      },
      '97pH1jwCYCpxUev-8'
      ).then(() => {
        setLoading(false);
        alert("Thank you!");

        setForm({name:'',email:'',message:''})
      }, (error) => {
        setLoading(false)
        console.log(error)
        alert('Something went wrong.')
      })
  }

  return (
    <div className="xl:mt-[150px] xl:flex-row flex-col-reverse flex gap-5 overflow-hidden">
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl w=[350px]">
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={formSubmit} 
        className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Name</span>
            <input type="text" name="name" className="bg-tertiary py-4 px-6 text-white
            placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            value={form.name} onChange={formChange}/>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input type="email" name="email" className="bg-tertiary py-4 px-6 text-white
            placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            value={form.email} onChange={formChange}/>
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea name="message" rows="7" className="bg-tertiary py-4 px-6 text-white
            placeholder:text-secondary rounded-lg outline-none border-none font-medium"
            value={form.message} onChange={formChange}/>
          </label>
          <button type="submit" className="bg-tertiary py-3 px-8 outline-none w-fit text-white
          font-bold shadow-md shadow-primary rounded-xl">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h=[350px]">
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')