import React, { useState } from 'react'
import styled from 'styled-components'

const Thumbnail:React.FC<{ object: any }> = ({ object }: { object: any }) => {

  const [imageNumber, setImageNumber] = useState(0)

  const goToPreviousImage = () => {
    if (imageNumber === 0) return
    setImageNumber(imageNumber => imageNumber - 1)
  }

  const goToNextImage = () => {
    if (imageNumber + 1 === object.images.length) return
    setImageNumber(imageNumber => imageNumber + 1) 
  }

  return (
    <Container>
      <ThumbnailBody>
        <Image src={object.images[imageNumber].thumbnail.url} alt={object.name} />
        <ArrowLeft onClick={goToPreviousImage}> ◀&nbsp; </ArrowLeft>
        <ArrowRight onClick={goToNextImage}> &nbsp;▶ </ArrowRight>
        <ImageNumber> {`Showing picture ${imageNumber + 1}/${object.images.length}`}  </ImageNumber>
      </ThumbnailBody>
      
      <ThumbnailFooter>
        <ImageName> {object.name} </ImageName>
        <Price> $xx,xx </Price>
      </ThumbnailFooter>
    </Container>
  )
}

export default Thumbnail

const Container = styled.div`
  width: 230px;
  height: 230px;
`
  
const ThumbnailBody = styled.div`
  width: 100%;
  position: relative;
  border: 2px solid black;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Arrow = styled.span`
  position: absolute;
  top: 50%;
  color: #444444D9;
  border-radius: 50%;
  padding: 3px 3px 1px;
  box-shadow: inset 0 0 1px 50px #E0E0E0D9;
  cursor: pointer;
`

const ArrowLeft = styled(Arrow)`
  left: 5px;
`

const ArrowRight = styled(Arrow)`
  right: 5px;
`

const ImageNumber = styled.p`
  & {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: right;
    font-size: 12px;
    margin: 0;
    background: #000;
    color: #FFF;
  }
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 25px;
    bottom: 14px;
    left: 0;
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
  }
`

const ThumbnailFooter = styled.div`
  display: flex;
  flex: 1;
`

const ImageName = styled.span`
  font-size: 18px;
  color: #404040;
`

const Price = styled.span`
  margin-left: auto;
  font-size: 18px;
  color: #404040;
`