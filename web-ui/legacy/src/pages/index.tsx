/*
 * @author: Razvan Rauta
 * Date: 26.04.2020
 * Time: 19:30
 */
import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { rem } from 'polished'
import { NextSeo } from 'next-seo'
import { SEO } from '../../next-seo.config'
import { useRouter } from 'next/router'

const Index: React.FC = () => {
  const router = useRouter()

  const handleButton = () => router.push('/news')

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <HeaderStyled>
        <div className="header">
          <TextBox>
            <PrimaryHeader>
              <span className={'heading-main'}>Outdoors</span>
              <span className={'heading-sub'}>Is where life happens</span>
            </PrimaryHeader>
            <Button onClick={handleButton}>Discover more</Button>
          </TextBox>
        </div>
      </HeaderStyled>
    </Fragment>
  )
}

const HeaderStyled = styled.div`
  padding: ${rem(30)} 0;
  .header {
    position: relative;
    height: 95vh;
    background-image: linear-gradient(
        to right bottom,
        rgba(126, 213, 111, 0.8),
        rgba(40, 180, 133, 0.8)
      ),
      url(https://images.unsplash.com/photo-1583364493238-248032147fbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80);
    background-size: cover;
    background-position: top;
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
  }
`

const PrimaryHeader = styled.h1`
  color: #ffffff;
  text-transform: uppercase;
  /**fix shaking of the text*/
  backface-visibility: hidden;
  margin-bottom: ${rem(60)};

  .heading-main {
    display: block;
    font-size: ${rem(60)};
    font-weight: 400;
    letter-spacing: ${rem(35)};
    animation: moveInLeft 1000ms ease-out;
  }
  .heading-sub {
    display: block;
    font-size: ${rem(20)};
    font-weight: 700;
    letter-spacing: ${rem(17.4)};
    animation: moveInRight 1000ms ease-out;
  }

  @keyframes moveInLeft {
    0% {
      opacity: 0;
      transform: translateX(${rem(-100)});
    }

    80% {
      transform: translateX(${rem(10)});
    }
    100% {
      opacity: 1;
      transform: translateX(${rem(0)});
    }
  }

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translateX(${rem(100)});
    }

    80% {
      transform: translateX(${rem(-10)});
    }
    100% {
      opacity: 1;
      transform: translateX(${rem(0)});
    }
  }
`

const TextBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Button = styled.a`
  color: ${(props) => (props.color ? props.color : 'black')};
  background-color: white;
  padding: ${rem(15)} ${rem(40)};
  display: inline-block;
  cursor: pointer;
  border-radius: ${rem(100)};
  transition: all 200ms;
  position: relative;
  animation: moveInBottom 500ms ease-out 750ms;
  animation-fill-mode: backwards;
  text-transform: uppercase;
  font-weight: 400;

  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;
  }
  &:hover {
    transform: translateY(${rem(-3)});
    box-shadow: 0 ${rem(10)} ${rem(20)} rgba(0, 0, 0, 0.2);
    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
  }
  &:active {
    transform: translateY(${rem(-1)});
    box-shadow: 0 ${rem(5)} ${rem(10)} rgba(0, 0, 0, 0.2);
  }
  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: ${rem(100)};
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 400ms;
  }

  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(${rem(30)});
    }

    100% {
      opacity: 1;
      transform: translateY(${rem(0)});
    }
  }
`

export default Index
