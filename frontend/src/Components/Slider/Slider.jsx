import React, { useEffect, useState } from 'react'
import './Slider.css'
import data from '../../data'

const Slider = () => {
    const[people] = useState(data);
    const[index, setIndex] = useState(0);

    useEffect(()=>{
        const lastIndex = people.length-1;
        if(index<0){
            setIndex(lastIndex);
        }
        if(index>lastIndex){
            setIndex(0);
        }
    },[index,people]);

    useEffect(()=>{
        let slider = setInterval(()=>{
            setIndex(index+1)
        },5000);
        return ()=>{
            clearInterval(slider);
        }
    },[index])

  return (
    <section className="section">
      <div className="title">
        <h2>What Our Customers Say</h2>
      </div>
      <div className="section-center">
        {people.map((item, indexPeople) => {
          const { id, image, name, title, quote } = item;
          let position = "nextSlide";
          if (indexPeople === index) {
            position = "activeSlide";
          }
          if (
            indexPeople === index - 1 ||
            (index === 0 && indexPeople === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <span className='left'>
              <i class="fa-solid fa-quote-left"></i>
              </span>
              <p className="text">{quote}</p>
              <span className='right'>
              <i class="fa-solid fa-quote-right"></i>
              </span>
              <div className="item">
              <img src={image} alt={name} className="person-img" />
              <div className="item-inside">
              <h4>{name}</h4>
              <p className="title">{title}</p>
              </div>
              </div>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <i className="fas fa-arrow-left" />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <i className="fas fa-arrow-right" />
        </button>
      </div>
    </section>
  )
}

export default Slider