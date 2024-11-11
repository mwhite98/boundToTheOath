'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import Button from '@/components/button/button'

import leftImage from '@/assets/left-knight.png'
import rightImage from '@/assets/transparent-globe.gif'

import mainTopImage from '@/assets/main-top.png'
import mainRightImage from '@/assets/main-right.png'
import mainBottomImage from '@/assets/main-bottom.png'
import mainLeftImage from '@/assets/main-left.png'

import successImage from '@/assets/success-knight.png'
import flashingImage from '@/assets/flashing-transparent.gif'
import aquaButtons from '@/assets/aqua-buttons.png'

const fiveMinutes = 300000
const threeSeconds = 3050

export default function HomeView ({ numOaths, oaths }) {
  const [contentInput, setContentInput] = useState('')
  const [successImageVisible, setSuccessImageVisibility] = useState(false)
  const [flashingImageVisible, setFlashingImageVisibility] = useState(false)

  let formattedOaths = ' '
  for (const o of oaths) {
    formattedOaths = formattedOaths.concat(o.content, ' • ')
  }

  let splitFormattedOaths = ' '
  const halfwayThroughOaths = Math.floor(numOaths/2)
  for (let i=halfwayThroughOaths; i < numOaths; i++) {
    splitFormattedOaths = splitFormattedOaths.concat(oaths[i].content, ' • ')
  }
  for (let i=0; i < halfwayThroughOaths; i++) {
    splitFormattedOaths = splitFormattedOaths.concat(oaths[i].content, ' • ')
  }

  useEffect(() => {
    // Set up the rare flashing image
    setInterval(() => {
      setFlashingImageVisibility(true)
      setTimeout(() => {
        setFlashingImageVisibility(false)
      }, threeSeconds)
    }, 10000)
  }, [])

  async function handleSubmit (e) {
    // Prevent the browser from reloading the page
    e.preventDefault()

    // Read the form data
    const content = e.target.oathInput.value
    if (content === '') {
      return
    }

    const response = await fetch('/api/oath', {
      method: 'POST',
      body: JSON.stringify({
        content: content
      })
    })

    setContentInput('')

    // flashing the success image
    if (response) {
      setSuccessImageVisibility(true)
      setTimeout(() => {
        setSuccessImageVisibility(false)
      }, 750)
    }
  }

  const addOathForm = <form method='post' onSubmit={handleSubmit}>
    <label htmlFor='oathInput'></label>
    <input
      type='text'
      id='oathInput'
      name='oathInput'
      value={contentInput}
      onChange={e => setContentInput(e.target.value)} />
    <Button className='primary' type='submit'>bind</Button>
  </form>

  let flashingImageElement
  if (flashingImageVisible) {
    flashingImageElement = <div className='absolute-image-wrapper' id='flashing-image'>
      <Image src={flashingImage} className='absolute-image' unoptimized={true} alt='reaching angel' />
    </div>
  }

  return <div className='absolute-wrapper'>
    <div className='absolute-image-wrapper' id='success-image'>
      <Image src={successImage} className={`absolute-image ${successImageVisible ? 'appear' : 'fadeOut'}`} alt='kneeling knight' />
    </div>
    {flashingImageElement}
    <div className='home-view-wrapper'>
      <div className='image-container absolute-decorator top'>
        <Image src={mainTopImage} className='image' alt='Shaking hands' />
      </div>
      <div className='image-container absolute-decorator right'>
        <Image src={mainRightImage} className='image' alt='Line drawing shepherd' />
      </div>
      <div className='image-container absolute-decorator bottom'>
        <Image src={mainBottomImage} className='image' alt='knight holding apple' />
      </div>
      <div className='image-container absolute-decorator left'>
        <Image src={mainLeftImage} className='image' alt='Shield' />
      </div>
      <div className='home-view-top-row'>
        <div>
          <Marquee className='rotate r-left' speed='70'>
            {formattedOaths}
          </Marquee>
          <Marquee className='rotate r-right' speed='70'>
            {splitFormattedOaths}
          </Marquee>
        </div>
      </div>
      <div className='home-view-bottom-row'>
        <div className='image-container'>
          <Image src={leftImage} className='image info-hover left' alt='knight' />
          <div className='info-blurb'>
            <div className='info-blurb-header'>
              <div className='ibh-image-container'>
                <Image src={aquaButtons} className='aqua-buttons' alt='apple aqua buttons' />
              </div>
            </div>
            <div className='info-blurb-content'>bound to the oath</div>
          </div>
        </div>
        <div className='bottom-input-form'>
          <span>
            {addOathForm}
          </span>
          <div>
            Number of oaths taken: {numOaths}
          </div>
        </div>
        <div className='image-container'>
          <Image src={rightImage} className='image info-hover right' unoptimized={true} alt='friendly globe guy' />
          <div className='info-blurb'>
            <div className='info-blurb-header'>
              <div className='ibh-image-container'>
                <Image src={aquaButtons} className='aqua-buttons' alt='apple aqua buttons' />
              </div>
              <span>
                <p>this is the header</p>
              </span>
            </div>
            <div className='info-blurb-content'>this is the info blurb this is a much longer bit of text because we have to test what this will look like with a lot of text</div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
